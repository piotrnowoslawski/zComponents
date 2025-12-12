import type { StoryObj } from "@storybook/react";
import ZDrop from "@components/ZDrop";
import { ZDropProps } from "@components/ZDrop/types/zDropTypes";
import styles from "@stories/styles/StorybookTheme.module.scss";
import { useZDropStore, zDropStore } from "@stories/store/zDropStore";
import {
  weaponOptionsStrings,
  weaponNames,
} from "@stories/staticData/strings/ZDropStringsData";
import { removeOrReplaceCharacter } from "@stories/helpers/removeOrReplaceCharacter";
import StoriesVisualComponents from "@stories/ZComponents/ZDrop/visualComponents";

type Story = StoryObj<ZDropProps>;

const onChange = (selected: string) => {
  const isSelected =
    selected !== null && selected !== undefined && selected !== "";

  zDropStore.setState({
    selectedWeapon: {
      number: isSelected ? weaponNames[selected] : null,
      string: selected,
      object: isSelected
        ? {
            stateId: weaponNames[selected],
            value: selected,
            label: removeOrReplaceCharacter(selected, "-", " ").replace(
              /\b\w/g,
              (c) => c.toUpperCase()
            ),
          }
        : null,
    },
  });
};

const BasicWeaponsStrings: Story = {
  name: "Array of strings",
  render: (args: ZDropProps) => {
    const weapon = useZDropStore((s) => s.selectedWeapon);

    return (
      <div className={styles.zDropStorybookWrapper}>
        <div className={styles.zDropContent}>
          <StoriesVisualComponents storyType="basic" posterType="weapons" />
          <ZDrop
            value={weapon?.string}
            onChange={(selected: any) => onChange(selected)}
            {...args}
          />
        </div>
      </div>
    );
  },
  args: {
    options: weaponOptionsStrings,
    name: "weaponsStrings",
    label: "Weapon type:",
    isMultiple: false,
    isDisabled: false,
    isSearchable: true,
    clear: "whenSearched",
    placeholder: "select a weapon...",
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

export default BasicWeaponsStrings;
