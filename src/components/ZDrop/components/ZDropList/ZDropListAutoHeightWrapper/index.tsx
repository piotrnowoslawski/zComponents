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
  const { containerRef, position = "bottom", className, children } = props;

  const contentRef = useRef<HTMLDivElement>(null);
  const liHeightRef = useRef<number | null>(null);

  const [forcedPositionY, setForcedPositionY] = useState<
    CSSProperties | undefined
  >();
  const [contentHeightValue, setContentHeightValue] = useState<number>(0);

  const wrapperClasses = classNames(
    styles["zd__list"],
    styles["zd__list-auto-height-wrapper"],
    className
  );

  const contentInnerHeightPx = (() => {
    const el = contentRef.current;
    if (!el) {
      return undefined;
    }

    const firstChild = el.firstElementChild as HTMLElement | null;

    if (!firstChild) {
      return undefined;
    }

    const borders = getElementVerticalBorders(el);
    const h = firstChild.scrollHeight + borders;

    return Number.isFinite(h) ? `${h}px` : undefined;
  })();

  const positionStyles: CSSProperties = {
    position: "absolute",
    ...(position.includes("top") ? { bottom: "100%" } : { top: "100%" }),
    ...(forcedPositionY && { ...forcedPositionY }),
    ...(contentHeightValue && {
      maxHeight: `${contentHeightValue}px`,
      ...(contentInnerHeightPx && { height: contentInnerHeightPx }),
    }),
  };

  const calculateContentHeight = useCallback(() => {
    setForcedPositionY(undefined);

    if (contentRef?.current && containerRef?.current) {
      const { top, bottom } = getAvailableSpace(containerRef.current);

      const availableTop = Math.max(0, top - edgeDistance);
      const availableBottom = Math.max(0, bottom - edgeDistance);

      let liElementHeight = liHeightRef.current;

      if (!liElementHeight) {
        liElementHeight =
          contentRef.current?.querySelector("li")?.getBoundingClientRect()
            .height || null;

        if (!liElementHeight) {
          return;
        }

        liHeightRef.current = liElementHeight;
      }

      const approvedHeight = liElementHeight * 2;

      if (availableTop < approvedHeight && availableBottom < approvedHeight) {
        return;
      }

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

        return;
      }

      if (position.includes("bottom") && availableBottom <= approvedHeight) {
        setContentHeightValue(availableTop);
        setForcedPositionY({ top: "auto", bottom: "100%" });

        return;
      }

      setForcedPositionY(undefined);
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

    const isOverFlowBottom =
      dropdownPositionY + dropdownHeight + contentRef.current.clientHeight >
      viewportHeight;

    if (!isOverFlowTop && !isOverFlowBottom && !contentHeightValue) {
      calculateContentHeight();
      return;
    }

    if (!isOverFlowTop && isOverFlowBottom) {
      setForcedPositionY({ top: "auto", bottom: "100%" });

      calculateContentHeight();

      return;
    }

    if (isOverFlowTop && !isOverFlowBottom) {
      setForcedPositionY({ top: "100%", bottom: "auto" });

      calculateContentHeight();

      return;
    }

    if (isOverFlowTop && isOverFlowBottom) {
      calculateContentHeight();
    }
  }, [containerRef, calculateContentHeight]);

  useLayoutEffect(() => {
    preventFromOverflowY();
  }, [preventFromOverflowY]);

  useLayoutEffect(() => {
    let timeId: ReturnType<typeof setTimeout>;

    const onResize = () => {
      liHeightRef.current = null;
      setForcedPositionY(undefined);

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
    <div className={wrapperClasses} style={positionStyles} ref={contentRef}>
      {children}
    </div>
  );
};

export default ZDropListAutoHeightWrapper;
