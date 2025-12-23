import type { StoryObj } from "@storybook/react";
import ZDrop from "@components/ZDrop";
import { ZDropProps } from "@components/ZDrop/types/zDropTypes";
import styles from "@stories/styles/StorybookTheme.module.scss";
import { classNames } from "@helpers/classNames";
import { useZDropStore, zDropStore } from "@stories/store/zDropStore";
import StoriesVisualComponents from "@stories/ZComponents/ZDrop/visualComponents";
import { weaponOptionsObjects } from "@stories/staticData/objects/zDropObjectsData";
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
      src={`${selected?.option.iconPath}`}
      alt={`Weapon ${selected?.option.label}`}
    />
    <button
      className={styles.zDropWeaponsInputValueRemoveButton}
      onClick={selected.onRemove}
    >
      <img src={"icons/weapons/z-swords.webp"} alt="Remove Sword Icon" />
    </button>
  </div>
);

const optionRenderer = (option: any, isSelected: boolean) => (
  <div className={optionRendererClasses(isSelected)}>
    <span>{String(option?.label)}</span>
    <img src={`${option?.iconPath}`} alt={`Weapon ${option?.label}`} />
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

const onChange = (selected: any) => {
  const isSelected =
    selected !== null && selected !== undefined && selected !== "";

  zDropStore.setState({
    selectedWeapon: {
      number: isSelected ? selected?.stateId : null,
      string: isSelected ? selected?.value : "",
      object: isSelected
        ? {
            stateId: selected.stateId,
            value: selected.value,
            label: selected.label,
          }
        : null,
    },
  });
};

const WeaponsObjects: Story = {
  render: (args: ZDropProps) => {
    const weapon = useZDropStore((s) => s.selectedWeapon);

    return (
      <div className={styles.zDropStorybookWrapper}>
        <div className={styles.zDropContent}>
          <StoriesVisualComponents storyType="objects" posterType="weapons" />
          <ZDrop
            value={weapon?.object}
            onChange={(selected: any) => onChange(selected)}
            {...args}
          />
        </div>
      </div>
    );
  },
  args: {
    options: weaponOptionsObjects,
    name: "weaponsObjects",
    valueKey: "stateId",
    isMultiple: false,
    isDisabled: false,
    isSearchable: true,
    clear: "whenSearched",
    shouldReturnObjectOnChange: true,
    placeholder: "select a weapon...",
    referenceElementClassName: styles.zDropStorybookWrapper,
    listMaxHeightLimiter: 350,
    styleClasses: {
      container: styles.zDropContainer,
      inputField: styles.zDropWeaponsInputField,
      inputValue: styles.zDropWeaponsInputValue,
      clearButton: styles.zDropWeaponsClearButton,
      expandToggle: styles.zDropWeaponsExpandToggle,
      listWrapper: styles.zDropWeaponsListWrapper,
      list: styles.zDropWeaponsList,
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

export default WeaponsObjects;
