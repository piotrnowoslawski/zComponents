import {
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  CSSProperties,
} from "react";
import { ZDropListAutoHeightWrapperProps } from "../../../types/zDropTypes";
import styles from "../../../styles/ZDrop.module.scss";
import { classNames } from "@helpers/classNames";
import { getElementVerticalBorders } from "../../../../../helpers/getElementVerticalBorders";

const edgeDistance = 10;

const shallowEqualPos = (prev?: CSSProperties, next?: CSSProperties) =>
  (prev?.top ?? undefined) === (next?.top ?? undefined) &&
  (prev?.bottom ?? undefined) === (next?.bottom ?? undefined);

const ZDropListAutoHeightWrapper = (props: ZDropListAutoHeightWrapperProps) => {
  const {
    containerRef,
    position = "bottom",
    className,
    optionsCount,
    children,
  } = props;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const cachedListItemHeightRef = useRef<number | null>(null);

  const [forcedPositionY, setForcedPositionY] = useState<
    CSSProperties | undefined
  >();
  const [maxAllowedHeightPx, setMaxAllowedHeightPx] = useState<number>(0);
  const [measuredContentHeightPx, setMeasuredContentHeightPx] =
    useState<number>(0);

  const wrapperClasses = classNames(
    styles["zd__list"],
    styles["zd__list-auto-height-wrapper"],
    className
  );

  const setForcedPositionYIfChanged = useCallback((next?: CSSProperties) => {
    setForcedPositionY((prev) => (shallowEqualPos(prev, next) ? prev : next));
  }, []);

  const setMaxAllowedHeightIfChanged = useCallback((next: number) => {
    setMaxAllowedHeightPx((prev) => (prev === next ? prev : next));
  }, []);

  const measureVisualContentHeightPx = useCallback(() => {
    const el = wrapperRef.current;

    if (!el) {
      return 0;
    }

    const bordersPx = getElementVerticalBorders(el);

    const prevHeight = el.style.height;
    const prevMaxHeight = el.style.maxHeight;

    el.style.height = "auto";
    el.style.maxHeight = "none";
    el.offsetHeight;

    const wrapperRect = el.getBoundingClientRect();
    const childrenElements = Array.from(el.children) as HTMLElement[];

    if (childrenElements.length === 0) {
      const height = (el.scrollHeight || 0) + bordersPx;

      el.style.height = prevHeight;
      el.style.maxHeight = prevMaxHeight;

      return Math.max(0, height);
    }

    let minTop = Number.POSITIVE_INFINITY;
    let maxBottom = Number.NEGATIVE_INFINITY;

    let topMostEl: HTMLElement | null = null;
    let bottomMostEl: HTMLElement | null = null;
    let topMostTop = Number.POSITIVE_INFINITY;
    let bottomMostBottom = Number.NEGATIVE_INFINITY;

    for (const child of childrenElements) {
      const rect = child.getBoundingClientRect();

      const topRel = rect.top - wrapperRect.top;
      const bottomRel = rect.bottom - wrapperRect.top;

      if (topRel < minTop) {
        minTop = topRel;
      }

      if (bottomRel > maxBottom) {
        maxBottom = bottomRel;
      }

      if (rect.top < topMostTop) {
        topMostTop = rect.top;
        topMostEl = child;
      }

      if (rect.bottom > bottomMostBottom) {
        bottomMostBottom = rect.bottom;
        bottomMostEl = child;
      }
    }

    let topMarginPx = 0;
    let bottomMarginPx = 0;

    if (topMostEl) {
      const cs = window.getComputedStyle(topMostEl);
      topMarginPx = parseFloat(cs.marginTop || "0") || 0;
    }
    if (bottomMostEl) {
      const cs = window.getComputedStyle(bottomMostEl);
      bottomMarginPx = parseFloat(cs.marginBottom || "0") || 0;
    }

    const unionHeight = Math.max(0, maxBottom - minTop);
    const total = unionHeight + topMarginPx + bottomMarginPx + bordersPx;

    el.style.height = prevHeight;
    el.style.maxHeight = prevMaxHeight;

    return Math.max(0, total);
  }, []);

  const calculateContentHeight = useCallback(() => {
    if (!wrapperRef.current || !containerRef?.current) {
      return;
    }

    const triggerRect = containerRef.current.getBoundingClientRect();
    const viewportH =
      window.innerHeight || document.documentElement.clientHeight;

    const availableTopPx = Math.max(0, triggerRect.top - edgeDistance);
    const availableBottomPx = Math.max(
      0,
      viewportH - triggerRect.bottom - edgeDistance
    );

    const preferTop = position.includes("top");

    if (optionsCount === 0) {
      const preferSpace = preferTop ? availableTopPx : availableBottomPx;
      const otherSpace = preferTop ? availableBottomPx : availableTopPx;

      const minUsable = 20;

      if (preferSpace >= minUsable || otherSpace < minUsable) {
        setMaxAllowedHeightIfChanged(preferSpace);
        setForcedPositionYIfChanged(undefined);

        return;
      }

      setMaxAllowedHeightIfChanged(otherSpace);
      setForcedPositionYIfChanged(
        preferTop
          ? { top: "100%", bottom: "auto" }
          : { top: "auto", bottom: "100%" }
      );

      return;
    }

    let liHeight = cachedListItemHeightRef.current;

    if (!liHeight) {
      const li = wrapperRef.current.querySelector("li") as HTMLElement | null;
      const height = li?.getBoundingClientRect().height || 0;

      if (height > 0) {
        liHeight = height;
        cachedListItemHeightRef.current = height;
      }
    }

    if (!liHeight) {
      setMaxAllowedHeightIfChanged(
        preferTop ? availableTopPx : availableBottomPx
      );
      setForcedPositionYIfChanged(undefined);

      return;
    }

    const min2 = liHeight * 2;
    const isTopOk = availableTopPx >= min2;
    const isBottomOk = availableBottomPx >= min2;

    if (!isTopOk && !isBottomOk) {
      setMaxAllowedHeightIfChanged(
        preferTop ? availableTopPx : availableBottomPx
      );
      setForcedPositionYIfChanged(undefined);

      return;
    }

    if (preferTop) {
      if (isTopOk) {
        setMaxAllowedHeightIfChanged(availableTopPx);
        setForcedPositionYIfChanged(undefined);
      } else {
        setMaxAllowedHeightIfChanged(availableBottomPx);
        setForcedPositionYIfChanged({ top: "100%", bottom: "auto" });
      }
    } else {
      if (isBottomOk) {
        setMaxAllowedHeightIfChanged(availableBottomPx);
        setForcedPositionYIfChanged(undefined);
      } else {
        setMaxAllowedHeightIfChanged(availableTopPx);
        setForcedPositionYIfChanged({ top: "auto", bottom: "100%" });
      }
    }
  }, [
    containerRef,
    position,
    optionsCount,
    setForcedPositionYIfChanged,
    setMaxAllowedHeightIfChanged,
  ]);

  const preventFromOverflowY = useCallback(() => {
    if (!containerRef?.current || !wrapperRef.current) return;
    calculateContentHeight();
  }, [containerRef, calculateContentHeight]);

  const reCalcHeightFromContent = useCallback(() => {
    const wrapperElement = wrapperRef.current;

    if (!wrapperElement) {
      return;
    }

    const bordersPx = getElementVerticalBorders(wrapperElement);

    let calculatedContentHeight: number;

    if (optionsCount > 0) {
      const firstLi = wrapperElement.querySelector("li") as HTMLElement | null;

      let liHeight = cachedListItemHeightRef.current;

      if (!liHeight && firstLi) {
        const h = firstLi.getBoundingClientRect().height || 0;
        if (h > 0) {
          liHeight = h;
          cachedListItemHeightRef.current = h;
        }
      }

      if (liHeight && liHeight > 0) {
        calculatedContentHeight = liHeight * optionsCount + bordersPx;
      } else {
        const prevHeight = wrapperElement.style.height;
        const prevMaxHeight = wrapperElement.style.maxHeight;

        wrapperElement.style.height = "auto";
        wrapperElement.style.maxHeight = "none";
        wrapperElement.offsetHeight;

        calculatedContentHeight =
          (wrapperElement.scrollHeight || 0) + bordersPx;

        wrapperElement.style.height = prevHeight;
        wrapperElement.style.maxHeight = prevMaxHeight;
      }
    } else {
      calculatedContentHeight = measureVisualContentHeightPx();
    }

    const clamped =
      maxAllowedHeightPx > 0
        ? Math.min(calculatedContentHeight, maxAllowedHeightPx)
        : calculatedContentHeight;

    setMeasuredContentHeightPx((prev) => {
      const next = Math.max(0, Math.round(clamped));

      return prev === next ? prev : next;
    });
  }, [optionsCount, maxAllowedHeightPx, measureVisualContentHeightPx]);

  useLayoutEffect(() => {
    preventFromOverflowY();
    requestAnimationFrame(() => {
      preventFromOverflowY();
      reCalcHeightFromContent();
    });
  }, [preventFromOverflowY, reCalcHeightFromContent]);

  useLayoutEffect(() => {
    cachedListItemHeightRef.current = null;

    let raf1 = 0;
    let raf2 = 0;
    let raf3 = 0;

    preventFromOverflowY();
    reCalcHeightFromContent();

    raf1 = requestAnimationFrame(() => {
      preventFromOverflowY();
      reCalcHeightFromContent();

      raf2 = requestAnimationFrame(() => {
        preventFromOverflowY();
        reCalcHeightFromContent();

        raf3 = requestAnimationFrame(() => {
          preventFromOverflowY();
          reCalcHeightFromContent();
        });
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      cancelAnimationFrame(raf3);
    };
  }, [optionsCount, preventFromOverflowY, reCalcHeightFromContent]);

  useLayoutEffect(() => {
    let rafId = 0;

    const onResize = () => {
      cachedListItemHeightRef.current = null;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        preventFromOverflowY();
        reCalcHeightFromContent();
      });
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [preventFromOverflowY, reCalcHeightFromContent]);

  const baseY: CSSProperties = position.includes("top")
    ? { top: "auto", bottom: "100%" }
    : { top: "100%", bottom: "auto" };

  const positionStyles: CSSProperties = {
    position: "absolute",
    ...baseY,
    ...(forcedPositionY ?? {}),
    ...(maxAllowedHeightPx ? { maxHeight: `${maxAllowedHeightPx}px` } : {}),
    ...(measuredContentHeightPx > 0
      ? { height: `${measuredContentHeightPx}px` }
      : {}),
    overflowY: "auto",
  };

  return (
    <div className={wrapperClasses} style={positionStyles} ref={wrapperRef}>
      {children}
    </div>
  );
};

export default ZDropListAutoHeightWrapper;
