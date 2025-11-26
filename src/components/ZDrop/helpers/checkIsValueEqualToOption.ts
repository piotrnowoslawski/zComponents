import { ZDropOption, ZDropSingleValue } from "../types/zDropTypes";

export const checkIsValueEqualToOption = (
  selectedValue: ZDropSingleValue | ZDropSingleValue[],
  option: ZDropOption,
  valueKey: string
): boolean => {
  if (selectedValue === undefined || option === undefined) {
    return false;
  }

  if (Array.isArray(selectedValue)) {
    return selectedValue.some((value) =>
      checkIsValueEqualToOption(value, option, valueKey)
    );
  }

  const optionIsObject = typeof option === "object" && option !== null;
  const selectedIsObject =
    typeof selectedValue === "object" && selectedValue !== null;

  if (selectedValue === option) {
    return true;
  }

  if (!selectedIsObject && optionIsObject) {
    return selectedValue === (option as any)[valueKey];
  }

  if (selectedIsObject && optionIsObject) {
    return (selectedValue as any)[valueKey] === (option as any)[valueKey];
  }

  return false;
};
