import type { StoryObj } from "@storybook/react";
import styles from "@stories/styles/StorybookTheme.module.scss";
import ZRange from "@components/ZRange";
import { ZRangeProps } from "@components/ZRange/types/zRangeTypes";
import {
  zombiesUnitDivisors,
  zombiesUnitList,
} from "@stories/staticData/range/zRangeDataUnits";
import StoriesVisualComponents from "@stories/ZComponents/ZRange/visualComponents";
import { useState } from "react";
import { RangeParams } from "@stories/types/visualComponentsTypes";

type Story = StoryObj<ZRangeProps>;

const ZombiesRange: Story = {
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

    const rangeParams: RangeParams = {
      step: args.step || 1,
      min: args.min,
      max: args.max,
      scale: args.scale || "x",
    };

    return (
      <div className={styles.zRangeStorybookWrapper}>
        <ZRange onSelect={onSelect} onChange={onChange} {...args} />
        <StoriesVisualComponents
          units={zombiesUnitList}
          divisors={zombiesUnitDivisors}
          title="Zombies"
          range={range}
          rangeParams={rangeParams}
        />
      </div>
    );
  },
  args: {
    value: { min: 100, max: 500 },
    step: 1,
    name: "range",
    min: 1,
    max: 1000,
    scale: "x",
    icons: {
      indicatorMin: (
        <img
          className={styles.zRangeIndicatorIcon}
          src="icons/range/z-range-zombies.webp"
          alt="Min value"
        />
      ),
      indicatorMax: (
        <img
          className={styles.zRangeIndicatorIcon}
          src="icons/range/z-range-zombies.webp"
          alt="Max value"
        />
      ),
    },
    styleClasses: {
      container: styles.zRange,
      input: styles.zRangeZombiesInput,
      inputActive: styles.zRangeInputActive,
      trackContainer: styles.zRangeTrackContainer,
      trackRange: styles.zRangeTrackRange,
      trackSelected: styles.zRangeTrackZombiesSelected,
      indicator: styles.zRangeIndicator,
      indicatorMin: styles.zRangeIndicatorZombiesMin,
      indicatorMax: styles.zRangeIndicatorZombiesMax,
      indicatorIcon: styles.zRangeIndicatorIcon,
      indicatorValue: styles.zRangeIndicatorValue,
    },
    unitList: zombiesUnitList,
    unitDivisors: zombiesUnitDivisors,
    isIndicatorUnitHidden: true,
    label: "Zombies count range:",
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

export default ZombiesRange;
