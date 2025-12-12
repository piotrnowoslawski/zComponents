import type { Meta } from "@storybook/react";
import ZDropButton from "@components/ZDropButton";
import BasicSurvivors from "./ZComponents/ZDropButton/stories/basic/BasicSurvivors";

const meta: Meta<typeof ZDropButton> = {
  title: "Components/ZDropButton",
  component: ZDropButton,
  parameters: {
    layout: "padded",
  },
};

export default meta;

export const BasicSurvivorsStory = {
  ...BasicSurvivors,
  name: "Survivor Button Selector",
};
