import type { StoryObj } from "@storybook/react";
import ZDrop from "@components/ZDrop";
import { ZDropProps } from "@components/ZDrop/types/zDropTypes";
import styles from "@stories/styles/StorybookTheme.module.scss";
import { classNames } from "@helpers/classNames";
import { useZDropStore, zDropStore } from "@stories/store/zDropStore";
import {
  survivorOptionsStrings,
  survivorNames,
} from "@stories/staticData/strings/ZDropStringsData";
import SbNotFound from "../../visualComponents/SbNotFound";

type Story = StoryObj<ZDropProps>;

const toggleRendererClasses = (isListVisible: boolean) =>
  classNames(styles.zDropSurvivorsExpandToggleIcon, {
    [styles["zDropSurvivorsExpandToggleIcon--active"]]: isListVisible,
  });

const optionRendererClasses = (isSelected: boolean) =>
  classNames({
    [styles.zDropSurvivorsListItemSelected]: isSelected,
  });

const valueRenderer = (selected: any) => (
  <div className={styles.zDropSurvivorsInputValueContent}>
    <img
      src={`icons/survivors/z-${selected.option as string}.webp`}
      alt={`Survivor ${selected.option}`}
    />
    <button
      className={styles.zDropSurvivorsInputValueRemoveButton}
      onClick={selected.onRemove}
    >
      <img src={"icons/weapons/z-swords.webp"} alt="Remove Sword Icon" />
    </button>
  </div>
);

const optionRenderer = (option: any, isSelected: boolean) => (
  <div className={optionRendererClasses(isSelected)}>
    <span>{option as string}</span>
    <img src={`icons/survivors/z-${option}.webp`} alt={`Survivor ${option}`} />
  </div>
);

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

const clearIcon = (
  <img
    className={styles.zDropSurvivorsClearButtonIcon}
    src={`icons/weapons/z-chainsaws.webp`}
    alt="Remove Chainsaws Icon"
  />
);

const noDataContent = <SbNotFound />;

const onChange = (selected: any) => {
  const isSelected =
    selected !== null && selected !== undefined && selected !== "";

  zDropStore.setState({
    selectedSurvivor: {
      number: isSelected ? survivorNames[selected] : null,
      string: isSelected ? selected : "",
      object: isSelected
        ? {
            stateId: survivorNames[selected],
            value: selected,
            label: selected
              ?.charAt(0)
              ?.toUpperCase()
              ?.concat(selected?.slice(1)),
          }
        : null,
    },
  });
};

const WrapperWithAutoHeight: Story = {
  render: (args: ZDropProps) => {
    const survivor = useZDropStore((s) => s.selectedSurvivor);

    return (
      <div className={styles.zDropStorybookWrapper}>
        <div className={styles.zDropContentAutoHeight}>
          <ZDrop
            value={survivor?.string}
            onChange={(selected: any) => onChange(selected)}
            {...args}
          />
        </div>
      </div>
    );
  },
  args: {
    options: survivorOptionsStrings,
    name: "survivorsStrings",
    isMultiple: false,
    isDisabled: false,
    isSearchable: true,
    clear: "whenSearched",
    placeholder: "select a survivor...",
    isAutoHeightEnabled: true,
    autoHeightPosition: "bottom",
    styleClasses: {
      container: styles.zDropContainer,
      input: styles.zDropSurvivorsInput,
      label: styles.zDropSurvivorsLabel,
      inputField: styles.zDropSurvivorsInputField,
      inputValue: styles.zDropSurvivorsInputValue,
      clearButton: styles.zDropSurvivorsClearButton,
      expandToggle: styles.zDropSurvivorsExpandToggle,
      removeButton: styles.zDropSurvivorsRemoveButton,
      listWrapper: styles.zDropSurvivorsListWrapper,
      list: styles.zDropSurvivorsList,
      listItem: styles.zDropSurvivorsListItem,
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

export default WrapperWithAutoHeight;
