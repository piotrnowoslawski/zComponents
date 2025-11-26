import { classNames } from "../../../../helpers/classNames";
import ZDropListItem from "./ZDropListItem";
import ZDropListNoData from "./ZDropListNoData";
import { ZDropListProps, ZDropOption } from "../../types/zDropTypes";
import styles from "../../styles/ZDrop.module.scss";
import { checkIsValueEqualToOption } from "../../helpers/checkIsValueEqualToOption";

interface CheckIsEqualParams {
  value: any;
  option: any;
  valueType: string;
  labelType: string;
}

interface CheckIsEqualFunction {
  (
    value: CheckIsEqualParams["value"],
    option: CheckIsEqualParams["option"],
    valueType: CheckIsEqualParams["valueType"]
  ): boolean;
}

interface CheckIsEqualMultipleFunction {
  (
    checkIsEqual: CheckIsEqualFunction,
    value: any[],
    option: ZDropOption,
    valueKey: string
  ): boolean;
}

const checkIsEqualMultiple: CheckIsEqualMultipleFunction = (
  checkIsInputValueEqualToOptionValue: CheckIsEqualFunction,
  value: any[],
  option: ZDropOption,
  valueKey: string
): boolean =>
  value.some((value) =>
    checkIsInputValueEqualToOptionValue(value, option, valueKey)
  );

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
  } = props;

  const dropdownListClasses = classNames(styles.list, listStyleClasses?.list);

  const getListItemClasses = (option: ZDropOption) => {
    if (Array.isArray(selectedValue)) {
      return classNames(styles.option, listStyleClasses?.listItem, {
        [styles["option--active"]]: checkIsEqualMultiple(
          checkIsValueEqualToOption,
          selectedValue,
          option,
          valueKey
        ),
      });
    }

    return classNames(styles.option, listStyleClasses?.listItem, {
      [styles["option--active"]]: checkIsValueEqualToOption(
        selectedValue,
        option,
        valueKey
      ),
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
      {options.map((option, index) => (
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
          className={getListItemClasses(option)}
        >
          {optionRenderer?.(
            option,
            Array.isArray(selectedValue)
              ? checkIsEqualMultiple(
                  checkIsValueEqualToOption,
                  selectedValue,
                  option,
                  valueKey
                )
              : checkIsValueEqualToOption(selectedValue, option, valueKey),
            currentSearchedValue
          )}
        </ZDropListItem>
      ))}
    </ul>
  );
};

export default ZDropList;
