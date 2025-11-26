import { deepEqual } from "./checkIsEqual";

export const checkIsClearHidden = ({
  inputValue,
  value,
  option,
  valueType,
  isClearableOnlyWhenChange,
  currentSearchedValue,
}: any): boolean => {
  if (currentSearchedValue) {
    return false;
  }

  const isInputEmpty =
    !inputValue || (Array.isArray(inputValue) && inputValue.length === 0);

  const isSameValue =
    inputValue === value ||
    inputValue === value?.[valueType] ||
    (option && typeof option === "object" && value === option[valueType]) ||
    deepEqual(inputValue, value) ||
    (Array.isArray(value) &&
      Array.isArray(inputValue) &&
      inputValue.every((el) => value.includes(el[valueType])));

  return isInputEmpty || (isSameValue && isClearableOnlyWhenChange);
};
