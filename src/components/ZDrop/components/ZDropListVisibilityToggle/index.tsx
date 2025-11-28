import { ZDropListVisibilityToggleProps } from "../../types/zDropTypes";
import { classNames } from "../../../../helpers/classNames";
import styles from "../../styles/ZDrop.module.scss";

export const ZDropListVisibilityToggle = (
  props: ZDropListVisibilityToggleProps
) => {
  const { expandToggleRenderer, onClick, isListVisible, toggleStyleClasses } =
    props;

  const toggleClasses = classNames(
    styles.expandToggle,
    toggleStyleClasses?.expandToggle
  );

  const iconClasses = classNames(
    styles.expandToggleIcon,
    toggleStyleClasses?.expandToggleIcon,
    {
      [styles["expandToggleIcon--active"]]: isListVisible,
    }
  );

  console.log(iconClasses);

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
