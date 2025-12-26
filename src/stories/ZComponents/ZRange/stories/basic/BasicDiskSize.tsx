import type { StoryObj } from "@storybook/react";
import styles from "@stories/styles/StorybookTheme.module.scss";
import ZRange from "@components/ZRange";
import { ZRangeProps } from "@components/ZRange/types/zRangeTypes";
import { useState } from "react";
import StoriesVisualComponents from "@stories/ZComponents/ZRange/visualComponents";

type Story = StoryObj<ZRangeProps>;

const BasicDiskMemorySize: Story = {
  render: (args: ZRangeProps) => {
    const onChange = (range: {
      min: { value: number };
      max: { value: number };
    }) => {
      setRange({ min: range.min.value, max: range.max.value });
    };

    const [range, setRange] = useState<{ min: number; max: number }>({
      min: args.value.min,
      max: args.value.max,
    });

    const onSelect = (range: {
      min: { value: number };
      max: { value: number };
    }) => {
      setRange({ min: range.min.value, max: range.max.value });
    };

    return (
      <div className={styles.zRangeStorybookWrapper}>
        <ZRange onSelect={onSelect} onChange={onChange} {...args} />
        <StoriesVisualComponents
          units={args.unitList || []}
          divisors={args.unitDivisors || []}
          title="Distance"
          range={range}
          rangeParams={{
            step: args.step || 1,
            min: args.min,
            max: args.max,
            scale: args.scale || "x",
          }}
        />
      </div>
    );
  },
  args: {
    value: { min: 5, max: 6 },
    step: 1,
    name: "range",
    min: 5,
    max: 16,
    scale: "Math.pow(2, x)",
    unitList: [
      {
        unit: "GB",
        fractionDigits: 2,
      },
      {
        unit: "TB",
        fractionDigits: 2,
      },
    ],
    unitDivisors: [1, 1024],
    styleClasses: {
      container: styles.zRange,
    },
    label: "Disk size range:",
  },
  argTypes: {
    icons: {
      table: { disable: true },
      control: false,
    },
    onSelect: {
      table: { disable: true },
      control: false,
    },
    onChange: {
      table: { disable: true },
      control: false,
    },
    scale: {
      table: { disable: true },
      control: false,
    },
  },
};

export default BasicDiskMemorySize;
