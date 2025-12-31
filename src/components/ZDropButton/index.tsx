import { createContext, useState, useRef, useEffect } from "react";
import ZDropButtonToggle from "./components/ZDropButtonToggle";
import ZDropButtonContent from "./components/ZDropButtonContent";
import ZDropButtonList from "./components/ZDropButtonList";
import ZDropButtonListItem from "./components/ZDropButtonListItem";
import ZDropButtonSearch from "./components/ZDropButtonSearch";
import styles from "./styles/ZDropButton.module.scss";
import { classNames } from "../../helpers/classNames";
import { useOutsideClose } from "../../hooks/useOutsideClose";
import {
  ZDropButtonContextType,
  ZDropButtonProps,
  ZDropItemSelectHandler,
} from "./types/zDropButtonTypes";

export const ZDropButtonContext = createContext<ZDropButtonContextType>({});

const ZDropButton = (props: ZDropButtonProps) => {
  const {
    options,
    title,
    className,
    toggleClassName,
    children,
    onToggle,
    toggleIcon,
    onHide,
    onSelect,
    onSearch,
    isOutsideClickActive = true,
  } = props;

  const buttonContainerRef = useRef<HTMLDivElement | null>(null);
  const optionsRef = useRef<Array<HTMLLIElement>>([]);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const buttonContainerClasses = classNames(styles["zd-button"], className);

  const addToRefs = (element: HTMLLIElement, index: number) => {
    return (optionsRef.current[index] = element);
  };

  const onButtonToggleClick = (): void => {
    setIsOpen((prev) => !prev);

    onHide?.();
    onToggle?.();
    onSearch?.("");
  };

  const onItemSelect: ZDropItemSelectHandler = (selectedItem) => {
    setIsOpen(false);

    onHide?.();
    onSelect?.(selectedItem);
    onSearch?.("");
  };

  useOutsideClose(
    buttonContainerRef,
    () => {
      setIsOpen(false);

      onHide?.();
      onSearch?.("");
    },
    {
      isActive: isOpen && isOutsideClickActive,
    }
  );

  useEffect(() => {
    optionsRef.current = optionsRef.current.slice(0, options?.length);
  }, [options]);

  return (
    <ZDropButtonContext.Provider
      value={{
        isOpen,
        onButtonToggleClick,
        onItemSelect,
        onSearch,
        buttonContainerRef,
        optionsRef,
        searchInputRef,
        addToRefs,
      }}
    >
      <div ref={buttonContainerRef} className={buttonContainerClasses}>
        <ZDropButtonToggle
          title={title}
          toggleIcon={toggleIcon}
          toggleClassName={toggleClassName}
          onButtonToggleClick={onButtonToggleClick}
        />
        {isOpen && children}
      </div>
    </ZDropButtonContext.Provider>
  );
};

ZDropButton.Content = ZDropButtonContent;
ZDropButton.List = ZDropButtonList;
ZDropButton.Item = ZDropButtonListItem;
ZDropButton.Search = ZDropButtonSearch;

export default ZDropButton;
