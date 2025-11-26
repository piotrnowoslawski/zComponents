import { useZDropStore } from "@stories/ZComponents/ZDrop/store/zDropStore";
import styles from "@stories/styles/StorybookTheme.module.scss";
import SbSelectionElement from "./SbSelectionElement";
import { StoryType } from "@stories/types/visualComponentsTypes";

interface Props {
  storyType: StoryType;
}

const SbSelection = (props: Props) => {
  const { storyType } = props;

  const survivor = useZDropStore((s) => s.selectedSurvivor);
  const weapon = useZDropStore((s) => s.selectedWeapon);

  return (
    <div className={styles.sbSelection}>
      <SbSelectionElement
        selected={survivor?.string}
        selectType="survivors"
        storyType={storyType}
      />
      <SbSelectionElement
        selected={weapon?.string}
        selectType="weapons"
        storyType={storyType}
      />
    </div>
  );
};

export default SbSelection;
