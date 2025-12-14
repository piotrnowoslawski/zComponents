import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  RefObject,
  Ref,
} from "react";

export type ZDropOption = string | number | { [key: string]: any };

export type ZDropSingleValue = ZDropOption | null | undefined;

export type ZDropMultipleValue = ZDropOption[];

export type ZDropValue = ZDropSingleValue | ZDropMultipleValue;

export type OptionsRef = { current: (HTMLLIElement | null)[] };

export type ValueRenderer = ({
  option,
  onRemove,
}: {
  option: ZDropOption;
  onRemove: MouseEventHandler;
}) => ReactElement;

export type OptionRenderer = (
  option: ZDropOption,
  isSelected: boolean,
  currentSearchedValue: string | undefined
) => ReactElement;

export type ExpandToggleRenderer = (isListVisible: boolean) => ReactElement;

export type InputOptionRemove = (
  e: React.MouseEvent | React.KeyboardEvent,
  option: ZDropOption
) => void;

export type Clear = "always" | "whenChanged" | "whenSearched" | "none";
export interface InputStyleClasses {
  input?: string;
  inputValue?: string;
  inputMultipleValue?: string;
  inputMultipleSearch?: string;
}

export interface ToggleStyleClasses {
  expandToggle?: string;
  expandToggleIcon?: string;
}

export interface ListStyleClasses {
  list?: string;
  listItem?: string;
  noData?: string;
}

export interface StyleClasses
  extends InputStyleClasses,
    ToggleStyleClasses,
    ListStyleClasses {
  container?: string;
  label?: string;
  inputField?: string;
  clearButton?: string;
  removeButton?: string;
}

export type SearchFilter = ({
  options,
  currentValue,
  labelKey,
}: {
  options: ZDropOption[];
  currentValue: string;
  labelKey: string;
}) => ZDropOption[];

export interface ZDropBaseProps {
  name: string;
  options?: ZDropOption[];
  value?: ZDropValue;
  valueKey?: string;
  label?: string | ReactElement;
  labelKey?: string;
  placeholder?: string;
  isMultiple?: boolean;
  isDisabled?: boolean;
  isSearchable?: boolean;
  clear?: Clear;
  searchFilterDelay?: number;
  searchFilter?: SearchFilter;
  shouldReturnObjectOnChange?: boolean;
  onChange?: Function;
  onBlur?: FocusEventHandler<HTMLDivElement>;
  onClear?: Function;
  valueRenderer?: ValueRenderer;
  optionRenderer?: OptionRenderer;
  expandToggleRenderer?: ExpandToggleRenderer;
  clearIcon?: ReactElement;
  noDataContent?: string | ReactElement;
  isAutoHeightEnabled?: boolean;
  autoHeightPosition?: "top" | "bottom";
  listMaxHeightLimiter?: number;
  styleClasses?: StyleClasses;
}

export interface ZDropWithReferenceElementProps extends ZDropBaseProps {
  referenceElementClassName?: string;
  positionToReferenceElement?: "top" | "bottom";
  isAutoHeightEnabled?: never;
  autoHeightPosition?: never;
}

export interface ZDropWithAutoHeightProps extends ZDropBaseProps {
  referenceElementClassName?: never;
  positionToReferenceElement?: never;
  isAutoHeightEnabled?: true;
  autoHeightPosition?: "top" | "bottom";
}

export type ZDropProps =
  | ZDropWithReferenceElementProps
  | ZDropWithAutoHeightProps;

export interface ZDropLabelProps {
  name?: string;
  label?: string | ReactElement;
  className?: string;
}

export interface ZDropListAutoHeightWrapperProps {
  containerRef: RefObject<HTMLDivElement | null>;
  position?: "top" | "bottom";
  children: ReactNode;
}

export interface ZDropListWrapperProps {
  referenceElementClassName: string;
  positionToReferenceElement?: "top" | "bottom";
  listMaxHeightLimiter?: number;
  children: ReactNode;
}
export interface ZDropListProps {
  options: ZDropOption[];
  selectedValue: ZDropValue;
  valueKey: string;
  labelKey: string;
  optionsRef: OptionsRef;
  optionRenderer?: OptionRenderer;
  onOptionClick: Function;
  onOptionKeyDown: Function;
  noDataContent?: string | ReactElement;
  currentSearchedValue?: string;
  listStyleClasses?: ListStyleClasses;
  isListWrapperEnabled?: boolean;
  isAutoHeightEnabled?: boolean;
}

export interface ZDropListItemProps {
  option: ZDropOption;
  index: number;
  children?: ReactElement;
  labelKey?: string;
  innerRef: Ref<HTMLLIElement | null>;
  onOptionClick: Function;
  onOptionKeyDown: Function;
  className?: string;
  optionClassName?: string;
}

export interface ZDropListNoDataProps {
  noDataContent?: string | ReactElement;
  className?: string;
}

export interface ZDropListVisibilityToggleProps {
  expandToggleRenderer?: ExpandToggleRenderer;
  onClick: MouseEventHandler<HTMLSpanElement>;
  isListVisible: boolean;
  toggleStyleClasses?: ToggleStyleClasses;
}

export interface ZDropClearButtonProps {
  hasValueChanged: boolean;
  currentSearchedValue: string;
  onInputClear: Function;
  isListVisible: boolean;
  isClearableOnlyWhenChange: boolean;
  isClearableOnlyWhenSearch: boolean;
  className?: string;
  clearIcon?: ReactElement;
}

export interface ZDropInputProps {
  name: string;
  options: ZDropOption[];
  selectedValue: ZDropValue;
  currentSearchedValue?: string;
  setCurrentSearchedValue?: Function;
  valueKey: string;
  labelKey: string;
  placeholder?: string;
  isMultiple: boolean;
  isDisabled: boolean;
  isSearchable: boolean;
  isListVisible: boolean;
  setIsListVisible: Function;
  isInputItemVisible: boolean;
  valueRenderer?: ValueRenderer;
  inputRef: RefObject<HTMLInputElement | null>;
  inputRefMultipleValueRenderer: RefObject<HTMLInputElement | null>;
  inputRefSingleValueRenderer: RefObject<HTMLInputElement | null>;
  onInputClick: MouseEventHandler;
  onInputItemClick: MouseEventHandler;
  onInputKeyDown: KeyboardEventHandler;
  onInputChange: ChangeEventHandler;
  onInputOptionRemove: InputOptionRemove;
  inputStyleClasses?: InputStyleClasses;
}

export interface ZDropSingleInputProps {
  name: string;
  options: ZDropOption[];
  selectedValue: ZDropSingleValue;
  currentSearchedValue?: string;
  setCurrentSearchedValue?: Function;
  valueKey: string;
  labelKey: string;
  placeholder?: string;
  isListVisible: boolean;
  isDisabled?: boolean;
  isSearchable?: boolean;
  valueRenderer?: ValueRenderer;
  inputRef: RefObject<HTMLInputElement | null>;
  inputRefSingleValueRenderer: RefObject<HTMLInputElement | null>;
  isInputItemVisible?: boolean;
  onInputClick: MouseEventHandler;
  onInputItemClick: MouseEventHandler;
  onInputKeyDown: KeyboardEventHandler;
  onInputChange: ChangeEventHandler;
  onInputOptionRemove: InputOptionRemove;
  inputClassName?: string;
  inputValueClassName?: string;
}

export interface ZDropSingleInputValueRendererProps {
  name: string;
  selectedValue: ZDropSingleValue;
  selectedOption?: ZDropOption;
  isSearchable: boolean;
  valueRenderer: ValueRenderer;
  inputValue: string | number;
  isListVisible: boolean;
  placeholder?: string;
  inputRefSingleValueRenderer?: RefObject<HTMLInputElement | null>;
  isInputItemVisible?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onInputItemClick: MouseEventHandler<HTMLDivElement>;
  onInputOptionRemove: InputOptionRemove;
  inputValueClassName?: string;
}

export interface ZDropMultipleInputProps {
  isListVisible: boolean;
  setIsListVisible: Function;
  name: string;
  selectedValue: ZDropMultipleValue;
  valueKey: string;
  labelKey: string;
  placeholder?: string;
  isDisabled?: boolean;
  isSearchable?: boolean;
  currentSearchedValue?: string;
  valueRenderer?: ValueRenderer;
  inputRefMultipleValueRenderer: RefObject<HTMLInputElement | null>;
  onInputClick: MouseEventHandler;
  onInputKeyDown: KeyboardEventHandler;
  onInputChange: ChangeEventHandler;
  onInputOptionRemove: InputOptionRemove;
  inputClassName?: string;
  inputMultipleValueClassName?: string;
  inputMultipleSearchClassName?: string;
}

export interface ZDropMultipleInputItemProps {
  option: ZDropOption;
  labelType: string;
  valueRenderer?: ValueRenderer;
  onInputOptionRemove: InputOptionRemove;
  inputMultipleValueClassName?: string;
  isDisabled?: boolean;
}

export interface ZDropDefaultSearchFilter {
  options: ZDropOption[];
  currentValue: string;
  labelKey: string;
}
