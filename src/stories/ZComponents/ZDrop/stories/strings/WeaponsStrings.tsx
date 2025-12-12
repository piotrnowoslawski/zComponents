import type { StoryObj } from "@storybook/react";
import ZDrop from "@components/ZDrop";
import { ZDropProps } from "@components/ZDrop/types/zDropTypes";
import styles from "@stories/styles/StorybookTheme.module.scss";
import { classNames } from "@helpers/classNames";
import { useZDropStore, zDropStore } from "@stories/store/zDropStore";
import {
  weaponOptionsStrings,
  weaponNames,
} from "@stories/staticData/strings/ZDropStringsData";
import { removeOrReplaceCharacter } from "@stories/helpers/removeOrReplaceCharacter";
import StoriesVisualComponents from "@stories/ZComponents/ZDrop/visualComponents";
import SbNotFound from "../../visualComponents/SbNotFound";

type Story = StoryObj<ZDropProps>;

const optionRendererClasses = (isSelected: boolean) =>
  classNames({
    [styles.zDropWeaponsListItemSelected]: isSelected,
  });

const toggleRendererClasses = (isListVisible: boolean) =>
  classNames(styles.zDropWeaponsExpandToggleIcon, {
    [styles["zDropWeaponsExpandToggleIcon--active"]]: isListVisible,
  });

const valueRenderer = (selected: any) => (
  <div className={styles.zDropWeaponsInputValueContent}>
    <img
      src={`icons/weapons/z-${selected.option}.webp`}
      alt={`Weapon ${selected.option}`}
    />
    <button
      className={styles.zDropWeaponsInputValueRemoveButton}
      onClick={selected.onRemove}
    >
      <img src={`icons/weapons/z-swords.webp`} alt="Remove Sword Icon" />
    </button>
  </div>
);

const optionRenderer = (option: any, isSelected: boolean) => (
  <div className={optionRendererClasses(isSelected)}>
    <span>{removeOrReplaceCharacter(option as string, "-", " ")}</span>
    <img src={`icons/weapons/z-${option}.webp`} alt={`Weapon ${option}`} />
  </div>
);

const expandToggleRenderer = (isListVisible: boolean) => {
  return (
    <img
      style={{ pointerEvents: "none" }}
      className={toggleRendererClasses(isListVisible)}
      src={"icons/weapons/z-hand-sword.webp"}
      alt="Toggle Sword Icon"
    />
  );
};

const clearIcon = (
  <img
    className={styles.zDropWeaponsClearButtonIcon}
    src={`icons/weapons/z-chainsaws.webp`}
    alt="Remove Chainsaws Icon"
  />
);

const noDataContent = <SbNotFound />;

const onchange = (selected: any) => {
  const isSelected =
    selected !== null && selected !== undefined && selected !== "";

  zDropStore.setState({
    selectedWeapon: {
      number: isSelected ? weaponNames[selected] : null,
      string: isSelected ? selected : "",
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

const WeaponsStrings: Story = {
  name: "Array of strings",
  render: (args: ZDropProps) => {
    const weapon = useZDropStore((s) => s.selectedWeapon);

    return (
      <div className={styles.zDropStorybookWrapper}>
        <div className={styles.zDropContent}>
          <StoriesVisualComponents storyType="strings" posterType="weapons" />
          <ZDrop
            value={weapon?.string}
            onChange={(selected: any) => onchange(selected)}
            {...args}
          />
        </div>
      </div>
    );
  },
  args: {
    options: weaponOptionsStrings,
    name: "weaponsStrings",
    isMultiple: false,
    isDisabled: false,
    isSearchable: true,
    clear: "whenSearched",
    placeholder: "select a weapon...",
    referenceElementClassName: styles.zDropStorybookWrapper,
    listMaxHeightLimiter: 350,
    styleClasses: {
      container: styles.zDropContainer,
      inputField: styles.zDropWeaponsInputField,
      inputValue: styles.zDropWeaponsInputValue,
      clearButton: styles.zDropWeaponsClearButton,
      expandToggle: styles.zDropWeaponsExpandToggle,
      listItem: styles.zDropWeaponsListItem,
      noData: styles.sbNotFoundWrapper,
    },
    valueRenderer,
    optionRenderer,
    expandToggleRenderer,
    clearIcon,
    noDataContent,
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

export default WeaponsStrings;
