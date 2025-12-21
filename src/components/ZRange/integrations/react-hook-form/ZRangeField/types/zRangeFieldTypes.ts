import type React from "react";
import type {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";
import type {
  ZRangeProps,
  ZRangeRangeValue,
} from "../../../../types/zRangeTypes";
import { ReactNode } from "react";

type ZRangeFieldBaseProps = Omit<
  ZRangeProps,
  "value" | "name" | "onChange" | "onSelect"
>;

export type ZRangeFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = ZRangeFieldBaseProps & {
  control: Control<TFieldValues>;
  name: TName;

  rules?: RegisterOptions<TFieldValues, TName>;
  defaultValue?: ZRangeRangeValue;
  shouldUnregister?: boolean;

  onValueChange?: (value: ZRangeRangeValue, name: string) => void;
  onValueSelect?: (value: ZRangeRangeValue, name: string) => void;

  hideError?: boolean;
  errorClassName?: string;
  errorRenderer?: (message: string) => ReactNode;
};
