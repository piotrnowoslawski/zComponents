import type { Meta } from "@storybook/react";
import ZRange from "@components/ZRange";
import SurvivorsRange from "./ZComponents/ZRange/stories/custom/SurvivorsRange";
import ZombiesRange from "./ZComponents/ZRange/stories/custom/ZombiesRange";
import BasicDistance from "./ZComponents/ZRange/stories/basic/BasicDistance";
import BasicDiskSize from "./ZComponents/ZRange/stories/basic/BasicDiskSize";
import BasicMemorySize from "./ZComponents/ZRange/stories/basic/BasicMemorySize";

const meta: Meta<typeof ZRange> = {
  title: "Components/ZRange",
  component: ZRange,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const SurvivorsRangeStory = {
  ...SurvivorsRange,
  name: "Survivors custom range selector",
};

export const ZombiesRangeStory = {
  ...ZombiesRange,
  name: "Zombies custom range selector",
};

export const BasicRangeStory = {
  ...BasicDistance,
  name: "Basic distance range selector",
};

export const BasicDiskSizeRangeStory = {
  ...BasicDiskSize,
  name: "Basic disk size range selector",
};

export const BasicMemorySizeRangeStory = {
  ...BasicMemorySize,
  name: "Basic memory size range selector",
};
