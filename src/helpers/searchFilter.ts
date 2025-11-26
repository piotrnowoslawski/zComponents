import { ZDropDefaultSearchFilter } from "../components/ZDrop/types/zDropTypes";

export const defaultSearchFilter = ({
  options,
  currentValue,
  labelKey,
}: ZDropDefaultSearchFilter) => {
  if (
    options.every(
      (option) => typeof option === "string" || typeof option === "number"
    )
  ) {
    return options.filter((option) =>
      option.toString().toLowerCase().includes(currentValue.toLowerCase())
    );
  }

  return options.filter(
    (option) =>
      typeof option === "object" &&
      option !== null &&
      option[labelKey]
        ?.toString()
        .toLowerCase()
        .includes(currentValue.toLowerCase())
  );
};
