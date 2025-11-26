import { classNames } from "../../../../helpers/classNames";
import { ZDropLabelProps } from "../../types/zDropTypes";
import styles from "../../styles/ZDrop.module.scss";

export const ZDropLabel = (props: ZDropLabelProps) => {
  const { name, label, className } = props;

  const labelClasses = classNames(styles.label, className);

  if (typeof label === "string") {
    return (
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>
    );
  }

  return <div className={className}>{label}</div>;
};

export default ZDropLabel;
