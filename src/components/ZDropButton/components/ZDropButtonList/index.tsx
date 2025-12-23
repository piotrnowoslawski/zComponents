import { ZDropButtonListProps } from "components/ZDropButton/types/zDropButtonTypes";
import styles from "../../styles/ZDropButton.module.scss";
import { classNames } from "@helpers/classNames";

const ZDropButtonList = (props: ZDropButtonListProps) => {
  const { children, className } = props;

  const listClasses = classNames(styles["zd-button__list"], className);

  return <ul className={listClasses}>{children}</ul>;
};

export default ZDropButtonList;
