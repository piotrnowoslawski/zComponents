const isObj = (x: unknown): x is Record<string, unknown> =>
  typeof x === "object" && x !== null;

export const findDefaultValue = (
  options: unknown[],
  value: unknown,
  labelKey: string,
  valueKey: string
) => {
  const key = isObj(value) && valueKey in value ? value[valueKey] : value;

  const found = options.find((option) =>
    isObj(option)
      ? valueKey in option && option[valueKey] === key
      : option === key
  );

  return isObj(found) ? found[labelKey] : found;
};
