export const checkIsInputValueEqualToOptionValue = (
  value: any,
  option: any,
  valueKey: string
): boolean => {
  return (
    value === option ||
    value === option[valueKey] ||
    (value[valueKey] === option[valueKey] && value?.[valueKey] !== undefined)
  );
};

export const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== "object" || typeof b !== "object") return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((el, i) => deepEqual(el, b[i]));
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) => deepEqual(a[key], b[key]));
};
