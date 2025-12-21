import { UnitList } from "@components/ZRange/types/zRangeTypes";

export type SelectType = "survivors" | "weapons" | "zombies";

export type StoryType =
  | "numbers"
  | "strings"
  | "objects"
  | "basic"
  | "integrations";

export interface StoriesZDropVisualComponentsProps {
  storyType: StoryType;
  posterType: SelectType;
}

export interface RangeParams {
  step: number;
  min: number;
  max: number;
  scale: string;
}

export type RangeTableTitle =
  | "Zombies"
  | "Survivors"
  | "Distance"
  | "Disk / Memory"
  | "Price";

export interface StoriesZRangeVisualComponentsProps {
  units: UnitList[];
  divisors: number[];
  title: RangeTableTitle;
  range?: { min: number; max: number };
  rangeParams: RangeParams;
}

export interface RangeParamsProps {
  rangeParams: RangeParams;
  title: RangeTableTitle;
}

export type UnitsRangeTableProps = {
  units: UnitList[];
  divisors: number[];
  title: string;
  range?: { min: number; max: number };
  scale?: string;
};
