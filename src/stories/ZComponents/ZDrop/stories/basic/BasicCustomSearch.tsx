import type { StoryObj } from "@storybook/react";
import ZDrop from "@components/ZDrop";
import { ZDropProps } from "@components/ZDrop/types/zDropTypes";
import styles from "@stories/styles/StorybookTheme.module.scss";
import { useZDropStore, zDropStore } from "@stories/store/zDropStore";
import StoriesVisualComponents from "@stories/ZComponents/ZDrop/visualComponents";
import { zombieOptionsObjects } from "@stories/staticData/objects/zDropObjectsData";

type Story = StoryObj<ZDropProps>;

const markSearchedText = (text: string, searchValue: string) => {
  if (!searchValue) {
    return text;
  }

  const regex = new RegExp(`(${searchValue})`, "gi");
  return text.split(regex).map((part, index) =>
    regex.test(part) ? (
      <mark
        key={index}
        style={{
          fontWeight: "bold",
          transform: "scale(1.1)",
          background: "transparent",
        }}
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
};

const optionRenderer = (
  options: any,
  isSelected: boolean,
  currentSearchedValue: string | undefined
) => (
  <div>
    <div>
      <strong>{options.label}</strong>
    </div>
    <div>
      Locations:{" "}
      {markSearchedText(
        options.locations.join(", "),
        currentSearchedValue || ""
      )}
    </div>
  </div>
);

const searchFilter = ({
  options,
  currentValue,
  labelKey,
}: {
  options: any[];
  currentValue: any;
  labelKey: string;
}) => {
  return options.filter((option) =>
    option.locations.some((location: string) =>
      location.toLowerCase().includes(currentValue.toLowerCase())
    )
  );
};

const onchange = (selected: any[]) => {
  if (!selected) {
    return;
  }

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

const BasicZombiesCustomSearch: Story = {
  render: (args: ZDropProps) => {
    const zombies = useZDropStore((s) => s.selectedZombies);

    return (
      <div className={styles.zDropStorybookWrapper}>
        <div className={styles.zDropContent}>
          <StoriesVisualComponents storyType="basic" posterType="zombies" />
          <ZDrop
            value={zombies?.objects}
            onChange={(selected: any[]) => onchange(selected)}
            {...args}
          />
        </div>
      </div>
    );
  },
  args: {
    options: zombieOptionsObjects,
    valueKey: "stateId",
    name: "zombiesCustomSearch",
    label: "Zombies to eliminate:",
    isMultiple: true,
    isDisabled: false,
    isSearchable: true,
    clear: "whenSearched",
    placeholder: "select a zombie to eliminate...",
    referenceElementClassName: styles.zDropStorybookWrapper,
    listMaxHeightLimiter: 350,
    optionRenderer,
    searchFilter,
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

export default BasicZombiesCustomSearch;
