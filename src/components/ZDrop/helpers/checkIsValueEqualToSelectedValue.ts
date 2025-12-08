import { ZDropValue } from "integrations-react-hook-form";

export const checkIsValueEqualToSelectedValue = (
  value: ZDropValue,
  selectedValue: ZDropValue
): boolean => {
  if (value === selectedValue) return true;
  if (value == null || selectedValue == null) return false;
  if (typeof value !== "object" || typeof selectedValue !== "object")
    return false;

  if (Array.isArray(value) && Array.isArray(selectedValue)) {
    if (value.length !== selectedValue.length) return false;
    return value.every((valueItem, i) =>
      checkIsValueEqualToSelectedValue(valueItem, selectedValue[i])
    );
  }

  const keysA = Object.keys(value);
  const keysB = Object.keys(selectedValue);
  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) =>
    checkIsValueEqualToSelectedValue(
      (value as any)[key],
      (selectedValue as any)[key]
    )
  );
};
