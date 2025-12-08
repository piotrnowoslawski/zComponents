import { ChangeEvent, useState, useEffect, MouseEvent } from "react";
import { ZDropSingleInputProps } from "../../../types/zDropTypes";
import { classNames } from "../../../../../helpers/classNames";
import styles from "../../../styles/ZDrop.module.scss";
import ZDropSingleInputValue from "../ZDropSingleInputValue";
import { getLabelFromOption } from "../../../helpers/getLabelFromOption";

export const ZDropSingleInput = (props: ZDropSingleInputProps) => {
  const {
    options,
    name,
    selectedValue,
    currentSearchedValue,
    setCurrentSearchedValue,
    valueKey,
    labelKey,
    isListVisible,
    placeholder,
    isDisabled,
    isSearchable = false,
    valueRenderer,
    inputRef,
    inputRefSingleValueRenderer,
    onInputClick,
    onInputItemClick,
    onInputKeyDown,
    onInputChange,
    onInputOptionRemove,
    isInputItemVisible,
    inputValueClassName,
    inputClassName,
  } = props;

  const [inputValue, setInputValue] = useState<string | number>(
    getLabelFromOption(options, selectedValue, valueKey, valueKey)
  );

  const inputSelectClasses = classNames(styles.input, inputClassName, {
    [styles.inputSingle]: !!valueRenderer,
  });

  const selectedOption = options.find((option) => {
    if (
      typeof option === "object" &&
      option !== null &&
      typeof selectedValue === "object" &&
      selectedValue !== null
    ) {
      return option[valueKey] === selectedValue[valueKey];
    }

    if (
      typeof option === "object" &&
      option !== null &&
      selectedValue !== undefined &&
      (typeof selectedValue === "string" || typeof selectedValue === "number")
    ) {
      return option[valueKey] === selectedValue;
    }

    return option === selectedValue;
  });

  const onClick = (e: MouseEvent<HTMLInputElement>) => {
    onInputClick(e);

    if (isSearchable && !isListVisible) {
      setInputValue("");
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onInputChange(e);

    setInputValue(e.target.value);
    setCurrentSearchedValue?.(e.target.value);
  };

  useEffect(() => {
    if (selectedValue !== undefined) {
      setInputValue(
        getLabelFromOption(options, selectedValue, valueKey, labelKey)
      );
    }
  }, [selectedValue]);

  useEffect(() => {
    if (!isListVisible && isSearchable) {
      setInputValue(
        getLabelFromOption(options, selectedValue, valueKey, labelKey)
      );

      return;
    }

    currentSearchedValue !== undefined && setInputValue(currentSearchedValue);
  }, [isListVisible]);

  useEffect(() => {
    if (currentSearchedValue === "") {
      setInputValue("");
    }
  }, [currentSearchedValue]);

  if (valueRenderer) {
    return (
      <div
        tabIndex={0}
        className={inputSelectClasses}
        onClick={onInputClick}
        onKeyDown={onInputKeyDown}
        {...(isDisabled && {
          style: { pointerEvents: "none" },
        })}
      >
        <ZDropSingleInputValue
          name={name}
          isInputItemVisible={isInputItemVisible}
          isSearchable={isSearchable}
          selectedValue={selectedValue}
          selectedOption={selectedOption}
          valueRenderer={valueRenderer}
          inputValue={inputValue}
          isListVisible={isListVisible}
          placeholder={placeholder}
          inputRefSingleValueRenderer={inputRefSingleValueRenderer}
          onChange={onChange}
          onInputItemClick={onInputItemClick}
          onInputOptionRemove={onInputOptionRemove}
          inputValueClassName={inputValueClassName}
        />
      </div>
    );
  }

  return (
    <input
      ref={inputRef}
      className={inputSelectClasses}
      name={name}
      type="text"
      value={inputValue}
      placeholder={placeholder}
      disabled={isDisabled}
      onClick={onClick}
      onChange={onChange}
      onKeyDown={onInputKeyDown}
      readOnly={!isSearchable}
    />
  );
};

export default ZDropSingleInput;
