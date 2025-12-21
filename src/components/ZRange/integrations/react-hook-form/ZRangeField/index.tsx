import {
  useController,
  type FieldValues,
  type FieldPath,
} from "react-hook-form";
import ZRange from "../../../../ZRange";
import type { ZRangeRangeValue } from "../../../types/zRangeTypes";
import type { ZRangeFieldProps } from "./types/zRangeFieldTypes";
import { classNames } from "@helpers/classNames";
import styles from "../../../styles/ZRange.module.scss";

type ZRangeComponentChangeValue = {
  min?: { value?: number };
  max?: { value?: number };
};

const isRangeRangeValue = (value: any): value is ZRangeRangeValue =>
  value &&
  typeof value === "object" &&
  typeof value.min === "number" &&
  typeof value.max === "number";

const toFormRangeValue = (
  componentValue: unknown,
  fallback: ZRangeRangeValue
): ZRangeRangeValue => {
  const v = componentValue as ZRangeComponentChangeValue;

  return {
    min: typeof v?.min?.value === "number" ? v.min.value : fallback.min,
    max: typeof v?.max?.value === "number" ? v.max.value : fallback.max,
  };
};

const getErrorMessage = (error: unknown): string | undefined => {
  if (!error || typeof error !== "object") return undefined;
  const maybe = error as { message?: unknown };
  return typeof maybe.message === "string" ? maybe.message : undefined;
};

type FormUpdateTrigger = "select" | "change";

export const ZRangeField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(
  props: ZRangeFieldProps<TFieldValues, TName> & {
    commitMode?: FormUpdateTrigger;
  }
) => {
  const {
    control,
    name,
    rules,
    defaultValue,
    shouldUnregister,
    onValueChange,
    onValueSelect,
    hideError,
    errorClassName,
    errorRenderer,
    min,
    max,
    commitMode = "select",
    ...rest
  } = props;

  const errorMessageClasses = classNames(
    styles["zr__error-message"],
    errorClassName
  );

  const fallback: ZRangeRangeValue = defaultValue ?? { min, max };

  const { field, fieldState } = useController({
    name,
    control,
    rules,
    shouldUnregister,
    defaultValue: (defaultValue ?? fallback) as any,
  });

  // UWAGA: value do ZRange pochodzi TYLKO z RHF (albo fallback),
  // a RHF aktualizujemy na końcu (onSelect) — więc podczas dragowania value jest stabilne.
  const formValue: ZRangeRangeValue = isRangeRangeValue(field.value)
    ? field.value
    : fallback;

  const errorMessage = getErrorMessage(fieldState.error);

  const handleRangeChange = (componentValue: unknown, fieldName: string) => {
    const nextFormValue = toFormRangeValue(componentValue, fallback);

    // Live update tylko jeśli ktoś tego chce
    if (commitMode === "change") {
      field.onChange(nextFormValue);
    }

    onValueChange?.(nextFormValue, fieldName);
  };

  const handleRangeSelect = (componentValue: unknown, fieldName: string) => {
    const nextFormValue = toFormRangeValue(componentValue, fallback);

    // Commit dopiero na końcu => brak resetów w trakcie dragowania
    field.onChange(nextFormValue);
    field.onBlur();

    onValueSelect?.(nextFormValue, fieldName);
  };

  return (
    <div>
      <ZRange
        name={name as string}
        min={min}
        max={max}
        value={formValue}
        onChange={handleRangeChange}
        onSelect={handleRangeSelect}
        {...rest}
      />

      {!hideError && errorMessage ? (
        errorRenderer ? (
          <>{errorRenderer(errorMessage)}</>
        ) : (
          <div className={errorMessageClasses}>{errorMessage}</div>
        )
      ) : null}
    </div>
  );
};

export default ZRangeField;
