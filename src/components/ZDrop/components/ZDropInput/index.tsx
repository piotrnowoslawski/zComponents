import { ZDropInputProps } from "../../types/zDropTypes";
import ZDropMultipleInput from "./ZDropMultipleInput";
import ZDropSingleInput from "./ZDropSingleInput";

const ZDropInput = (props: ZDropInputProps) => {
  const {
    name,
    options,
    selectedValue,
    currentSearchedValue,
    setCurrentSearchedValue,
    valueKey,
    labelKey,
    placeholder,
    isMultiple,
    isDisabled,
    isSearchable,
    isListVisible,
    setIsListVisible,
    isInputItemVisible,
    valueRenderer,
    inputRef,
    inputRefMultipleValueRenderer,
    inputRefSingleValueRenderer,
    onInputClick,
    onInputItemClick,
    onInputKeyDown,
    onInputChange,
    onInputOptionRemove,
    inputStyleClasses,
  } = props;

  if (isMultiple && Array.isArray(selectedValue)) {
    return (
      <ZDropMultipleInput
        isListVisible={isListVisible}
        setIsListVisible={setIsListVisible}
        name={name}
        selectedValue={selectedValue}
        valueKey={valueKey}
        labelKey={labelKey}
        placeholder={placeholder}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        currentSearchedValue={currentSearchedValue}
        valueRenderer={valueRenderer}
        inputRefMultipleValueRenderer={inputRefMultipleValueRenderer}
        onInputClick={onInputClick}
        onInputKeyDown={onInputKeyDown}
        onInputChange={onInputChange}
        onInputOptionRemove={onInputOptionRemove}
        inputClassName={inputStyleClasses?.input}
        inputMultipleValueClassName={inputStyleClasses?.inputMultipleValue}
        inputMultipleSearchClassName={inputStyleClasses?.inputMultipleSearch}
      />
    );
  }

  return (
    <ZDropSingleInput
      options={options}
      name={name}
      selectedValue={selectedValue}
      currentSearchedValue={currentSearchedValue}
      setCurrentSearchedValue={setCurrentSearchedValue}
      valueKey={valueKey}
      labelKey={labelKey}
      isListVisible={isListVisible}
      placeholder={placeholder}
      isDisabled={isDisabled}
      isSearchable={isSearchable}
      valueRenderer={valueRenderer}
      isInputItemVisible={isInputItemVisible}
      inputRef={inputRef}
      inputRefSingleValueRenderer={inputRefSingleValueRenderer}
      onInputClick={onInputClick}
      onInputItemClick={onInputItemClick}
      onInputKeyDown={onInputKeyDown}
      onInputChange={onInputChange}
      onInputOptionRemove={onInputOptionRemove}
      inputClassName={inputStyleClasses?.input}
      inputValueClassName={inputStyleClasses?.inputValue}
    />
  );
};

export default ZDropInput;
