import { ZRangeThumbProps } from "@components/ZRange/types/zRangeTypes";
import { classNames } from "@helpers/classNames";
import styles from "../../styles/ZRange.module.scss";

const ZRangeSliderValue = (props: ZRangeThumbProps) => {
  const { value, icon, sliderValueClassName } = props;

  const thumbClasses = classNames(
    styles["zr__slider-value"],
    styles["zr__slider-first-value"],
    sliderValueClassName
  );

  return (
    <div className={thumbClasses}>
      {icon && <span>{icon}</span>}
      <span>{value}</span>
    </div>
  );
};

export default ZRangeSliderValue;
