import { useState, CSSProperties, useRef, useLayoutEffect } from "react";
import {
  getElementOffsetTop,
  getReferenceElementDimensions,
} from "../../../helpers/getElementOffsetTop";
import styles from "../../../styles/ZDrop.module.scss";
import { ZDropListWrapperProps } from "integrations-react-hook-form";

const distanceGap = 0;
const marginTop = 10;
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
  } = props;

  const [maxSpaceAbove, setMaxSpaceAbove] = useState<number>(0);
  const [maxSpaceBelow, setMaxSpaceBelow] = useState<number>(0);
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  const listWrapperRef = useRef<HTMLDivElement | null>(null);

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
    scrollHeight,
    maxSpaceBelow,
    listMaxHeightLimiter ?? maxSpaceBelow
  );

  const heightForTop = calculateHeightForTop(
    scrollHeight,
    listMaxHeightLimiter ?? maxSpaceAbove,
    maxSpaceAbove
  );

  const finalHeight = finalPosition === "top" ? heightForTop : heightForBottom;

  const wrapperStyle: CSSProperties = {
    position: "absolute",
    height: `${finalHeight}px`,
    maxHeight: `${finalHeight}px`,
    ...(finalPosition === "top"
      ? { top: `-${finalHeight + marginTop}px` }
      : { top: "100%" }),
  };

  const setWrapperMaxSpaces = (
    listWrapper: HTMLElement,
    referenceClassName: string
  ) => {
    const anchor = listWrapper.parentElement;
    if (!anchor) {
      return;
    }

    const reference = getReferenceElementDimensions(anchor, referenceClassName);

    if (!reference) {
      return;
    }

    const anchorTop = getElementOffsetTop(anchor);
    const anchorBottom = anchorTop + anchor.offsetHeight;

    const above = Math.max(anchorTop - reference.top - distanceGap, 0);
    const below = Math.max(reference.bottom - anchorBottom - distanceGap, 0);

    setMaxSpaceAbove(above);
    setMaxSpaceBelow(below);

    const content = listWrapper.children[0] as HTMLElement | undefined;
    setScrollHeight(content ? content.scrollHeight : 0);
  };

  useLayoutEffect(() => {
    if (!listWrapperRef?.current) {
      return;
    }
    setWrapperMaxSpaces(listWrapperRef.current, referenceElementClassName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    referenceElementClassName,
    positionToReferenceElement,
    listMaxHeightLimiter,
    children,
  ]);

  return (
    <div
      className={styles["zd__list-wrapper"]}
      ref={listWrapperRef}
      style={wrapperStyle}
    >
      {children}
    </div>
  );
};

export default ZDropListWrapper;
