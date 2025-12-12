import type { StoryObj } from "@storybook/react";
import ZDrop from "@components/ZDrop";
import { ZDropProps } from "@components/ZDrop/types/zDropTypes";
import styles from "@stories/styles/StorybookTheme.module.scss";
import { classNames } from "@helpers/classNames";
import { useZDropStore, zDropStore } from "@stories/store/zDropStore";
import {
  weaponOptionsNumbers,
  weaponNames,
} from "@stories/staticData/numbers/zDropNumbersData";
import StoriesVisualComponents from "@stories/ZComponents/ZDrop/visualComponents";
import SbNotFound from "../../visualComponents/SbNotFound";

type Story = StoryObj<ZDropProps>;

const toggleRendererClasses = (isListVisible: boolean) =>
  classNames(styles.zDropWeaponsExpandToggleIcon, {
    [styles["zDropWeaponsExpandToggleIcon--active"]]: isListVisible,
  });

const optionRendererClasses = (isSelected: boolean) =>
  classNames({
    [styles.zDropWeaponsListItemSelected]: isSelected,
  });

const valueRenderer = (selected: any) => (
  <div className={styles.zDropWeaponsInputValueContent}>
    <img
      src={`icons/weapons/z-${weaponNames[selected.option]}.webp`}
      alt={`Weapon ${weaponNames[selected.option]}`}
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
    <span>{String(option)}</span>
    <img
      src={`icons/weapons/z-${weaponNames[option]}.webp`}
      alt={`Weapon ${weaponNames[option]}`}
    />
  </div>
);

const clearIcon = (
  <img
    className={styles.zDropWeaponsClearButtonIcon}
    src={`icons/weapons/z-chainsaws.webp`}
    alt="Remove Chainsaws Icon"
  />
);

const noDataContent = <SbNotFound />;

const expandToggleRenderer = (isListVisible: boolean) => {
  return (
    <img
      style={{ pointerEvents: "none" }}
      className={toggleRendererClasses(isListVisible)}
      src={`icons/weapons/z-hand-sword.webp`}
      alt="Toggle Sword Icon"
    />
  );
};

const onChange = (selected: any) => {
  const isSelected =
    selected !== null && selected !== undefined && selected !== "";

  zDropStore.setState({
    selectedWeapon: {
      number: isSelected ? selected : null,
      string: isSelected ? weaponNames[selected] : "",
      object: isSelected
        ? {
            stateId: selected,
            value: weaponNames[selected],
            label: weaponNames[selected]
              .charAt(0)
              .toUpperCase()
              .concat(weaponNames[selected].slice(1)),
          }
        : null,
    },
  });
};

const WeaponsNumbers: Story = {
  render: (args: ZDropProps) => {
    const weapon = useZDropStore((s) => s.selectedWeapon);

    return (
      <div className={styles.zDropStorybookWrapper}>
        <div className={styles.zDropContent}>
          <StoriesVisualComponents storyType="numbers" posterType="weapons" />
          <ZDrop
            value={weapon?.number}
            onChange={(selected: any) => onChange(selected)}
            {...args}
          />
        </div>
      </div>
    );
  },
  args: {
    options: weaponOptionsNumbers,
    name: "weaponsNumbers",
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

export default WeaponsNumbers;
