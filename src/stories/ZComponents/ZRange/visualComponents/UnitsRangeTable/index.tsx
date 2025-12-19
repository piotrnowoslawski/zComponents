import { useMemo } from "react";
import styles from "../styles/SbVisualComponents.module.scss";
import { classNames } from "@helpers/classNames";
import { UnitsRangeTableProps } from "@stories/types/visualComponentsTypes";

function findDivisorIndex(divisors: number[], value?: number): number {
  if (value === undefined) return -1;

  if (value <= divisors[0]) return 0;

  for (let index = divisors.length - 1; index >= 0; index--) {
    if (divisors[index] <= value) return index;
  }

  return 0;
}

const scaleFunction = (scale: string, x: number) =>
  // eslint-disable-next-line no-new-func
  scale ? new Function("x", `return ${scale}`)(x) : x;

const UnitsRangeTable = ({
  units,
  divisors,
  title,
  range,
  scale,
}: UnitsRangeTableProps) => {
  const tableClasses = classNames(styles.unitsRangeTable, {
    [styles.unitsRangeTableZombies]: title === "Zombies",
    [styles.unitsRangeTableSurvivors]: title === "Survivors",
    [styles.unitsRangeTableBasic]: !["Zombies", "Survivors"].includes(title),
  });

  const { minDivisorIndex, maxDivisorIndex } = useMemo(() => {
    const minValue = range?.min !== undefined ? Number(range.min) : undefined;
    const maxValue = range?.max !== undefined ? Number(range.max) : undefined;

    let minDivisorIndex = findDivisorIndex(
      divisors,
      minValue ? scaleFunction(scale || "x", minValue) : minValue
    );
    const maxDivisorIndex = findDivisorIndex(
      divisors,
      maxValue ? scaleFunction(scale || "x", maxValue) : maxValue
    );

    if (
      minDivisorIndex !== -1 &&
      maxDivisorIndex !== -1 &&
      minDivisorIndex > maxDivisorIndex
    ) {
      minDivisorIndex = maxDivisorIndex;
    }

    return { minDivisorIndex, maxDivisorIndex };
  }, [divisors, range?.min, range?.max]);

  return (
    <table className={tableClasses}>
      <thead>
        <tr className={styles.unitsRangeTableHeaderRow}>
          <th>{title}</th>
          <th>Unit</th>
          <th>Base unit amount</th>
        </tr>
      </thead>
      <tbody>
        {units.map((unit, index) => {
          const isMin = index === minDivisorIndex;
          const isMax = index === maxDivisorIndex;

          const label =
            isMin && isMax ? "Min / Max" : isMin ? "Min" : isMax ? "Max" : "";

          return (
            <tr key={unit.unit} className={styles.unitsRangeTableRow}>
              <td>{label}</td>
              <td>{unit.unit}</td>
              <td>{divisors[index] ?? "-"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UnitsRangeTable;
