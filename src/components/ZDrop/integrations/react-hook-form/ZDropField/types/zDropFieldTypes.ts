import type React from "react";
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import type { ZDropProps } from "../../../../types/zDropTypes";

export type ZDropFieldProps<TFieldValues extends FieldValues = FieldValues> =
  Omit<ZDropProps, "value" | "onChange" | "name"> & {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;

    onChangeTransform?: (zDropValue: unknown) => unknown;
    valueSelector?: (fieldValue: unknown) => unknown;

    errorClassName?: string;
    errorRenderer?: (message: string) => React.ReactNode;
  };
