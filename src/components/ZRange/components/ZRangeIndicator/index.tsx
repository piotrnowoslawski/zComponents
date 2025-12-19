import { ZRangeIndicatorProps } from "../../types/zRangeTypes";
import { convertToUnit } from "../../helpers/convertToUnit";
import styles from "../../styles/ZRange.module.scss";
import { useLayoutEffect, useState } from "react";
import { getCssVariablePxValue } from "@components/ZRange/helpers/getCssVariablePxValue";
import { classNames } from "../../../../helpers/classNames";

const indicatorTopGap = 2; // px

const ZRangeIndicator = (props: ZRangeIndicatorProps) => {
  const {
    valueIndicatorRef,
    indicatorStyles,
    indicatorValue,
    rangeTrackRef,
    inputElement,
    scaleFunction,
    unitList,
    unitDivisors,
    scale,
    icon,
    iconKey,
    isHighlighted,
    isIndicatorUnitHidden = false,
  } = props as ZRangeIndicatorProps & { iconKey?: string };

  const [valueIndicatorStyles, setValueIndicatorStyles] =
    useState<React.CSSProperties>({});

  const indicatorClasses = classNames(
    "z-range__value-indicator",
    {
      "z-range__value-indicator--active":
        typeof indicatorValue === "number" && isHighlighted,
    },
    indicatorStyles?.indicator,
    {
      ...(indicatorStyles?.indicatorMin
        ? { [indicatorStyles?.indicatorMin]: iconKey === "min" }
        : {}),
      ...(indicatorStyles?.indicatorMax
        ? { [indicatorStyles?.indicatorMax]: iconKey === "max" }
        : {}),
    }
  );

  const indicatorIconClasses = classNames(
    styles["z-range__value-indicator-icon"],
    indicatorStyles?.indicatorIcon
  );

  const indicatorValueClasses = classNames(
    "z-range__value-indicator-value",
    indicatorStyles?.indicatorValue
  );

  useLayoutEffect(() => {
    if (rangeTrackRef?.current?.offsetHeight && inputElement) {
      setValueIndicatorStyles({
        bottom: `${
          rangeTrackRef.current.offsetHeight +
          getCssVariablePxValue(inputElement, "--thumb-size", 16) / 2 +
          indicatorTopGap
        }px`,
      });
    }
  }, [indicatorValue, valueIndicatorRef, rangeTrackRef]);

  return (
    <div
      ref={valueIndicatorRef}
      style={valueIndicatorStyles}
      className={indicatorClasses}
    >
      {icon != null && typeof indicatorValue === "number" && (
        <div key={iconKey ?? "indicator-icon"} className={indicatorIconClasses}>
          {icon}
        </div>
      )}
      {typeof indicatorValue === "number" && (
        <span className={indicatorValueClasses}>
          {convertToUnit(
            scale ? scaleFunction(indicatorValue) : indicatorValue,
            unitList,
            unitDivisors,
            isIndicatorUnitHidden
          )}
        </span>
      )}
    </div>
  );
};

export default ZRangeIndicator;
