import { ZRangeLabelProps } from "../../types/zRangeTypes";
import { classNames } from "@helpers/classNames";
import styles from "../../styles/ZRange.module.scss";

const ZRangeLabel = (props: ZRangeLabelProps) => {
  const { label, labelClassName } = props;

  const labelClasses = classNames(styles["zr__label"], labelClassName);

  return <div className={labelClasses}>{label}</div>;
};

export default ZRangeLabel;
