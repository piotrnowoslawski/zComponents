import {
  Control,
  Controller,
  ControllerFieldState,
  FieldValues,
  Path,
  type RegisterOptions,
} from "react-hook-form";
import ZDrop from "../../../../ZDrop";
import type { ZDropProps } from "../../../types/zDropTypes";
import styles from "../../../styles/ZDrop.module.scss";
import { classNames } from "@helpers/classNames";

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

interface ControllerRenderFieldProps {
  onChange: (value: unknown) => void;
  value: unknown;
  name: string;
  onBlur?: () => void;
}

interface ControllerRenderProps {
  field: ControllerRenderFieldProps;
  fieldState: ControllerFieldState;
}

export function ZDropField<TFieldValues extends FieldValues = FieldValues>(
  props: ZDropFieldProps<TFieldValues>
) {
  const {
    control,
    name,
    rules,
    onChangeTransform,
    valueSelector,
    errorClassName,
    errorRenderer,
    ...zDropProps
  } = props;

  const errorMessageClasses = classNames(styles.errorMessage, errorClassName);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }: ControllerRenderProps) => {
        const { onChange, value, name: fieldName, onBlur } = field;

        const zDropValue =
          typeof valueSelector === "function" ? valueSelector(value) : value;

        const handleChange = (newValue: unknown) => {
          onChange(
            typeof onChangeTransform === "function"
              ? onChangeTransform(newValue)
              : newValue
          );
        };

        return (
          <>
            <ZDrop
              {...zDropProps}
              name={fieldName}
              value={zDropValue as any}
              onChange={handleChange}
              onBlur={onBlur}
            />
            {fieldState.error?.message && (
              <div className={errorMessageClasses}>
                {errorRenderer
                  ? errorRenderer(fieldState.error.message)
                  : fieldState.error.message}
              </div>
            )}
          </>
        );
      }}
    />
  );
}

export default ZDropField;
