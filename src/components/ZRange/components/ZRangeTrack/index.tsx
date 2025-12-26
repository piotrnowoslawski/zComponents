import {
  TrackStyleClasses,
  ZRangeTrackProps,
} from "@components/ZRange/types/zRangeTypes";
import styles from "../../styles/ZRange.module.scss";
import { classNames } from "@helpers/classNames";

const ZRangeTrack = (props: ZRangeTrackProps) => {
  const { rangeTrackRef, selectedRangeRef, selectedRangeStyle, trackStyles } =
    props;

  const { trackContainer, trackRange, trackSelected }: TrackStyleClasses =
    trackStyles;

  const trackClasses = classNames(styles["zr__slider"], trackContainer);
  const rangeClasses = classNames(styles["zr__slider-track"], trackRange);

  const selectedRangeClasses = classNames(
    styles["zr__slider-track-selected-range"],
    trackSelected
  );

  return (
    <div className={trackClasses}>
      <div ref={rangeTrackRef} className={rangeClasses} />
      <div
        ref={selectedRangeRef}
        className={selectedRangeClasses}
        style={selectedRangeStyle}
      />
    </div>
  );
};

export default ZRangeTrack;
