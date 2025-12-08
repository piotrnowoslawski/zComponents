import {
  ZDropOption,
  ZDropSingleValue,
  ZDropMultipleValue,
} from "../types/zDropTypes";

const isObj = (x: unknown): x is Record<string, unknown> =>
  typeof x === "object" && x !== null;

export const findOption = (
  options: ZDropOption[] = [],
  selected: ZDropSingleValue | ZDropMultipleValue,
  valueKey: string
): ZDropOption | undefined => {
  const key =
    isObj(selected) && valueKey in selected ? selected[valueKey] : selected;

  const found = options.find((option) => {
    return isObj(option)
      ? valueKey in option && option[valueKey] === key
      : option === key;
  });

  return found;
};
