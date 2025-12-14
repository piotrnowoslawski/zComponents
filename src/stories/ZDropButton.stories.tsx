import type { Meta } from "@storybook/react";
import ZDropButton from "@components/ZDropButton";
import CustomSurvivors from "./ZComponents/ZDropButton/stories/custom/customSurvivors";
import BasicSurvivors from "./ZComponents/ZDropButton/stories/basic/BasicSurvivors";

const meta: Meta<typeof ZDropButton> = {
  title: "Components/ZDropButton",
  component: ZDropButton,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const CustomSurvivorsStory = {
  ...CustomSurvivors,
  name: "Fully Custom survivor button selector",
};

export const BasicSurvivorsStory = {
  ...BasicSurvivors,
  name: "Basic survivor button selector",
};
