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

const edgeDistance = 10;

const ZDropButtonContent = (props: ZDropButtonContentProps) => {
  const { position = "bottom-left", className, children } = props;

  const { isOpen, buttonContainerRef, searchInputRef } =
    useContext(ZDropButtonContext);

  const contentRef = useRef<HTMLDivElement>(null);
  const liHeightRef = useRef<number | null>(null);

  const [forcedPositionX, setForcedPositionX] = useState<
    CSSProperties | undefined
  >();
  const [forcedPositionY, setForcedPositionY] = useState<
    CSSProperties | undefined
  >();
  const [contentHeightValue, setContentHeightValue] = useState<number>();

  const contentClasses = classNames(styles["zd-button__content"], className);

  const positionStyles: CSSProperties = {
    position: "absolute" as const,
    ...(position.includes("top") ? { bottom: "100%" } : { top: "100%" }),
    ...(position.includes("left") ? { left: 0 } : { right: 0 }),
    ...(forcedPositionX && { ...forcedPositionX }),
    ...(forcedPositionY && { ...forcedPositionY }),
    ...(contentHeightValue && {
      maxHeight: contentHeightValue + "px",
      height: contentHeightValue + "px",
    }),
  };

  const calculateContentHeight = useCallback(() => {
    if (contentRef?.current && buttonContainerRef?.current) {
      const searchInputHeight = searchInputRef?.current?.clientHeight ?? 0;

      const { top, bottom } = getAvailableSpace(buttonContainerRef.current);

      const availableTop = Math.max(0, top - searchInputHeight || edgeDistance);
      const availableBottom = Math.max(
        0,
        bottom - searchInputHeight || edgeDistance
      );

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

      const contentCurrentHeight = contentRef.current.scrollHeight;

      if (availableTop < approvedHeight && availableBottom < approvedHeight) {
        return;
      }

      if (position.includes("top") && availableTop > approvedHeight) {
        setContentHeightValue(
          availableTop < contentCurrentHeight
            ? availableTop
            : contentCurrentHeight
        );
        return;
      }

      if (position.includes("top") && availableTop <= approvedHeight) {
        setContentHeightValue(
          availableBottom < contentCurrentHeight
            ? availableBottom
            : contentCurrentHeight
        );
        setForcedPositionY({ top: "100%", bottom: "auto" });
        return;
      }

      if (position.includes("bottom") && availableBottom > approvedHeight) {
        setContentHeightValue(
          availableBottom < contentCurrentHeight
            ? availableBottom
            : contentCurrentHeight
        );
        return;
      }

      if (position.includes("bottom") && availableBottom <= approvedHeight) {
        setContentHeightValue(
          availableTop < contentCurrentHeight
            ? availableTop
            : contentCurrentHeight
        );
        setForcedPositionY({ top: "auto", bottom: "100%" });
      }
    }
  }, [buttonContainerRef, searchInputRef, position]);

  const preventFromOverflowX = useCallback(() => {
    if (!buttonContainerRef?.current || !contentRef.current) {
      return;
    }

    const buttonRect = buttonContainerRef.current.getBoundingClientRect();
    const contentWidth = contentRef.current.clientWidth;
    const viewportWidth = window.innerWidth;

    const isOverflowLeft = buttonRect.left - contentWidth < 0;
    const isOverflowRight = buttonRect.right + contentWidth > viewportWidth;

    if (isOverflowRight && !isOverflowLeft) {
      setForcedPositionX({ right: 0, left: "auto" });
      return;
    }

    if (!isOverflowRight && isOverflowLeft) {
      setForcedPositionX({ left: 0, right: "auto" });
      return;
    }

    setForcedPositionX(undefined);
  }, [buttonContainerRef]);

  const preventFromOverflowY = useCallback(() => {
    if (!buttonContainerRef?.current || !contentRef.current) {
      return;
    }

    const toggleButtonHeight = buttonContainerRef.current.scrollHeight;
    const buttonDropdownPositionY =
      buttonContainerRef.current.getBoundingClientRect().y;

    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;

    const isOverFlowTop =
      buttonDropdownPositionY < contentRef.current.clientHeight;

    const isOverFlowBottom =
      buttonDropdownPositionY +
        toggleButtonHeight +
        contentRef.current.clientHeight >
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
  }, [buttonContainerRef, calculateContentHeight, contentHeightValue]);

  useLayoutEffect(() => {
    if (isOpen) {
      preventFromOverflowX();
      preventFromOverflowY();
    }
  }, [isOpen, preventFromOverflowX, preventFromOverflowY]);

  useLayoutEffect(() => {
    if (isOpen) {
      let timeId: ReturnType<typeof setTimeout>;

      const onResize = () => {
        liHeightRef.current = null;

        clearTimeout(timeId);
        timeId = setTimeout(() => {
          preventFromOverflowX();
          preventFromOverflowY();
        }, 50);
      };

      window.addEventListener("resize", onResize);

      return () => {
        clearTimeout(timeId);
        window.removeEventListener("resize", onResize);
      };
    }
  }, [isOpen, preventFromOverflowX, preventFromOverflowY]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={contentClasses} style={positionStyles} ref={contentRef}>
      {children}
    </div>
  );
};

export default ZDropButtonContent;
