import { MouseEventHandler } from "react";
import { ZDropButtonToggleProps } from "components/ZDropButton/types/zDropButtonTypes";
import styles from "../../styles/ZDropButton.module.scss";
import { classNames } from "@helpers/classNames";

const ButtonDropdownToggle = (props: ZDropButtonToggleProps) => {
  const { title, toggleIcon, toggleClassName, children, onButtonToggleClick } =
    props;

  const toggleClasses = classNames(
    styles["zd-button__toggle"],
    toggleClassName
  );

  const onToggleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onButtonToggleClick();
  };

  const onToggleMouseLeave: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.currentTarget.blur();
  };

  return (
    <button
      className={toggleClasses}
      onMouseLeave={onToggleMouseLeave}
      onClick={onToggleClick}
    >
      {toggleIcon && (
        <div className={styles["zd-button__toggle-icon"]}>{toggleIcon}</div>
      )}
      {title && (
        <span className={styles["zd-button__toggle-title"]}>{title}</span>
      )}
      {children}
    </button>
  );
};

export default ButtonDropdownToggle;
