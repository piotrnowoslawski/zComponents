import {
  ChangeEventHandler,
  MouseEventHandler,
  ReactNode,
  RefObject,
  TouchEventHandler,
} from "react";
import { ZRangeValue } from "../rangeValue";

export interface UnitList {
  unit: string;
  fractionDigits: number;
}

export type ScaleFunction = (x: number) => number;

export type ScaleFunctionWithSchema = (
  x: number,
  scaleFunctionSchema: string
) => number;

export interface ZRangeSingleValue {
  value: number;
  initialValue: number;
  inputRef: RefObject<HTMLInputElement | null>;
  getPosition?: () => number;
}

export interface ZRangeRangeValue {
  min: number;
  max: number;
}

export interface TrackStylesClasses {
  trackContainer?: string;
  trackRange?: string;
  trackSelected?: string;
}

export interface IndicatorStylesClasses {
  indicator?: string;
  indicatorMin?: string;
  indicatorMax?: string;
  indicatorValue?: string;
  indicatorIcon?: string;
}

export interface ZRangeStyleClasses
  extends TrackStylesClasses,
    IndicatorStylesClasses {
  container?: string;
  label?: string;
  input?: string;
  inputActive?: string;
  sliderValue?: string;
}

export interface ZRangeProps {
  value: ZRangeRangeValue;
  name: string;
  min: number;
  max: number;
  step?: number;
  scale?: string;
  unitDivisors?: number[];
  unitList?: UnitList[];
  label?: string | ReactNode;
  onSelect?: Function;
  onChange?: Function;
  icons?: {
    thumbMin?: ReactNode;
    thumbMax?: ReactNode;
    indicatorMin?: ReactNode;
    indicatorMax?: ReactNode;
  };
  stylesClasses?: ZRangeStyleClasses;
  isIndicatorUnitHidden?: boolean;
}

export interface ZRangeLabelProps {
  label: string | ReactNode;
  labelClassName?: string;
}

export interface ZRangeThumbProps {
  value: string;
  icon?: ReactNode;
  sliderValueClassName?: string;
}

export interface ZRangeTrackProps {
  rangeTrackRef?: RefObject<HTMLDivElement | null>;
  selectedRangeStyle?: React.CSSProperties;
  trackStyles: TrackStylesClasses;
  selectedRangeRef: RefObject<HTMLDivElement | null>;
}

export interface ZRangeIndicatorProps {
  valueIndicatorRef: RefObject<HTMLDivElement | null>;
  indicatorStyles: IndicatorStylesClasses;
  indicatorValue?: number | string;
  rangeTrackRef?: RefObject<HTMLDivElement | null>;
  inputElement?: HTMLInputElement | null;
  scaleFunction: ScaleFunction;
  unitList?: UnitList[];
  unitDivisors?: number[];
  scale?: string;
  icon?: ReactNode;
  iconKey?: string;
  isHighlighted: boolean;
  isIndicatorUnitHidden?: boolean;
}

export interface ZRangeInputsProps {
  rangeValue: ZRangeValue;
  min: number;
  max: number;
  step?: number;
  inputMinClasses?: string;
  inputMaxClasses?: string;
  onInputChange?: ChangeEventHandler<HTMLInputElement>;
  onMouseDown?: MouseEventHandler<HTMLInputElement>;
  onTouchStart?: TouchEventHandler<HTMLInputElement>;
  onMouseMove?: MouseEventHandler<HTMLInputElement>;
  onTouchMove?: TouchEventHandler<HTMLInputElement>;
  onMouseUp?: MouseEventHandler<HTMLInputElement>;
  onTouchEnd?: TouchEventHandler<HTMLInputElement>;
}
