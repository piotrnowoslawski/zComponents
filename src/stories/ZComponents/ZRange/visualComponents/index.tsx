import { StoriesZRangeVisualComponentsProps } from "@stories/types/visualComponentsTypes";
import UnitsRangeTable from "./UnitsRangeTable";
import styles from "./styles/SbVisualComponents.module.scss";
import RangeParams from "./RangeParams";

const StoriesVisualComponents = (props: StoriesZRangeVisualComponentsProps) => {
  const { units, divisors, title, range, rangeParams } = props;

  return (
    <div className={styles.sbZRangeVisualComponents}>
      <UnitsRangeTable
        units={units}
        divisors={divisors}
        title={title}
        range={range}
        scale={rangeParams.scale}
      />
      <RangeParams rangeParams={rangeParams} title={title} />
    </div>
  );
};

export default StoriesVisualComponents;
