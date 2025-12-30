import { ChangeEvent, JSX, ReactElement, ReactNode, RefObject } from "react";

export interface ZDropButtonBaseProps {
  options: any[];
  className?: string;
  toggleClassName?: string;
  children: ReactNode;
  onToggle?: Function;
  onSelect?: Function;
  onHide?: Function;
  onSearch?: (value: string) => void;
  isOutsideClickActive?: boolean;
}

export interface ToggleButtonTitleRequireProps extends ZDropButtonBaseProps {
  title: string | number;
  toggleIcon?: ReactElement;
}

export interface ToggleButtonIconRequireProps extends ZDropButtonBaseProps {
  title?: string | number;
  toggleIcon: ReactElement;
}

export type ZDropButtonProps =
  | ToggleButtonTitleRequireProps
  | ToggleButtonIconRequireProps;

export type ZDropItemSelectHandler = (selectedItemIndex: number) => void;

export type ZDropButtonContextType = {
  isOpen?: boolean;
  onButtonToggleClick?: () => void;
  onItemSelect?: ZDropItemSelectHandler;
  onSearch?: (value: string) => void;
  buttonContainerRef?: RefObject<HTMLDivElement | null>;
  optionsRef?: RefObject<HTMLLIElement[]>;
  searchInputRef?: RefObject<HTMLInputElement | null>;
  addToRefs?: Function;
};

export interface ZDropButtonContentProps {
  position?:
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "top left"
    | "top right"
    | "bottom left"
    | "bottom right";
  className?: string;
  optionsCount: number;
  children: ReactNode;
}

export interface ZDropButtonToggleProps {
  title?: string | number;
  toggleIcon?: ReactElement;
  toggleClassName?: string;
  children?: ReactNode;
  onButtonToggleClick: () => void;
}

export interface ZDropButtonListProps {
  className?: string;
  children: ReactNode;
}

export type LinkLikeComponent = React.ComponentType<{
  to?: string;
  children?: React.ReactNode;
}>;

type LinkAs = "a" | LinkLikeComponent;

export interface ZDropButtonListItemProps {
  index: number;
  title: string | number;
  Icon?: JSX.Element;
  urlPath?: string;
  className?: string;
  linkAs?: LinkAs;
  isActive?: boolean;
  children?: ReactNode;
}

export interface ZDropButtonSearchProps {
  placeholder?: string;
  searchIcon?: ReactElement;
  clearIcon?: ReactElement;
  className?: string;
  shouldFocusOnOpen?: boolean;
}
