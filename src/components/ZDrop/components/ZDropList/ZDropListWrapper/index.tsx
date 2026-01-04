import {
  useState,
  CSSProperties,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  getElementOffsetTop,
  getReferenceElementDimensions,
} from "../../../helpers/getElementOffsetTop";
import styles from "../../../styles/ZDrop.module.scss";
import { ZDropListWrapperProps } from "integrations-react-hook-form";
import { classNames } from "@helpers/classNames";
import { getElementVerticalMargins } from "@helpers/getElementVerticalMargins";
import { getElementVerticalBorders } from "@helpers/getElementVerticalBorders";

const minUsableHeight = 50;

const calculateHeightForTop = (
  scrollHeight: number,
  maxHeightLimiter: number,
  wrapperMaxHeight: number
) => {
  const currentHeightLimiter =
    maxHeightLimiter < wrapperMaxHeight ? maxHeightLimiter : wrapperMaxHeight;

  return scrollHeight > currentHeightLimiter
    ? currentHeightLimiter
    : scrollHeight;
};

const ZDropListWrapper = (props: ZDropListWrapperProps) => {
  const {
    referenceElementClassName,
    positionToReferenceElement = "bottom",
    listMaxHeightLimiter,
    children,
    optionsCount,
    className,
  } = props;

  const listWrapperRef = useRef<HTMLDivElement | null>(null);
  const cachedListItemHeightRef = useRef<number | null>(null);

  const [maxSpaceAbove, setMaxSpaceAbove] = useState<number>(0);
  const [maxSpaceBelow, setMaxSpaceBelow] = useState<number>(0);
  const [measuredContentHeight, setMeasuredContentHeight] = useState<number>(0);
  const [animatedWrapperHeightPx, setAnimatedWrapperHeightPx] =
    useState<number>(0);

  const lastAboveRef = useRef<number>(-1);
  const lastBelowRef = useRef<number>(-1);
  const lastMeasuredContentHeightRef = useRef<number>(-1);
  const lastAnimatedHeightRef = useRef<number>(-1);

  const previousOptionsCountRef = useRef<number>(optionsCount);

  const wrapperClasses = classNames(styles["zd__list-wrapper"], className);

  const getWrapperVerticalSpacing = useCallback(() => {
    const wrapper = listWrapperRef.current;

    if (!wrapper) {
      return 0;
    }

    return (
      getElementVerticalMargins(wrapper) + getElementVerticalBorders(wrapper)
    );
  }, []);

  const getWrapperVerticalExtrasPx = useCallback(() => {
    const wrapper = listWrapperRef.current;

    if (!wrapper) {
      return 0;
    }

    const bordersPx = getElementVerticalBorders(wrapper);
    const cs = window.getComputedStyle(wrapper);
    const paddingTopPx = parseFloat(cs.paddingTop || "0") || 0;
    const paddingBottomPx = parseFloat(cs.paddingBottom || "0") || 0;

    return bordersPx + paddingTopPx + paddingBottomPx;
  }, []);

  const resetLocalCachesAndGuards = useCallback(() => {
    cachedListItemHeightRef.current = null;

    lastAboveRef.current = -1;
    lastBelowRef.current = -1;
    lastMeasuredContentHeightRef.current = -1;
    lastAnimatedHeightRef.current = -1;

    previousOptionsCountRef.current = optionsCount;

    setMaxSpaceAbove(0);
    setMaxSpaceBelow(0);
    setMeasuredContentHeight(0);
    setAnimatedWrapperHeightPx(0);
  }, [optionsCount]);

  const measureContentHeightPx = useCallback(() => {
    const wrapper = listWrapperRef.current;

    if (!wrapper) {
      return 0;
    }

    const wrapperVerticalExtrasPx = getWrapperVerticalExtrasPx();

    if (optionsCount > 0) {
      const firstListItem = wrapper.querySelector("li") as HTMLElement | null;

      if (firstListItem) {
        let listItemHeightPx = cachedListItemHeightRef.current;

        if (!listItemHeightPx) {
          listItemHeightPx =
            firstListItem.getBoundingClientRect().height || null;
          if (listItemHeightPx) {
            cachedListItemHeightRef.current = listItemHeightPx;
          }
        }

        const raw =
          (listItemHeightPx ? listItemHeightPx * optionsCount : 0) +
          wrapperVerticalExtrasPx;

        return Math.max(0, raw);
      }
    }

    cachedListItemHeightRef.current = null;

    const firstChild = wrapper.firstElementChild as HTMLElement | null;

    if (!firstChild) {
      return wrapperVerticalExtrasPx;
    }

    const previousInlineHeight = wrapper.style.height;
    const previousInlineMaxHeight = wrapper.style.maxHeight;

    wrapper.style.height = "auto";
    wrapper.style.maxHeight = "none";
    wrapper.offsetHeight;

    let contentRawPx = 0;

    const childScrollHeight = firstChild.scrollHeight || 0;
    if (childScrollHeight > 0) {
      contentRawPx = childScrollHeight;
    } else {
      const rectHeightPx = firstChild.getBoundingClientRect().height || 0;

      const childComputedStyles = window.getComputedStyle(firstChild);
      const childMarginTopPx =
        parseFloat(childComputedStyles.marginTop || "0") || 0;
      const childMarginBottomPx =
        parseFloat(childComputedStyles.marginBottom || "0") || 0;

      contentRawPx = rectHeightPx + childMarginTopPx + childMarginBottomPx;
    }

    wrapper.style.height = previousInlineHeight;
    wrapper.style.maxHeight = previousInlineMaxHeight;

    return Math.max(0, contentRawPx + wrapperVerticalExtrasPx);
  }, [optionsCount, getWrapperVerticalExtrasPx]);

  const updateMaxSpaces = useCallback(() => {
    const wrapper = listWrapperRef.current;

    if (!wrapper) {
      return;
    }

    const anchor = wrapper.parentElement;

    if (!anchor) {
      return;
    }

    const reference = getReferenceElementDimensions(
      anchor,
      referenceElementClassName
    );

    if (!reference) {
      return;
    }

    const elementVerticalSpacing = getWrapperVerticalSpacing();

    const anchorTop = getElementOffsetTop(anchor);
    const anchorBottom = anchorTop + anchor.offsetHeight;

    const above = Math.max(
      anchorTop - reference.top - elementVerticalSpacing,
      0
    );
    const below = Math.max(
      reference.bottom - anchorBottom - elementVerticalSpacing,
      0
    );

    if (lastAboveRef.current !== above) {
      lastAboveRef.current = above;
      setMaxSpaceAbove(above);
    }
    if (lastBelowRef.current !== below) {
      lastBelowRef.current = below;
      setMaxSpaceBelow(below);
    }
  }, [referenceElementClassName, getWrapperVerticalSpacing]);

  useLayoutEffect(() => {
    resetLocalCachesAndGuards();

    let raf1 = 0;
    let raf2 = 0;

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        updateMaxSpaces();

        const nextHeight = measureContentHeightPx();
        lastMeasuredContentHeightRef.current = nextHeight;
        setMeasuredContentHeight(nextHeight);
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!listWrapperRef.current) {
      return;
    }

    const previousCount = previousOptionsCountRef.current;
    previousOptionsCountRef.current = optionsCount;

    const isSwitchingBetweenListAndFallback =
      (previousCount > 0 && optionsCount === 0) ||
      (previousCount === 0 && optionsCount > 0);

    cachedListItemHeightRef.current = null;

    let raf1 = 0;
    let raf2 = 0;

    const runMeasure = () => {
      const next = measureContentHeightPx();
      if (lastMeasuredContentHeightRef.current !== next) {
        lastMeasuredContentHeightRef.current = next;
        setMeasuredContentHeight(next);
      }
    };

    raf1 = requestAnimationFrame(() => {
      if (isSwitchingBetweenListAndFallback) {
        raf2 = requestAnimationFrame(() => runMeasure());
      } else {
        runMeasure();
      }
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [optionsCount, measureContentHeightPx]);

  useLayoutEffect(() => {
    if (!listWrapperRef.current) {
      return;
    }

    if (optionsCount > 0) {
      return;
    }

    let raf1 = 0;
    let raf2 = 0;

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        const next = measureContentHeightPx();
        if (lastMeasuredContentHeightRef.current !== next) {
          lastMeasuredContentHeightRef.current = next;
          setMeasuredContentHeight(next);
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [children, optionsCount, measureContentHeightPx]);

  const hasTopSpace = maxSpaceAbove > minUsableHeight;
  const hasBottomSpace = maxSpaceBelow > minUsableHeight;

  let finalPosition: "top" | "bottom";

  if (positionToReferenceElement === "top") {
    if (hasTopSpace) finalPosition = "top";
    else if (hasBottomSpace) finalPosition = "bottom";
    else finalPosition = maxSpaceAbove >= maxSpaceBelow ? "top" : "bottom";
  } else {
    if (hasBottomSpace) finalPosition = "bottom";
    else if (hasTopSpace) finalPosition = "top";
    else finalPosition = maxSpaceBelow >= maxSpaceAbove ? "bottom" : "top";
  }

  const heightForBottom = Math.min(
    measuredContentHeight,
    maxSpaceBelow,
    listMaxHeightLimiter ?? maxSpaceBelow
  );

  const heightForTop = calculateHeightForTop(
    measuredContentHeight,
    listMaxHeightLimiter ?? maxSpaceAbove,
    maxSpaceAbove
  );

  const finalHeight = finalPosition === "top" ? heightForTop : heightForBottom;

  useLayoutEffect(() => {
    const nextHeightPx = Math.max(0, finalHeight);

    if (lastAnimatedHeightRef.current !== nextHeightPx) {
      lastAnimatedHeightRef.current = nextHeightPx;
      setAnimatedWrapperHeightPx(nextHeightPx);
    }
  }, [finalHeight]);

  const elementVerticalSpacing = getWrapperVerticalSpacing();

  const wrapperStyle: CSSProperties = {
    position: "absolute",
    height: `${animatedWrapperHeightPx}px`,
    maxHeight: `${animatedWrapperHeightPx}px`,
    ...(finalPosition === "top"
      ? { top: `-${animatedWrapperHeightPx + elementVerticalSpacing}px` }
      : { top: "100%" }),
  };

  return (
    <div className={wrapperClasses} ref={listWrapperRef} style={wrapperStyle}>
      {children}
    </div>
  );
};

export default ZDropListWrapper;
