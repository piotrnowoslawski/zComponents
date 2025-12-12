import { ZDropButtonListProps } from "components/ZDropButton/types/zDropButtonTypes";
import styles from "../../styles/ZDropButton.module.scss";

const ZDropButtonList = (props: ZDropButtonListProps) => {
  const { children } = props;

  return <ul className={styles["zd-button__list"]}>{children}</ul>;
};

export default ZDropButtonList;
