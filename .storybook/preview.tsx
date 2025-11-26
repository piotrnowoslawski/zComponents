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
      <div className={styles.sbContainer}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
