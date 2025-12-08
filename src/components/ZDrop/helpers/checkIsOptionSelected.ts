import {
  ZDropMultipleValue,
  ZDropOption,
  ZDropSingleValue,
} from "integrations-react-hook-form";

interface CheckIsEqualParams {
  value: ZDropSingleValue;
  option: ZDropOption;
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

export const checkIsOptionSelected = (
  checkIsInputValueEqualToOptionValue: CheckIsEqualFunction,
  value: ZDropMultipleValue,
  option: ZDropOption,
  valueKey: string
): boolean =>
  value.some((value) =>
    checkIsInputValueEqualToOptionValue(value, option, valueKey)
  );
