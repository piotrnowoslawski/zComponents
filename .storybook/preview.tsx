import type { Preview } from "@storybook/react";
import styles from "@stories/styles/StorybookTheme.module.scss";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    docs: {
      canvas: { sourceState: "shown" },
    },
  },

  decorators: [
    (Story) => (
      <div className={styles["sb__container"]}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
