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

const ZDropListAutoHeightWrapper = (props: ZDropListAutoHeightWrapperProps) => {
  const { containerRef, position = "bottom", children } = props;

  const contentRef = useRef<HTMLDivElement>(null);

  const [forcedPositionY, setForcedPositionY] = useState<
    CSSProperties | undefined
  >();
  const [contentHeightValue, setContentHeightValue] = useState<number>();

  console.log(contentHeightValue);

  const positionStyles: CSSProperties = {
    position: "absolute" as const,
    ...(position.includes("top") ? { bottom: "100%" } : { top: "100%" }),
    ...(forcedPositionY && { ...forcedPositionY }),
    ...(contentHeightValue && { maxHeight: contentHeightValue + "px" }),
  };

  const calculateContentHeight = useCallback(() => {
    if (contentRef?.current && containerRef?.current) {
      const { top, bottom } = getAvailableSpace(containerRef.current);

      console.log({ position, top, bottom });

      const availableTop = Math.max(0, top);
      const availableBottom = Math.max(0, bottom);

      const liElementHeight = contentRef?.current
        ?.querySelector("li")
        ?.getBoundingClientRect().height;

      if (!liElementHeight) {
        return;
      }

      const approvedHeight = liElementHeight * 2;

      if (position.includes("top") && availableTop > approvedHeight) {
        setContentHeightValue(availableTop);

        return;
      }

      if (position.includes("top") && availableTop <= approvedHeight) {
        setContentHeightValue(availableBottom);

        setForcedPositionY({ top: "100%", bottom: "auto" });

        return;
      }

      if (position.includes("bottom") && availableBottom > approvedHeight) {
        setContentHeightValue(availableBottom);

        console.log("bottom available");

        return;
      }

      if (position.includes("bottom") && availableBottom <= approvedHeight) {
        setContentHeightValue(availableTop);

        setForcedPositionY({ top: "auto", bottom: "100%" });
      }
    }
  }, [containerRef, position]);

  const preventFromOverflowY = useCallback(() => {
    if (!containerRef?.current || !contentRef.current) {
      return;
    }

    const dropdownHeight = containerRef.current.scrollHeight;
    const dropdownPositionY = containerRef.current.getBoundingClientRect().y;

    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    const isOverFlowTop = dropdownPositionY < contentRef.current.scrollHeight;

    console.log({ dropdownPositionY, dropdownHeight, viewportHeight });

    const isOverFlowBottom =
      dropdownPositionY + dropdownHeight + contentRef.current.clientHeight >
      viewportHeight;

    console.log({ isOverFlowTop, isOverFlowBottom });

    if (!isOverFlowTop && !isOverFlowBottom) {
      setForcedPositionY(undefined);
      setContentHeightValue(undefined);
      return;
    }

    if (!isOverFlowTop && isOverFlowBottom) {
      setForcedPositionY({ top: "auto", bottom: "100%" });
      setContentHeightValue(undefined);

      return;
    }

    if (isOverFlowTop && !isOverFlowBottom) {
      setForcedPositionY({ top: "100%", bottom: "auto" });
      setContentHeightValue(undefined);

      return;
    }

    if (isOverFlowTop && isOverFlowBottom) {
      calculateContentHeight();
    }
  }, [containerRef, calculateContentHeight]);

  useLayoutEffect(() => {
    preventFromOverflowY();
  }, [containerRef]);

  useLayoutEffect(() => {
    let timeId: ReturnType<typeof setTimeout>;

    const onResize = () => {
      clearTimeout(timeId);
      timeId = setTimeout(() => {
        preventFromOverflowY();
      }, 50);
    };

    window.addEventListener("resize", onResize);

    return () => {
      clearTimeout(timeId);
      window.removeEventListener("resize", onResize);
    };
  }, [preventFromOverflowY]);

  return (
    <div
      className={styles["zd__list-auto-height-wrapper"]}
      style={positionStyles}
      ref={contentRef}
    >
      {children}
    </div>
  );
};

export default ZDropListAutoHeightWrapper;
