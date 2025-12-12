import { ZDropSingleInputValueRendererProps } from "../../../types/zDropTypes";
import { classNames } from "../../../../../helpers/classNames";
import styles from "../../../styles/ZDrop.module.scss";

export const ZDropSingleInputValueRenderer = (
  props: ZDropSingleInputValueRendererProps
) => {
  const {
    name,
    isInputItemVisible,
    isSearchable,
    selectedValue,
    selectedOption,
    valueRenderer,
    inputValue,
    isListVisible,
    placeholder,
    inputRefSingleValueRenderer,
    onChange,
    onInputItemClick,
    onInputOptionRemove,
    inputValueClassName,
  } = props;

  const inputValueClasses = classNames(
    styles["zd__input-single-search"],
    inputValueClassName
  );

  return (
    <>
      {isInputItemVisible && selectedOption !== undefined && (
        <div onClick={onInputItemClick}>
          {valueRenderer({
            option: selectedOption,
            onRemove: (e) => onInputOptionRemove(e, selectedOption),
          })}
        </div>
      )}
      {((!isListVisible &&
        !isSearchable &&
        (typeof selectedValue === "undefined" || selectedValue === "")) ||
        (isListVisible && !isSearchable)) &&
        placeholder}
      {isSearchable && !isInputItemVisible && (
        <input
          ref={inputRefSingleValueRenderer}
          name={name}
          tabIndex={isInputItemVisible ? 0 : -1}
          value={inputValue}
          onChange={onChange}
          className={inputValueClasses}
          placeholder={placeholder}
        />
      )}
    </>
  );
};

export default ZDropSingleInputValueRenderer;
