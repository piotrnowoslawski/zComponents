import SbSelection from "@stories/ZComponents/ZDrop/visualComponents/SbSelection";
import SbPoster from "@stories/ZComponents/ZDrop/visualComponents/SbPoster";
import { SelectType, StoryType } from "@stories/types/visualComponentsTypes";
import styles from "@stories/styles/StorybookTheme.module.scss";

interface Props {
  storyType: StoryType;
  posterType: SelectType;
}

const StoriesVisualComponents = (props: Props) => {
  const { storyType, posterType } = props;

  return (
    <div className={styles.sbVisualComponents}>
      <SbSelection storyType={storyType} />
      <SbPoster
        posterType={posterType}
        storyType={storyType}
        shouldRotate={true}
      />
    </div>
  );
};

export default StoriesVisualComponents;
