import { ZDropMultipleInputProps } from "../../../types/zDropTypes";
import { classNames } from "../../../../../helpers/classNames";
import ZDropMultipleInputValue from "../ZDropMultipleInputValue";
import styles from "../../../styles/ZDrop.module.scss";

export const ZDropMultipleInput = (props: ZDropMultipleInputProps) => {
  const {
    isListVisible,
    setIsListVisible,
    name,
    selectedValue,
    valueKey,
    labelKey,
    placeholder,
    isDisabled,
    isSearchable,
    currentSearchedValue,
    valueRenderer,
    inputRefMultipleValueRenderer,
    onInputClick,
    onInputKeyDown,
    onInputChange,
    onInputOptionRemove,
    inputClassName,
    inputMultipleValueClassName,
    inputMultipleSearchClassName,
  } = props;

  const inputSelectClasses = classNames(
    styles["zd__input"],
    styles["zd__input-multiple"],
    inputClassName
  );
  const inputMultipleSearchClasses = classNames(
    styles["zd__input-multiple-search"]
  );
  const inputMultipleSearchWrapperClasses = classNames(
    styles["zd__input-multiple"],
    styles["zd__input-multiple-search-wrapper"],
    inputMultipleSearchClassName
  );

  interface InputKeyDownEvent {
    key: string;
    preventDefault: () => void;
  }

  const onKeyDown = (e: InputKeyDownEvent) => {
    if (["Enter"].includes(e.key)) {
      e.preventDefault();
    }
  };

  interface PlaceholderClickEvent {
    preventDefault: () => void;
    stopPropagation: () => void;
  }

  const onPlaceholderClick = (e: PlaceholderClickEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsListVisible(true);
  };

  return (
    <ul
      tabIndex={0}
      className={inputSelectClasses}
      onClick={onInputClick}
      onKeyDown={onInputKeyDown}
      {...(isDisabled && { style: { pointerEvents: "none" } })}
    >
      {selectedValue.map((option) => (
        <ZDropMultipleInputValue
          key={
            typeof option === "object" && !Array.isArray(option)
              ? option[valueKey]
              : option
          }
          option={option}
          labelType={labelKey}
          onInputOptionRemove={onInputOptionRemove}
          valueRenderer={valueRenderer}
          inputMultipleValueClassName={inputMultipleValueClassName}
          isDisabled={isDisabled}
        />
      ))}
      {((!isListVisible && selectedValue.length === 0) ||
        ((selectedValue.length === 0 || !selectedValue) && !isSearchable)) && (
        <span
          className={styles["zd__input-multiple-placeholder"]}
          onClick={onPlaceholderClick}
        >
          {placeholder}
        </span>
      )}
      {isSearchable && isListVisible && (
        <li className={inputMultipleSearchWrapperClasses}>
          <input
            ref={inputRefMultipleValueRenderer}
            name={name}
            className={inputMultipleSearchClasses}
            placeholder="search ..."
            value={currentSearchedValue}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
          />
        </li>
      )}
    </ul>
  );
};

export default ZDropMultipleInput;
