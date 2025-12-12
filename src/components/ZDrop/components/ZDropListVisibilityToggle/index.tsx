import { ZDropListVisibilityToggleProps } from "../../types/zDropTypes";
import { classNames } from "../../../../helpers/classNames";
import styles from "../../styles/ZDrop.module.scss";

export const ZDropListVisibilityToggle = (
  props: ZDropListVisibilityToggleProps
) => {
  const { expandToggleRenderer, onClick, isListVisible, toggleStyleClasses } =
    props;

  const toggleClasses = classNames(
    styles["zd__expand-toggle"],
    toggleStyleClasses?.expandToggle
  );

  const iconClasses = classNames(
    styles["zd__expand-toggle-icon"],
    {
      [styles["zd__expand-toggle-icon--active"]]: isListVisible,
    },
    toggleStyleClasses?.expandToggleIcon
  );

  return (
    <div className={toggleClasses} onClick={onClick}>
      {expandToggleRenderer ? (
        <span>{expandToggleRenderer(isListVisible)}</span>
      ) : (
        <span className={iconClasses} />
      )}
    </div>
  );
};

export default ZDropListVisibilityToggle;
