import { ZDropDefaultSearchFilter } from "../types/zDropTypes";

export const defaultSearchFilter = (props: ZDropDefaultSearchFilter) => {
  const { options, currentValue, labelKey } = props;

  const searchedValue = currentValue || "";

  if (
    options.every(
      (option) => typeof option === "string" || typeof option === "number"
    )
  ) {
    return options.filter((option) =>
      option.toString().toLowerCase().includes(searchedValue.toLowerCase())
    );
  }

  return options?.filter(
    (option) =>
      typeof option === "object" &&
      option !== null &&
      option[labelKey]
        ?.toString()
        .toLowerCase()
        .includes(searchedValue.toLowerCase())
  );
};
