import { useState, ReactNode, useCallback, CSSProperties } from "react";
import {
  getElementOffsetTop,
  getReferenceElementDimensions,
} from "../../../helpers/getElementOffsetTop";
import styles from "../../../styles/ZDrop.module.scss";

interface Props {
  referenceElementClassName: string;
  positionToReferenceElement?: "top" | "bottom";
  listMaxHeightLimiter?: number;
  children: ReactNode;
}

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

const ZDropListWrapper = (props: Props) => {
  const {
    referenceElementClassName,
    positionToReferenceElement = "bottom",
    listMaxHeightLimiter,
    children,
  } = props;

  const [maxSpaceAbove, setMaxSpaceAbove] = useState<number>(0);
  const [maxSpaceBelow, setMaxSpaceBelow] = useState<number>(0);
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  const hasTopSpace = maxSpaceAbove > minUsableHeight;
  const hasBottomSpace = maxSpaceBelow > minUsableHeight;

  let finalPosition: "top" | "bottom";

  if (positionToReferenceElement === "top") {
    if (hasTopSpace) {
      finalPosition = "top";
    } else if (hasBottomSpace) {
      finalPosition = "bottom";
    } else {
      finalPosition = maxSpaceAbove >= maxSpaceBelow ? "top" : "bottom";
    }
  } else {
    if (hasBottomSpace) {
      finalPosition = "bottom";
    } else if (hasTopSpace) {
      finalPosition = "top";
    } else {
      finalPosition = maxSpaceBelow >= maxSpaceAbove ? "bottom" : "top";
    }
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

  const setWrapperMaxSpaces = (
    element: HTMLElement,
    referenceElementClassName: string
  ) => {
    const wrapperListOffsetTop = getElementOffsetTop(element);
    const referenceElement = getReferenceElementDimensions(
      element,
      referenceElementClassName
    );

    if (referenceElement) {
      const above = Math.max(
        wrapperListOffsetTop - referenceElement.top - distanceGap,
        0
      );
      const below = Math.max(
        referenceElement.bottom - wrapperListOffsetTop - distanceGap,
        0
      );

      setMaxSpaceAbove(above);
      setMaxSpaceBelow(below);

      const content = element.children[0] as HTMLElement | undefined;
      setScrollHeight(content ? content.scrollHeight : 0);
    }
  };

  const listWrapperRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) {
        setWrapperMaxSpaces(node, referenceElementClassName);
      }
    },
    [referenceElementClassName]
  );

  const wrapperStyle: CSSProperties = {
    position: "absolute",
    height: `${finalHeight}px`,
    maxHeight: `${finalHeight}px`,
    ...(finalPosition === "top"
      ? { top: `-${finalHeight + marginTop}px` }
      : { top: "100%" }),
  };

  return (
    <div
      className={styles.listWrapper}
      ref={listWrapperRef}
      style={wrapperStyle}
    >
      {children}
    </div>
  );
};

export default ZDropListWrapper;
