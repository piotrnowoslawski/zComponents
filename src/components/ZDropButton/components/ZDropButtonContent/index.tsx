import {
  useContext,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  CSSProperties,
} from "react";
import { ZDropButtonContext } from "../../index";
import { ZDropButtonContentProps } from "components/ZDropButton/types/zDropButtonTypes";
import styles from "../../styles/ZDropButton.module.scss";
import { classNames } from "@helpers/classNames";
import { getElementVerticalBorders } from "../../../../helpers/getElementVerticalBorders";

const edgeDistance = 10;

const shallowEqualPos = (prev?: CSSProperties, next?: CSSProperties) =>
  (prev?.top ?? undefined) === (next?.top ?? undefined) &&
  (prev?.bottom ?? undefined) === (next?.bottom ?? undefined) &&
  (prev?.left ?? undefined) === (next?.left ?? undefined) &&
  (prev?.right ?? undefined) === (next?.right ?? undefined);

const ZDropButtonContent = (props: ZDropButtonContentProps) => {
  const { position = "bottom-left", className, optionsCount, children } = props;

  const { isOpen, buttonContainerRef, searchInputRef } =
    useContext(ZDropButtonContext);

  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const cachedListItemHeightRef = useRef<number | null>(null);

  const [forcedHorizontalPositionStyles, setForcedHorizontalPositionStyles] =
    useState<CSSProperties | undefined>();
  const [forcedVerticalPositionStyles, setForcedVerticalPositionStyles] =
    useState<CSSProperties | undefined>();

  const [maxAllowedHeightPx, setMaxAllowedHeightPx] = useState<number>(0);
  const [measuredContentHeightPx, setMeasuredContentHeightPx] =
    useState<number>(0);

  const contentClasses = classNames(styles["zd-button__content"], className);

  const setForcedXIfChanged = useCallback((next?: CSSProperties) => {
    setForcedHorizontalPositionStyles((prev) =>
      shallowEqualPos(prev, next) ? prev : next
    );
  }, []);

  const setForcedYIfChanged = useCallback((next?: CSSProperties) => {
    setForcedVerticalPositionStyles((prev) =>
      shallowEqualPos(prev, next) ? prev : next
    );
  }, []);

  const setMaxHIfChanged = useCallback((next: number) => {
    setMaxAllowedHeightPx((prev) => (prev === next ? prev : next));
  }, []);

  const measureVisualContentHeightPx = useCallback(() => {
    const el = contentWrapperRef.current;
    if (!el) return 0;

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

      if (topRel < minTop) minTop = topRel;
      if (bottomRel > maxBottom) maxBottom = bottomRel;

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

  const getLiHeightPx = useCallback(() => {
    const el = contentWrapperRef.current;

    if (!el) {
      return null;
    }

    let liHeight = cachedListItemHeightRef.current;

    if (!liHeight) {
      const li = el.querySelector("li") as HTMLElement | null;
      const height = li?.getBoundingClientRect().height || 0;

      if (height > 0) {
        liHeight = height;
        cachedListItemHeightRef.current = height;
      }
    }

    return liHeight && liHeight > 0 ? liHeight : null;
  }, []);

  const reCalcMeasuredContentHeight = useCallback(() => {
    const el = contentWrapperRef.current;

    if (!el) {
      return;
    }

    let calculated: number;

    if (typeof optionsCount === "number" && optionsCount > 0) {
      const liHeight = getLiHeightPx();

      if (liHeight) {
        calculated = liHeight * optionsCount + getElementVerticalBorders(el);
      } else {
        const bordersPx = getElementVerticalBorders(el);
        const prevHeight = el.style.height;
        const prevMaxHeight = el.style.maxHeight;

        el.style.height = "auto";
        el.style.maxHeight = "none";
        el.offsetHeight;

        calculated = (el.scrollHeight || 0) + bordersPx;

        el.style.height = prevHeight;
        el.style.maxHeight = prevMaxHeight;
      }
    } else {
      calculated = measureVisualContentHeightPx();
    }

    const firstChild = el.firstElementChild as HTMLElement | null;
    const childBorders = firstChild ? getElementVerticalBorders(firstChild) : 0;

    const clamped =
      maxAllowedHeightPx > 0
        ? Math.min(calculated, maxAllowedHeightPx)
        : calculated;

    setMeasuredContentHeightPx((prev) => {
      const next = Math.max(0, Math.round(clamped + childBorders));
      return prev === next ? prev : next;
    });
  }, [
    optionsCount,
    maxAllowedHeightPx,
    getLiHeightPx,
    measureVisualContentHeightPx,
  ]);

  const preventFromOverflowX = useCallback(() => {
    const btn = buttonContainerRef?.current;
    const content = contentWrapperRef.current;

    if (!btn || !content) {
      return;
    }

    const btnRect = btn.getBoundingClientRect();
    const viewportW = window.innerWidth || document.documentElement.clientWidth;

    const contentW = content.getBoundingClientRect().width || 0;
    if (contentW <= 0) {
      setForcedXIfChanged(undefined);

      return;
    }

    const preferLeft = position.includes("left");

    if (preferLeft) {
      const leftEdge = btnRect.left;
      const rightEdge = leftEdge + contentW;

      const overflowRight = rightEdge > viewportW - edgeDistance;

      if (!overflowRight) {
        setForcedXIfChanged(undefined);

        return;
      }

      const rightEdgeAlt = btnRect.right;
      const leftEdgeAlt = rightEdgeAlt - contentW;

      const fitsWhenRightAnchored = leftEdgeAlt >= edgeDistance;

      if (fitsWhenRightAnchored) {
        setForcedXIfChanged({ left: "auto", right: 0 });

        return;
      }

      const spaceToRight = viewportW - btnRect.left - edgeDistance;
      const spaceToLeft = btnRect.right - edgeDistance;

      setForcedXIfChanged(
        spaceToLeft >= spaceToRight ? { left: "auto", right: 0 } : undefined
      );
      return;
    }

    const rightEdge = btnRect.right;
    const leftEdge = rightEdge - contentW;

    const overflowLeft = leftEdge < edgeDistance;

    if (!overflowLeft) {
      setForcedXIfChanged(undefined);

      return;
    }

    const leftEdgeAlt = btnRect.left;
    const rightEdgeAlt = leftEdgeAlt + contentW;

    const fitsWhenLeftAnchored = rightEdgeAlt <= viewportW - edgeDistance;

    if (fitsWhenLeftAnchored) {
      setForcedXIfChanged({ right: "auto", left: 0 });

      return;
    }

    const spaceToRight = viewportW - btnRect.left - edgeDistance;
    const spaceToLeft = btnRect.right - edgeDistance;

    setForcedXIfChanged(
      spaceToRight >= spaceToLeft ? { right: "auto", left: 0 } : undefined
    );
  }, [buttonContainerRef, position, setForcedXIfChanged]);

  const preventFromOverflowY = useCallback(() => {
    const btn = buttonContainerRef?.current;
    const content = contentWrapperRef.current;

    if (!btn || !content) {
      return;
    }

    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    const btnRect = btn.getBoundingClientRect();
    const searchH = searchInputRef?.current?.clientHeight ?? 0;

    const availableTopPx = Math.max(0, btnRect.top - searchH - edgeDistance);
    const availableBottomPx = Math.max(
      0,
      viewportHeight - btnRect.bottom - searchH - edgeDistance
    );

    const preferTop = position.includes("top");

    if (!(typeof optionsCount === "number" && optionsCount > 0)) {
      const preferSpace = preferTop ? availableTopPx : availableBottomPx;
      const otherSpace = preferTop ? availableBottomPx : availableTopPx;

      const minUsable = 20;

      if (preferSpace >= minUsable || otherSpace < minUsable) {
        setMaxHIfChanged(preferSpace);
        setForcedYIfChanged(undefined);

        return;
      }

      setMaxHIfChanged(otherSpace);
      setForcedYIfChanged(
        preferTop
          ? { top: "100%", bottom: "auto" }
          : { top: "auto", bottom: "100%" }
      );
      return;
    }

    const liHeight = getLiHeightPx();

    if (!liHeight) {
      setMaxHIfChanged(preferTop ? availableTopPx : availableBottomPx);
      setForcedYIfChanged(undefined);

      return;
    }

    const min = liHeight * 1;
    const isTopOk = availableTopPx >= min;
    const isBottomOk = availableBottomPx >= min;

    if (!isTopOk && !isBottomOk) {
      setMaxHIfChanged(preferTop ? availableTopPx : availableBottomPx);
      setForcedYIfChanged(undefined);

      return;
    }

    if (preferTop) {
      if (isTopOk) {
        setMaxHIfChanged(availableTopPx);
        setForcedYIfChanged(undefined);
      } else {
        setMaxHIfChanged(availableBottomPx);
        setForcedYIfChanged({ top: "100%", bottom: "auto" });
      }
    } else {
      if (isBottomOk) {
        setMaxHIfChanged(availableBottomPx);
        setForcedYIfChanged(undefined);
      } else {
        setMaxHIfChanged(availableTopPx);
        setForcedYIfChanged({ top: "auto", bottom: "100%" });
      }
    }
  }, [
    buttonContainerRef,
    searchInputRef,
    position,
    optionsCount,
    getLiHeightPx,
    setForcedYIfChanged,
    setMaxHIfChanged,
  ]);

  const reCalcAll = useCallback(() => {
    preventFromOverflowY();
    preventFromOverflowX();
    reCalcMeasuredContentHeight();
  }, [preventFromOverflowY, preventFromOverflowX, reCalcMeasuredContentHeight]);

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    cachedListItemHeightRef.current = null;
    setForcedXIfChanged(undefined);
    setForcedYIfChanged(undefined);

    let raf1 = 0;
    let raf2 = 0;
    let raf3 = 0;

    reCalcAll();

    raf1 = requestAnimationFrame(() => {
      reCalcAll();
      raf2 = requestAnimationFrame(() => {
        reCalcAll();
        raf3 = requestAnimationFrame(() => {
          reCalcAll();
        });
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      cancelAnimationFrame(raf3);
    };
  }, [
    isOpen,
    optionsCount,
    reCalcAll,
    setForcedXIfChanged,
    setForcedYIfChanged,
  ]);

  useLayoutEffect(() => {
    if (!isOpen) {
      return;
    }

    let rafId = 0;
    const onResize = () => {
      cachedListItemHeightRef.current = null;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        reCalcAll();
      });
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen, reCalcAll]);

  if (!isOpen) {
    return null;
  }

  const baseY: CSSProperties = position.includes("top")
    ? { top: "auto", bottom: "100%" }
    : { top: "100%", bottom: "auto" };

  const baseX: CSSProperties = position.includes("left")
    ? { left: 0, right: "auto" }
    : { right: 0, left: "auto" };

  const positionStyles: CSSProperties = {
    position: "absolute",
    ...baseY,
    ...baseX,
    ...(forcedHorizontalPositionStyles ?? {}),
    ...(forcedVerticalPositionStyles ?? {}),
    ...(maxAllowedHeightPx ? { maxHeight: `${maxAllowedHeightPx}px` } : {}),
    ...(measuredContentHeightPx > 0
      ? { height: `${measuredContentHeightPx}px` }
      : {}),
    overflowY: "auto",
  };

  return (
    <div
      className={contentClasses}
      style={positionStyles}
      ref={contentWrapperRef}
    >
      {children}
    </div>
  );
};

export default ZDropButtonContent;
