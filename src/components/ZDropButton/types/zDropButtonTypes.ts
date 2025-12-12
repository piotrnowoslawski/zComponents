import { ChangeEvent, JSX, ReactElement, ReactNode, RefObject } from "react";

export interface ZDropButtonBaseProps {
  options: any[];
  className?: string;
  toggleClassName?: string;
  children: ReactNode;
  onToggle?: Function;
  onSelect?: Function;
  onHide?: Function;
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
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
  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  buttonContainerRef?: RefObject<HTMLDivElement | null>;
  optionsRef?: RefObject<HTMLLIElement[]>;
  searchInputRef?: RefObject<HTMLInputElement | null>;
  addToRefs?: Function;
};

export interface ZDropButtonContentProps {
  children: ReactNode;
  position?:
    | "left"
    | "right"
    | "top"
    | "bottom"
    | "top left"
    | "top right"
    | "bottom left"
    | "bottom right";
}

export interface ZDropButtonToggleProps {
  title?: string | number;
  toggleIcon?: ReactElement;
  toggleClassName?: string;
  children?: ReactNode;
  onButtonToggleClick: () => void;
}

export interface ZDropButtonListProps {
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
}
