import { getMinMax } from "./helpers/getMinMax";
import { convertToUnit } from "./helpers/convertToUnit";
import { calculateStepPosition } from "./helpers/calculateStepPosition";
import {
  ZRangeSingleValue,
  ScaleFunction,
  UnitList,
} from "./types/zRangeTypes";
export class ZRangeValue {
  min: ZRangeSingleValue;
  max: ZRangeSingleValue;
  unitDivisors?: number[];
  unitList?: UnitList[];
  scale?: ScaleFunction;

  constructor(
    min: ZRangeSingleValue,
    max: ZRangeSingleValue,
    unitDivisors?: number[],
    unitList?: UnitList[],
    scale?: ScaleFunction
  ) {
    this.min = min;
    this.max = max;
    this.unitDivisors = unitDivisors;
    this.unitList = unitList;
    this.scale = scale;

    this.min.getPosition = this.getMinPosition.bind(this);
    this.max.getPosition = this.getMaxPosition.bind(this);
  }

  getMinPosition(): number {
    return calculateStepPosition(
      this.min.value,
      this.min.inputRef.current,
      this.min.initialValue,
      this.max.initialValue
    );
  }

  getMaxPosition(): number {
    return calculateStepPosition(
      this.max.value,
      this.max.inputRef.current,
      this.min.initialValue,
      this.max.initialValue
    );
  }

  getRangeMiddle(): number {
    return (this.max.value - this.min.value) / 2;
  }

  getValueLabel(forValue: "min" | "max"): string {
    const value = getMinMax(this.min.value, this.max.value)[forValue];

    const valueLabel = this.scale ? this.scale(value) : value;

    return this.unitList
      ? convertToUnit(valueLabel, this.unitList, this.unitDivisors).toString()
      : `${valueLabel}`;
  }
}
