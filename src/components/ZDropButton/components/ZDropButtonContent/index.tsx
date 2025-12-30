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
import { getAvailableSpace } from "../../../../helpers/getAvailableSpace";
import { classNames } from "@helpers/classNames";
import { getElementVerticalBorders } from "../../../../helpers/getElementVerticalBorders";

const edgeDistance = 10;

const ZDropButtonContent = (props: ZDropButtonContentProps) => {
  const {
    position = "bottom-left",
    className,
    optionsCount,
    children,
  } = props as ZDropButtonContentProps & { optionsCount?: number };

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

  const calculateMaxAllowedHeight = useCallback(() => {
    setForcedVerticalPositionStyles(undefined);

    if (contentWrapperRef.current && buttonContainerRef?.current) {
      const searchInputHeightPx = searchInputRef?.current?.clientHeight ?? 0;

      const { top, bottom } = getAvailableSpace(buttonContainerRef.current);

      const availableTopPx = Math.max(
        0,
        top - searchInputHeightPx - edgeDistance
      );
      const availableBottomPx = Math.max(
        0,
        bottom - searchInputHeightPx - edgeDistance
      );

      let listItemHeightPx = cachedListItemHeightRef.current;

      if (!listItemHeightPx) {
        listItemHeightPx =
          contentWrapperRef.current
            ?.querySelector("li")
            ?.getBoundingClientRect().height || null;

        if (!listItemHeightPx) {
          return;
        }

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
        setForcedVerticalPositionStyles({ top: "100%", bottom: "auto" });
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
        setForcedVerticalPositionStyles({ top: "auto", bottom: "100%" });
        return;
      }

      setForcedVerticalPositionStyles(undefined);
    }
  }, [buttonContainerRef, searchInputRef, position]);

  const preventFromOverflowX = useCallback(() => {
    if (!buttonContainerRef?.current || !contentWrapperRef.current) {
      return;
    }

    const buttonRect = buttonContainerRef.current.getBoundingClientRect();
    const contentWidthPx =
      contentWrapperRef.current.getBoundingClientRect().width;
    const viewportWidthPx = window.innerWidth;

    const isOverflowingLeft = buttonRect.left - contentWidthPx < 0;
    const isOverflowingRight =
      buttonRect.right + contentWidthPx > viewportWidthPx;

    if (isOverflowingRight && !isOverflowingLeft) {
      setForcedHorizontalPositionStyles({ right: 0, left: "auto" });
      return;
    }

    if (!isOverflowingRight && isOverflowingLeft) {
      setForcedHorizontalPositionStyles({ left: 0, right: "auto" });
      return;
    }

    setForcedHorizontalPositionStyles(undefined);
  }, [buttonContainerRef]);

  const preventFromOverflowY = useCallback(() => {
    if (!buttonContainerRef?.current || !contentWrapperRef.current) {
      return;
    }

    const toggleButtonHeightPx = buttonContainerRef.current.scrollHeight;
    const buttonDropdownPositionYPx =
      buttonContainerRef.current.getBoundingClientRect().y;

    const viewportHeightPx =
      window.innerHeight || document.documentElement.clientHeight;

    const isOverflowingTop =
      buttonDropdownPositionYPx < contentWrapperRef.current.clientHeight;

    const isOverflowingBottom =
      buttonDropdownPositionYPx +
        toggleButtonHeightPx +
        contentWrapperRef.current.clientHeight >
      viewportHeightPx;

    if (!isOverflowingTop && !isOverflowingBottom && !maxAllowedHeightPx) {
      calculateMaxAllowedHeight();
      return;
    }

    if (!isOverflowingTop && isOverflowingBottom) {
      setForcedVerticalPositionStyles({ top: "auto", bottom: "100%" });
      calculateMaxAllowedHeight();
      return;
    }

    if (isOverflowingTop && !isOverflowingBottom) {
      setForcedVerticalPositionStyles({ top: "100%", bottom: "auto" });
      calculateMaxAllowedHeight();
      return;
    }

    if (isOverflowingTop && isOverflowingBottom) {
      calculateMaxAllowedHeight();
    }
  }, [buttonContainerRef, calculateMaxAllowedHeight, maxAllowedHeightPx]);

  const reCalcMeasuredContentHeight = useCallback(() => {
    const contentWrapperElement = contentWrapperRef.current;
    if (!contentWrapperElement) return;

    const wrapperVerticalBordersPx = getElementVerticalBorders(
      contentWrapperElement
    );

    const firstListItemElement = contentWrapperElement.querySelector(
      "li"
    ) as HTMLElement | null;
    const isListRenderedInDom = !!firstListItemElement;

    if (!isListRenderedInDom) {
      cachedListItemHeightRef.current = null;
    }

    let calculatedContentHeightPx: number;

    if (
      isListRenderedInDom &&
      typeof optionsCount === "number" &&
      optionsCount > 0
    ) {
      let listItemHeightPx = cachedListItemHeightRef.current;

      if (!listItemHeightPx) {
        listItemHeightPx =
          firstListItemElement.getBoundingClientRect().height || null;

        if (listItemHeightPx) {
          cachedListItemHeightRef.current = listItemHeightPx;
        }
      }

      calculatedContentHeightPx = listItemHeightPx
        ? listItemHeightPx * optionsCount + wrapperVerticalBordersPx
        : wrapperVerticalBordersPx;
    } else {
      const firstChildElement =
        contentWrapperElement.firstElementChild as HTMLElement | null;

      if (!firstChildElement) {
        calculatedContentHeightPx = wrapperVerticalBordersPx;
      } else {
        const previousInlineHeight = contentWrapperElement.style.height;
        const previousInlineMaxHeight = contentWrapperElement.style.maxHeight;

        contentWrapperElement.style.height = "auto";
        contentWrapperElement.style.maxHeight = "none";
        contentWrapperElement.offsetHeight;

        const firstChildRectHeightPx =
          firstChildElement.getBoundingClientRect().height || 0;

        contentWrapperElement.style.height = previousInlineHeight;
        contentWrapperElement.style.maxHeight = previousInlineMaxHeight;

        const firstChildComputedStyles =
          window.getComputedStyle(firstChildElement);
        const marginTopPx =
          parseFloat(firstChildComputedStyles.marginTop || "0") || 0;
        const marginBottomPx =
          parseFloat(firstChildComputedStyles.marginBottom || "0") || 0;

        calculatedContentHeightPx =
          firstChildRectHeightPx +
          marginTopPx +
          marginBottomPx +
          wrapperVerticalBordersPx;
      }
    }

    const firstChild = contentWrapperRef.current
      ?.firstElementChild as HTMLElement | null;

    const borders = firstChild ? getElementVerticalBorders(firstChild) : 0;

    const clampedContentHeightPx =
      maxAllowedHeightPx > 0
        ? Math.min(calculatedContentHeightPx, maxAllowedHeightPx)
        : calculatedContentHeightPx;

    setMeasuredContentHeightPx(
      Math.max(0, Math.round(clampedContentHeightPx + borders))
    );
  }, [optionsCount, maxAllowedHeightPx]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    preventFromOverflowX();
    preventFromOverflowY();

    requestAnimationFrame(() => {
      preventFromOverflowX();
      preventFromOverflowY();
      reCalcMeasuredContentHeight();
    });
  }, [
    isOpen,
    preventFromOverflowX,
    preventFromOverflowY,
    reCalcMeasuredContentHeight,
  ]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    cachedListItemHeightRef.current = null;
    setForcedHorizontalPositionStyles(undefined);
    setForcedVerticalPositionStyles(undefined);

    let raf1 = 0;
    let raf2 = 0;

    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        preventFromOverflowX();
        preventFromOverflowY();
        reCalcMeasuredContentHeight();
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [
    isOpen,
    optionsCount,
    preventFromOverflowX,
    preventFromOverflowY,
    reCalcMeasuredContentHeight,
  ]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    let resizeTimeoutId: ReturnType<typeof setTimeout>;

    const onResize = () => {
      cachedListItemHeightRef.current = null;
      setForcedHorizontalPositionStyles(undefined);
      setForcedVerticalPositionStyles(undefined);

      clearTimeout(resizeTimeoutId);
      resizeTimeoutId = setTimeout(() => {
        preventFromOverflowX();
        preventFromOverflowY();
        reCalcMeasuredContentHeight();
      }, 50);
    };

    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(resizeTimeoutId);
      window.removeEventListener("resize", onResize);
    };
  }, [
    isOpen,
    preventFromOverflowX,
    preventFromOverflowY,
    reCalcMeasuredContentHeight,
  ]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    reCalcMeasuredContentHeight();
  }, [
    isOpen,
    maxAllowedHeightPx,
    forcedVerticalPositionStyles,
    reCalcMeasuredContentHeight,
  ]);

  if (!isOpen) return null;

  const positionStyles: CSSProperties = {
    position: "absolute",
    ...(position.includes("top") ? { bottom: "100%" } : { top: "100%" }),
    ...(position.includes("left") ? { left: 0 } : { right: 0 }),
    ...(forcedHorizontalPositionStyles && {
      ...forcedHorizontalPositionStyles,
    }),
    ...(forcedVerticalPositionStyles && { ...forcedVerticalPositionStyles }),
    ...(maxAllowedHeightPx && { maxHeight: `${maxAllowedHeightPx}px` }),
    height: `${measuredContentHeightPx}px`,
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
