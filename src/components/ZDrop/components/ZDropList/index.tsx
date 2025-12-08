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
  } = props;

  const dropdownListClasses = classNames(styles.list, listStyleClasses?.list, {
    [styles["list--wrapper-enabled"]]: !!isListWrapperEnabled,
  });

  const getListItemClasses = (
    option: ZDropOption,
    isOptionSelected: boolean
  ) => {
    if (Array.isArray(selectedValue)) {
      return classNames(styles.option, listStyleClasses?.listItem, {
        [styles["option--active"]]: isOptionSelected,
      });
    }

    return classNames(styles.option, listStyleClasses?.listItem, {
      [styles["option--active"]]: isOptionSelected,
    });
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
