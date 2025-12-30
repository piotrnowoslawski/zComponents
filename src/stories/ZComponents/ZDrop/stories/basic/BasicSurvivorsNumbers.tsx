import type { StoryObj } from "@storybook/react";
import ZDrop from "@components/ZDrop";
import { ZDropProps } from "@components/ZDrop/types/zDropTypes";
import styles from "@stories/styles/StorybookTheme.module.scss";
import { useZDropStore, zDropStore } from "@stories/store/zDropStore";
import {
  survivorOptionsNumbers,
  survivorNames,
} from "@stories/staticData/numbers/zDropNumbersData";
import StoriesVisualComponents from "@stories/ZComponents/ZDrop/visualComponents";

type Story = StoryObj<ZDropProps>;

const onChange = (selected: any) => {
  const isSelected =
    selected !== null && selected !== undefined && selected !== "";

  zDropStore.setState({
    selectedSurvivor: {
      number: isSelected ? selected : null,
      string: isSelected ? survivorNames[selected] : "",
      object: isSelected
        ? {
            stateId: selected,
            value: survivorNames[selected],
            label: survivorNames[selected]
              .charAt(0)
              .toUpperCase()
              .concat(survivorNames[selected].slice(1)),
          }
        : null,
    },
  });
};

const BasicSurvivorsNumbers: Story = {
  render: (args: ZDropProps) => {
    const survivor = useZDropStore((s) => s.selectedSurvivor);
    return (
      <div className={styles.zDropStorybookWrapper}>
        <div className={styles.zDropContent}>
          <StoriesVisualComponents storyType="basic" posterType="survivors" />
          <ZDrop
            value={survivor?.number}
            onChange={(selected: any) => onChange(selected)}
            {...args}
          />
        </div>
      </div>
    );
  },
  args: {
    options: survivorOptionsNumbers,
    name: "survivorsNumbers",
    label: "Survivor number:",
    isMultiple: false,
    isDisabled: false,
    isSearchable: true,
    clear: "whenSearched",
    placeholder: "select a survivor...",
    referenceElementClassName: styles.zDropContent,
    noDataContent: <div>Not found</div>,
  },
  argTypes: {
    options: {
      table: { disable: true },
      control: false,
    },
    value: {
      table: { disable: true },
      control: false,
    },
    valueKey: {
      table: { disable: true },
      control: false,
    },
    labelKey: {
      table: { disable: true },
      control: false,
    },
    styleClasses: {
      table: { disable: true },
      control: false,
    },
    shouldReturnObjectOnChange: {
      table: { disable: true },
      control: false,
    },
    referenceElementClassName: {
      table: { disable: true },
      control: false,
    },
    onChange: {
      table: { disable: true },
      control: false,
    },
    onClear: {
      table: { disable: true },
      control: false,
    },
    optionRenderer: {
      table: { disable: true },
      control: false,
    },
    valueRenderer: {
      table: { disable: true },
      control: false,
    },
    expandToggleRenderer: {
      table: { disable: true },
      control: false,
    },
    clearIcon: {
      table: { disable: true },
      control: false,
    },
    searchFilter: {
      table: { disable: true },
      control: false,
    },
    noDataContent: {
      table: { disable: true },
      control: false,
    },
    isAutoHeightEnabled: {
      table: { disable: true },
      control: false,
    },
    autoHeightPosition: {
      table: { disable: true },
      control: false,
    },
  },
};

export default BasicSurvivorsNumbers;
