import { ZDropClearButtonProps } from "../../types/zDropTypes";
import { classNames } from "../../../../helpers/classNames";
import styles from "../../styles/ZDrop.module.scss";
import { checkIsClearHidden } from "../../helpers/checkIsClearHidden";

const ZDropClearButton = (props: ZDropClearButtonProps) => {
  const {
    hasValueChanged,
    currentSearchedValue,
    onInputClear,
    isListVisible,
    isClearableOnlyWhenChange,
    isClearableOnlyWhenSearch,
    className,
    clearIcon,
  } = props;

  const clearButtonClasses = classNames(styles.inputClearBtn, className);

  interface ClearValueEvent {
    preventDefault: () => void;
    stopPropagation: () => void;
    nativeEvent: {
      stopImmediatePropagation: () => void;
    };
  }

  const onClear = (e: ClearValueEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();

    onInputClear();
  };

  if (
    checkIsClearHidden(
      hasValueChanged,
      currentSearchedValue,
      isListVisible,
      isClearableOnlyWhenChange,
      isClearableOnlyWhenSearch
    )
  ) {
    return null;
  }

  return (
    <div className={styles.inputClearBtnWrapper}>
      <button tabIndex={-1} className={clearButtonClasses} onClick={onClear}>
        {clearIcon || <span className={styles.inputClearBtnIcon} />}
      </button>
    </div>
  );
};

export default ZDropClearButton;
