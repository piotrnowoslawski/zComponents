import { classNames } from "../../../../helpers/classNames";
import ZDropListItem from "./ZDropListItem";
import ZDropListNoData from "./ZDropListNoData";
import { ZDropListProps, ZDropOption } from "../../types/zDropTypes";
import styles from "../../styles/ZDrop.module.scss";
import { checkIsValueEqualToOption } from "../../helpers/checkIsValueEqualToOption";
import { checkIsOptionSelected } from "../../helpers/checkIsOptionSelected";

export const ZDropList = (props: ZDropListProps) => {
  const {
    options = [],
    selectedValue,
    valueKey,
    labelKey,
    optionsRef,
    optionRenderer,
    onOptionClick,
    onOptionKeyDown,
    noDataContent,
    currentSearchedValue,
    listStyleClasses,
    isListWrapperEnabled,
    isAutoHeightEnabled,
  } = props;

  const dropdownListClasses = classNames(
    {
      [styles["zd__list"]]: !isAutoHeightEnabled,
      [styles["zd__list--auto-height-enabled"]]: isAutoHeightEnabled,
      [styles["zd__list--reference-wrapper-enabled"]]: isListWrapperEnabled,
    },
    listStyleClasses?.list
  );

  const getListItemClasses = (
    option: ZDropOption,
    isOptionSelected: boolean
  ) => {
    if (Array.isArray(selectedValue)) {
      return classNames(
        styles["zd__option"],
        {
          [styles["zd__option--active"]]: isOptionSelected,
        },
        listStyleClasses?.listItem
      );
    }

    return classNames(
      styles["zd__option"],
      {
        [styles["zd__option--active"]]: isOptionSelected,
      },
      listStyleClasses?.listItem
    );
  };

  if (options.length === 0) {
    return (
      <ZDropListNoData
        noDataContent={noDataContent}
        className={listStyleClasses?.noData}
      />
    );
  }

  return (
    <ul className={dropdownListClasses}>
      {options.map((option, index) => {
        const isOptionSelected = Array.isArray(selectedValue)
          ? checkIsOptionSelected(
              checkIsValueEqualToOption,
              selectedValue,
              option,
              valueKey
            )
          : checkIsValueEqualToOption(selectedValue, option, valueKey);

        return (
          <ZDropListItem
            key={(option as any)?.[valueKey] || index}
            innerRef={(el: HTMLLIElement | null) => {
              optionsRef.current[index] = el;
            }}
            option={option}
            index={index}
            labelKey={labelKey}
            onOptionClick={onOptionClick}
            onOptionKeyDown={onOptionKeyDown}
            className={getListItemClasses(option, isOptionSelected)}
          >
            {optionRenderer?.(option, isOptionSelected, currentSearchedValue)}
          </ZDropListItem>
        );
      })}
    </ul>
  );
};

export default ZDropList;
