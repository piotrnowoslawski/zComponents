import { ZRangeInputsProps } from "../../types/zRangeTypes";
import styles from "../../styles/ZRange.module.scss";

const ZRangeInputs = (props: ZRangeInputsProps) => {
  const {
    rangeValue,
    min,
    max,
    step,
    inputMinClasses,
    inputMaxClasses,
    onInputChange,
    onMouseDown,
    onTouchStart,
    onMouseMove,
    onTouchMove,
    onMouseUp,
    onTouchEnd,
  } = props;
  return (
    <div className={styles["z-range__inputs-wrapper"]}>
      <input
        ref={rangeValue.min.inputRef}
        name={"0"}
        type="range"
        min={min}
        max={max}
        // step={step || 1}
        step="any"
        value={rangeValue.min.value}
        className={inputMinClasses}
        onInput={onInputChange}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
      />
      <input
        ref={rangeValue.max.inputRef}
        name={"1"}
        type="range"
        min={min}
        max={max}
        // step={step || 1}
        step="any"
        value={rangeValue.max.value}
        className={inputMaxClasses}
        onInput={onInputChange}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onMouseMove={onMouseMove}
        onTouchMove={onTouchMove}
        onMouseUp={onMouseUp}
        onTouchEnd={onTouchEnd}
      />
    </div>
  );
};

export default ZRangeInputs;
