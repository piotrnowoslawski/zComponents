import { ZDropListNoDataProps } from "../../../types/zDropTypes";
import styles from "../../../styles/ZDrop.module.scss";
import { classNames } from "@helpers/classNames";

export const ZDropListNoData = (props: ZDropListNoDataProps) => {
  const { noDataContent, className } = props;

  const noDataClasses = classNames(styles.noData, className);

  return <div className={noDataClasses}>{noDataContent}</div>;
};

export default ZDropListNoData;
