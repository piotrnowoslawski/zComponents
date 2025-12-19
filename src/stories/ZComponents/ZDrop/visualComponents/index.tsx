import SbSelection from "@stories/ZComponents/ZDrop/visualComponents/SbSelection";
import SbPoster from "@stories/ZComponents/ZDrop/visualComponents/SbPoster";
import { StoriesZDropVisualComponentsProps } from "@stories/types/visualComponentsTypes";
import styles from "./styles/SbVisualComponents.module.scss";

const StoriesVisualComponents = (props: StoriesZDropVisualComponentsProps) => {
  const { storyType, posterType } = props;

  return (
    <div className={styles.sbZDropVisualComponents}>
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
