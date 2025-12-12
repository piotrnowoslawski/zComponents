import type { StoryObj } from "@storybook/react";
import ZDrop from "@components/ZDrop";
import { ZDropProps } from "@components/ZDrop/types/zDropTypes";
import styles from "@stories/styles/StorybookTheme.module.scss";
import { useZDropStore, zDropStore } from "@stories/store/zDropStore";
import StoriesVisualComponents from "@stories/ZComponents/ZDrop/visualComponents";
import { zombieOptionsObjects } from "@stories/staticData/objects/zDropObjectsData";

type Story = StoryObj<ZDropProps>;

const onChange = (selected: any[]) => {
  zDropStore.setState({
    selectedZombies: {
      numbers: selected.map((selectedEl) => selectedEl.stateId),
      strings: selected.map((selectedEl) => selectedEl.value),
      objects: selected.map((selectedEl) => ({
        number: selectedEl.stateId,
        string: selectedEl.value,
        stateId: selectedEl.stateId,
      })),
    },
  });
};

const BasicZombiesObjects: Story = {
  render: (args: ZDropProps) => {
    const zombies = useZDropStore((s) => s.selectedZombies);

    return (
      <div className={styles.zDropStorybookWrapper}>
        <div className={styles.zDropContent}>
          <StoriesVisualComponents storyType="basic" posterType="zombies" />
          <ZDrop
            value={zombies?.objects}
            onChange={(selected: any[]) => onChange(selected)}
            {...args}
          />
        </div>
      </div>
    );
  },
  args: {
    options: zombieOptionsObjects,
    valueKey: "stateId",
    name: "zombiesObjects",
    label: "Zombies to eliminate:",
    shouldReturnObjectOnChange: true,
    isMultiple: true,
    isDisabled: false,
    isSearchable: true,
    clear: "whenSearched",
    placeholder: "select a zombie to eliminate...",
    referenceElementClassName: styles.zDropStorybookWrapper,
    listMaxHeightLimiter: 350,
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
  },
};

export default BasicZombiesObjects;
