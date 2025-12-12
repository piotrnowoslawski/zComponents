import { ReactNode, useEffect, useState } from "react";
import styles from "@stories/styles/StorybookTheme.module.scss";
import { posterUrls } from "@stories/staticData/zDropData";
import { goToStory } from "@stories/storybookLinks";
import { SelectType, StoryType } from "@stories/types/visualComponentsTypes";

interface Props {
  posterImgUrl?: string;
  posterType: SelectType;
  storyType: StoryType;
  shouldRotate?: boolean;
  children?: ReactNode;
}

const SbPoster = (props: Props) => {
  const { posterImgUrl, posterType, storyType, shouldRotate, children } = props;

  const [currentPoster, setCurrentPoster] = useState<string>(
    posterUrls[posterType][1]
  );

  const onPosterClick = () => {
    goToStory("zombies", storyType);
  };

  useEffect(() => {
    if (!shouldRotate) return;

    let index = 1;

    const intervalId = setInterval(() => {
      index =
        index < Object.keys(posterUrls[posterType]).length ? index + 1 : 1;

      setCurrentPoster(posterUrls[posterType][index]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.sbPosterWrapper} onClick={onPosterClick}>
      <div className={styles.sbPoster}>
        <img
          className={styles.sbPosterImage}
          src={`${posterImgUrl || currentPoster}`}
        />
      </div>
      <img
        src="backgrounds/frames/z-frame.webp"
        className={styles.sbPosterFrame}
      />
      {children}
    </div>
  );
};
export default SbPoster;
