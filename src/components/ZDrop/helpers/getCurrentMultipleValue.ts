import { ZDropOption, ZDropValue } from "../types/zDropTypes";
import { findOption } from "./findOption";

export const getCurrentMultipleValue = (
  selected: ZDropOption | ZDropOption[],
  selectedValue: ZDropValue,
  options: ZDropOption[],
  valueKey: string
): ZDropOption[] => {
  const isSelectedValueArray = Array.isArray(selectedValue);

  if (
    isSelectedValueArray &&
    selectedValue.some(
      (val) => val === findOption(selectedValue, selected, valueKey)
    )
  ) {
    return selectedValue;
  }

  if (Array.isArray(selected)) {
    return options.filter(
      (option) =>
        findOption(selected, option, valueKey) ||
        findOption(selected, option, valueKey) === 0
    );
  }

  return [...(isSelectedValueArray ? selectedValue : []), selected];
};
