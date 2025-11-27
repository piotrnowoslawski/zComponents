import { goToStory } from "@stories/storybookLinks";
import { SelectType, StoryType } from "@stories/types/visualComponentsTypes";
import styles from "@stories/styles/StorybookTheme.module.scss";
import { classNames } from "@helpers/classNames";

interface Props {
  selected?: string;
  selectType?: SelectType;
  storyType: StoryType;
  className?: string;
}

const SbSelectionElement = (props: Props) => {
  const { selected, selectType, storyType, className } = props;

  const selectionElementClasses = classNames(
    styles.sbSelectionElement,
    className
  );

  const boardImageUrl = selected
    ? `icons/${selectType}/z-${selected}.webp`
    : `icons/${selectType}/z-${
        selectType === "survivors" ? "stranger" : "unknown"
      }.webp`;

  const onSelectionElementClick = () => {
    if (storyType === "integrations") {
      return;
    }

    goToStory(selectType === "survivors" ? "survivors" : "weapons", storyType);
  };

  return (
    <div
      className={selectionElementClasses}
      onClick={onSelectionElementClick}
      style={{
        cursor: storyType === "integrations" ? "default" : "pointer",
        pointerEvents: storyType === "integrations" ? "none" : "auto",
      }}
    >
      <img
        className={styles.sbSelectionElementBackground}
        src={`boards/${selectType}-board.webp`}
        alt={`${selectType} label`}
      />
      <img
        className={styles.sbSelectionElementImage}
        src={boardImageUrl}
        alt={`${selectType} board`}
      />
    </div>
  );
};

export default SbSelectionElement;
