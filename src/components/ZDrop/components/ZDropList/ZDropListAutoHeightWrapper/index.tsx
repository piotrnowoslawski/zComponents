import {
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
  CSSProperties,
} from "react";
import { getAvailableSpace } from "../../../../../helpers/getAvailableSpace";
import { ZDropListAutoHeightWrapperProps } from "../../../types/zDropTypes";
import styles from "../../../styles/ZDrop.module.scss";
import { classNames } from "@helpers/classNames";
import { getElementVerticalBorders } from "../../../../../helpers/getElementVerticalBorders";

const edgeDistance = 10;

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

  const calculateContentHeight = useCallback(() => {
    setForcedPositionY(undefined);

    if (wrapperRef.current && containerRef?.current) {
      const { top, bottom } = getAvailableSpace(containerRef.current);

      const availableTopPx = Math.max(0, top - edgeDistance);
      const availableBottomPx = Math.max(0, bottom - edgeDistance);

      let listItemHeightPx = cachedListItemHeightRef.current;

      if (!listItemHeightPx) {
        listItemHeightPx =
          wrapperRef.current.querySelector("li")?.getBoundingClientRect()
            .height || null;

        if (!listItemHeightPx) return;

        cachedListItemHeightRef.current = listItemHeightPx;
      }

      const minimumApprovedHeightPx = listItemHeightPx * 2;

      if (
        availableTopPx < minimumApprovedHeightPx &&
        availableBottomPx < minimumApprovedHeightPx
      ) {
        return;
      }

      if (
        position.includes("top") &&
        availableTopPx > minimumApprovedHeightPx
      ) {
        setMaxAllowedHeightPx(availableTopPx);
        return;
      }

      if (
        position.includes("top") &&
        availableTopPx <= minimumApprovedHeightPx
      ) {
        setMaxAllowedHeightPx(availableBottomPx);
        setForcedPositionY({ top: "100%", bottom: "auto" });
        return;
      }

      if (
        position.includes("bottom") &&
        availableBottomPx > minimumApprovedHeightPx
      ) {
        setMaxAllowedHeightPx(availableBottomPx);
        return;
      }

      if (
        position.includes("bottom") &&
        availableBottomPx <= minimumApprovedHeightPx
      ) {
        setMaxAllowedHeightPx(availableTopPx);
        setForcedPositionY({ top: "auto", bottom: "100%" });
        return;
      }

      setForcedPositionY(undefined);
    }
  }, [containerRef, position]);

  const preventFromOverflowY = useCallback(() => {
    if (!containerRef?.current || !wrapperRef.current) return;

    const dropdownHeightPx = containerRef.current.scrollHeight;
    const dropdownPositionYPx = containerRef.current.getBoundingClientRect().y;

    const viewportHeightPx =
      window.innerHeight || document.documentElement.clientHeight;

    const isOverflowingTop =
      dropdownPositionYPx < wrapperRef.current.scrollHeight;

    const isOverflowingBottom =
      dropdownPositionYPx + dropdownHeightPx + wrapperRef.current.clientHeight >
      viewportHeightPx;

    if (!isOverflowingTop && !isOverflowingBottom && !maxAllowedHeightPx) {
      calculateContentHeight();
      return;
    }

    if (!isOverflowingTop && isOverflowingBottom) {
      setForcedPositionY({ top: "auto", bottom: "100%" });
      calculateContentHeight();
      return;
    }

    if (isOverflowingTop && !isOverflowingBottom) {
      setForcedPositionY({ top: "100%", bottom: "auto" });
      calculateContentHeight();
      return;
    }

    if (isOverflowingTop && isOverflowingBottom) {
      calculateContentHeight();
    }
  }, [containerRef, calculateContentHeight, maxAllowedHeightPx]);

  const reCalcHeightFromContent = useCallback(() => {
    const wrapperElement = wrapperRef.current;
    if (!wrapperElement) return;

    const wrapperVerticalBordersPx = getElementVerticalBorders(wrapperElement);

    const firstListItemElement = wrapperElement.querySelector(
      "li"
    ) as HTMLElement | null;

    const isListRenderedInDom = !!firstListItemElement;

    if (!isListRenderedInDom) {
      cachedListItemHeightRef.current = null;
    }

    let calculatedContentHeight: number;

    if (isListRenderedInDom && optionsCount > 0) {
      let listItemHeightPx = cachedListItemHeightRef.current;

      if (!listItemHeightPx) {
        listItemHeightPx =
          firstListItemElement.getBoundingClientRect().height || null;

        if (listItemHeightPx) {
          cachedListItemHeightRef.current = listItemHeightPx;
        }
      }

      calculatedContentHeight = listItemHeightPx
        ? listItemHeightPx * optionsCount + wrapperVerticalBordersPx
        : wrapperVerticalBordersPx;
    } else {
      const firstChildElement =
        wrapperElement.firstElementChild as HTMLElement | null;

      if (!firstChildElement) {
        calculatedContentHeight = wrapperVerticalBordersPx;
      } else {
        const previousHeight = wrapperElement.style.height;
        const previousMaxHeight = wrapperElement.style.maxHeight;

        wrapperElement.style.height = "auto";
        wrapperElement.style.maxHeight = "none";
        wrapperElement.offsetHeight;

        const firstChildRectHeight =
          firstChildElement.getBoundingClientRect().height || 0;

        wrapperElement.style.height = previousHeight;
        wrapperElement.style.maxHeight = previousMaxHeight;

        const firstChildComputedStyles =
          window.getComputedStyle(firstChildElement);

        const marginTopPx =
          parseFloat(firstChildComputedStyles.marginTop || "0") || 0;
        const marginBottomPx =
          parseFloat(firstChildComputedStyles.marginBottom || "0") || 0;

        calculatedContentHeight =
          firstChildRectHeight +
          marginTopPx +
          marginBottomPx +
          wrapperVerticalBordersPx;
      }
    }

    const clampedContentHeight =
      maxAllowedHeightPx > 0
        ? Math.min(calculatedContentHeight, maxAllowedHeightPx)
        : calculatedContentHeight;

    setMeasuredContentHeightPx(Math.max(0, Math.round(clampedContentHeight)));
  }, [optionsCount, maxAllowedHeightPx]);

  useLayoutEffect(() => {
    preventFromOverflowY();
    requestAnimationFrame(() => {
      preventFromOverflowY();
      reCalcHeightFromContent();
    });
  }, [preventFromOverflowY, reCalcHeightFromContent]);

  useLayoutEffect(() => {
    cachedListItemHeightRef.current = null;
    setForcedPositionY(undefined);

    let raf1 = 0;
    let raf2 = 0;

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        preventFromOverflowY();
        reCalcHeightFromContent();
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [optionsCount, preventFromOverflowY, reCalcHeightFromContent]);

  useLayoutEffect(() => {
    let resizeTimeoutId: ReturnType<typeof setTimeout>;

    const onResize = () => {
      cachedListItemHeightRef.current = null;
      setForcedPositionY(undefined);

      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(() => {
        preventFromOverflowY();
        reCalcHeightFromContent();
      }, 50);
    };

    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(resizeTimeoutId);
      window.removeEventListener("resize", onResize);
    };
  }, [preventFromOverflowY, reCalcHeightFromContent]);

  useLayoutEffect(() => {
    reCalcHeightFromContent();
  }, [maxAllowedHeightPx, forcedPositionY, reCalcHeightFromContent]);

  const positionStyles: CSSProperties = {
    position: "absolute",
    ...(position.includes("top") ? { bottom: "100%" } : { top: "100%" }),
    ...(forcedPositionY && { ...forcedPositionY }),
    ...(maxAllowedHeightPx && { maxHeight: `${maxAllowedHeightPx}px` }),
    height: `${measuredContentHeightPx}px`,
    overflowY: "auto",
  };

  return (
    <div className={wrapperClasses} style={positionStyles} ref={wrapperRef}>
      {children}
    </div>
  );
};

export default ZDropListAutoHeightWrapper;
