import {
  useState,
  CSSProperties,
  useRef,
  useLayoutEffect,
  useCallback,
} from "react";
import { getReferenceElementDimensions } from "../../../helpers/getElementOffsetTop";
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

  const cssGapPxRef = useRef<number>(0);
  const [cssGapPx, setCssGapPx] = useState<number>(0);

  const readCssGapPx = useCallback(() => {
    const wrapper = listWrapperRef.current;

    if (!wrapper) {
      return;
    }

    const prevInlineMT = wrapper.style.marginTop;
    const prevInlineMB = wrapper.style.marginBottom;

    wrapper.style.marginTop = "";
    wrapper.style.marginBottom = "";

    const cs = window.getComputedStyle(wrapper);
    const mt = parseFloat(cs.marginTop || "0") || 0;

    wrapper.style.marginTop = prevInlineMT;
    wrapper.style.marginBottom = prevInlineMB;

    if (cssGapPxRef.current !== mt) {
      cssGapPxRef.current = mt;

      setCssGapPx(mt);
    }
  }, []);

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

  const measureVisualContentHeightPx = useCallback(
    (wrapper: HTMLDivElement, wrapperVerticalExtrasPx: number) => {
      const prevHeight = wrapper.style.height;
      const prevMaxHeight = wrapper.style.maxHeight;

      wrapper.style.height = "auto";
      wrapper.style.maxHeight = "none";
      wrapper.offsetHeight;

      const wrapperRect = wrapper.getBoundingClientRect();
      const childrenElements = Array.from(wrapper.children) as HTMLElement[];

      if (childrenElements.length === 0) {
        const height = (wrapper.scrollHeight || 0) + wrapperVerticalExtrasPx;
        wrapper.style.height = prevHeight;
        wrapper.style.maxHeight = prevMaxHeight;

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
      const total =
        unionHeight + topMarginPx + bottomMarginPx + wrapperVerticalExtrasPx;

      wrapper.style.height = prevHeight;
      wrapper.style.maxHeight = prevMaxHeight;

      return Math.max(0, total);
    },
    []
  );

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

    return measureVisualContentHeightPx(wrapper, wrapperVerticalExtrasPx);
  }, [optionsCount, getWrapperVerticalExtrasPx, measureVisualContentHeightPx]);

  const updateMaxSpaces = useCallback(() => {
    const wrapper = listWrapperRef.current;

    if (!wrapper) {
      return;
    }

    const anchor = wrapper.parentElement as HTMLElement | null;

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
    const anchorRect = anchor.getBoundingClientRect();

    const referenceEl = referenceElementClassName
      ? (anchor.closest(`.${referenceElementClassName}`) as HTMLElement | null)
      : null;

    const refRect = referenceEl
      ? referenceEl.getBoundingClientRect()
      : ({ top: reference.top, bottom: reference.bottom } as DOMRect);

    let refContentTop = refRect.top;
    let refContentBottom = refRect.bottom;

    if (referenceEl) {
      const cs = window.getComputedStyle(referenceEl);
      const paddingTop = parseFloat(cs.paddingTop || "0") || 0;
      const paddingBottom = parseFloat(cs.paddingBottom || "0") || 0;
      const borderTop = parseFloat(cs.borderTopWidth || "0") || 0;
      const borderBottom = parseFloat(cs.borderBottomWidth || "0") || 0;

      refContentTop = refRect.top + borderTop + paddingTop;
      refContentBottom = refRect.bottom - borderBottom - paddingBottom;
    }

    const above = Math.max(
      anchorRect.top - refContentTop - elementVerticalSpacing,
      0
    );

    const below = Math.max(
      refContentBottom - anchorRect.bottom - elementVerticalSpacing,
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

  const runMeasureTick = useCallback(() => {
    updateMaxSpaces();

    const next = measureContentHeightPx();
    if (lastMeasuredContentHeightRef.current !== next) {
      lastMeasuredContentHeightRef.current = next;
      setMeasuredContentHeight(next);
    }
  }, [updateMaxSpaces, measureContentHeightPx]);

  useLayoutEffect(() => {
    readCssGapPx();
  }, [readCssGapPx, className]);

  useLayoutEffect(() => {
    const wrapper = listWrapperRef.current;

    if (!wrapper) {
      return;
    }

    let rafId = 0;

    const schedule = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        runMeasureTick();
      });
    };

    let ro: ResizeObserver | null = null;
    let mo: MutationObserver | null = null;

    const attachResizeObserver = () => {
      ro?.disconnect();
      ro = new ResizeObserver(() => schedule());

      const target =
        (wrapper.firstElementChild as HTMLElement | null) ?? wrapper;

      ro.observe(target);
    };

    mo = new MutationObserver(() => {
      attachResizeObserver();
      schedule();
    });

    mo.observe(wrapper, { childList: true, subtree: true });

    attachResizeObserver();
    schedule();

    return () => {
      cancelAnimationFrame(rafId);
      ro?.disconnect();
      mo?.disconnect();
    };
  }, [runMeasureTick]);

  useLayoutEffect(() => {
    resetLocalCachesAndGuards();

    let raf1 = 0;
    let raf2 = 0;

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        runMeasureTick();
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
    let raf3 = 0;

    raf1 = requestAnimationFrame(() => {
      runMeasureTick();

      raf2 = requestAnimationFrame(() => {
        if (isSwitchingBetweenListAndFallback) runMeasureTick();

        raf3 = requestAnimationFrame(() => {
          if (isSwitchingBetweenListAndFallback) runMeasureTick();
        });
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      cancelAnimationFrame(raf3);
    };
  }, [optionsCount, runMeasureTick]);

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
        runMeasureTick();
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [children, optionsCount, runMeasureTick]);

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

  const wrapperStyle: CSSProperties = {
    position: "absolute",
    height: `${animatedWrapperHeightPx}px`,
    maxHeight: `${animatedWrapperHeightPx}px`,

    ...(finalPosition === "top"
      ? { top: "auto", bottom: "100%" }
      : { bottom: "auto", top: "100%" }),

    ...(finalPosition === "top"
      ? { marginTop: 0, marginBottom: `${cssGapPx}px` }
      : { marginBottom: 0, marginTop: `${cssGapPx}px` }),

    transitionProperty: "height, max-height",
  };

  return (
    <div className={wrapperClasses} ref={listWrapperRef} style={wrapperStyle}>
      {children}
    </div>
  );
};

export default ZDropListWrapper;
