import { ZDropMultipleInputItemProps } from "../../../types/zDropTypes";
import { classNames } from "../../../../../helpers/classNames";
import styles from "../../../styles/ZDrop.module.scss";

export const ZDropMultipleInputValue = (props: ZDropMultipleInputItemProps) => {
  const {
    option,
    labelType,
    onInputOptionRemove,
    valueRenderer,
    inputMultipleValueClassName,
    isDisabled,
  } = props;

  const inputItemClasses = classNames(
    styles.inputMultipleValue,
    inputMultipleValueClassName
  );

  if (option === null || option === undefined) {
    return null;
  }

  if (valueRenderer) {
    return (
      <li
        tabIndex={0}
        className={inputItemClasses}
        onKeyDown={(e) => {
          if (["Enter", " "].includes(e.key)) {
            onInputOptionRemove(e, option);
          }
        }}
      >
        {valueRenderer?.({
          option,
          onRemove: (e) => onInputOptionRemove(e, option),
        })}
      </li>
    );
  }

  return (
    <li tabIndex={-1} className={inputItemClasses}>
      <span>
        {typeof option === "object" && option !== null
          ? option[labelType] || option
          : option}
      </span>
      {onInputOptionRemove && !isDisabled && (
        <button
          tabIndex={0}
          className={styles.inputMultipleValueRemoveBtn}
          onClick={(e) => onInputOptionRemove(e, option)}
        >
          <span className={styles.inputMultipleValueRemoveBtnIcon}></span>
        </button>
      )}
    </li>
  );
};

export default ZDropMultipleInputValue;
