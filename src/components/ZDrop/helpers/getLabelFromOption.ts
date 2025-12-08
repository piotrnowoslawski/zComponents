import { ZDropOption, ZDropSingleValue } from "integrations-react-hook-form";

export const getLabelFromOption = (
  options: ZDropOption[],
  selectedValue: ZDropSingleValue,
  valueKey: string,
  labelKey: string
): string | number => {
  const foundOption = options.find((option) => {
    if (
      typeof option === "object" &&
      option !== null &&
      (typeof selectedValue === "string" || typeof selectedValue === "number")
    ) {
      return option[valueKey] === selectedValue;
    }

    if (
      typeof option === "object" &&
      option !== null &&
      typeof selectedValue === "object" &&
      selectedValue !== null
    ) {
      return option[valueKey] === selectedValue[valueKey];
    }

    return option === selectedValue;
  });

  if (foundOption !== undefined && foundOption !== null) {
    return typeof foundOption === "object"
      ? foundOption[labelKey]
      : foundOption;
  }

  return "";
};
