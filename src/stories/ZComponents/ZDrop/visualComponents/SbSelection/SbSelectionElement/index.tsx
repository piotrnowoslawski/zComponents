import { goToStory } from "@stories/storybookLinks";
import { SelectType, StoryType } from "@stories/types/visualComponentsTypes";
import styles from "@stories/styles/StorybookTheme.module.scss";

interface Props {
  selected?: string;
  selectType?: SelectType;
  storyType: StoryType;
}

const SbSelectionElement = (props: Props) => {
  const { selected, selectType, storyType } = props;

  const boardImageUrl = selected
    ? `icons/${selectType}/z-${selected}.webp`
    : `icons/${selectType}/z-${
        selectType === "survivors" ? "stranger" : "unknown"
      }.webp`;

  const onSelectionElementClick = () => {
    goToStory(selectType === "survivors" ? "survivors" : "weapons", storyType);
  };

  return (
    <div
      className={styles.sbSelectionElement}
      onClick={onSelectionElementClick}
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
