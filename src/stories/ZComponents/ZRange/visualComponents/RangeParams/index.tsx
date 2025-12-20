import { RangeParamsProps } from "@stories/types/visualComponentsTypes";
import { classNames } from "@helpers/classNames";
import styles from "../styles/SbVisualComponents.module.scss";

const RangeParams = (props: RangeParamsProps) => {
  const { rangeParams, title } = props;

  const { step, min, max, scale } = rangeParams;

  const tableClasses = classNames(
    styles.unitsRangeTable,
    styles.unitsRangeTableParams,
    {
      [styles.unitsRangeTableZombies]: title === "Zombies",
      [styles.unitsRangeTableSurvivors]: title === "Survivors",
      [styles.unitsRangeTableBasic]: !["Zombies", "Survivors"].includes(title),
    }
  );

  return (
    <table className={tableClasses}>
      <thead>
        <tr className={styles.unitsRangeTableHeaderRow}>
          <th>Step</th>
          <th>Min</th>
          <th>Max</th>
          <th>Scale</th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.unitsRangeTableRow}>
          <td>{step}</td>
          <td>{min}</td>
          <td>{max}</td>
          <td>{scale}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default RangeParams;
