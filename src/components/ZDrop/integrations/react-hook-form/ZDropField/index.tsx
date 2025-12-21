import { Controller, ControllerFieldState, FieldValues } from "react-hook-form";
import ZDrop from "../../../../ZDrop";
import { ZDropFieldProps } from "./types/zDropFieldTypes";
import { classNames } from "@helpers/classNames";
import styles from "../../../styles/ZDrop.module.scss";

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

export const ZDropField = <TFieldValues extends FieldValues = FieldValues>(
  props: ZDropFieldProps<TFieldValues>
) => {
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

  const errorMessageClasses = classNames(
    styles["zd__error-message"],
    errorClassName
  );

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

        const {
          isAutoHeightEnabled,
          autoHeightPosition,
          referenceElementClassName,
          positionToReferenceElement,
          ...rest
        } = zDropProps;

        return (
          <>
            <ZDrop
              name={fieldName}
              value={zDropValue as any}
              onChange={handleChange}
              onBlur={onBlur}
              {...(isAutoHeightEnabled
                ? { isAutoHeightEnabled, autoHeightPosition }
                : { referenceElementClassName, positionToReferenceElement })}
              {...rest}
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
};

export default ZDropField;
