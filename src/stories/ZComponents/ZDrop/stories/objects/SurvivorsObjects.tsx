import type { StoryObj } from "@storybook/react";
import ZDrop from "@components/ZDrop";
import { ZDropProps } from "@components/ZDrop/types/zDropTypes";
import styles from "@stories/styles/StorybookTheme.module.scss";
import { classNames } from "@helpers/classNames";
import {
  useZDropStore,
  zDropStore,
} from "@stories/ZComponents/ZDrop/store/zDropStore";
import { survivorOptionsObjects } from "@stories/ZComponents/ZDrop/staticData/objects/zDropObjectsData";
import StoriesVisualComponents from "@stories/ZComponents/ZDrop/visualComponents";
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
      src={`${selected.option.iconPath}`}
      alt={`Survivor ${selected.option.label}`}
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
    <span>{String(option.label)}</span>
    <img src={`${option.iconPath}`} alt={`Survivor ${option.label}`} />
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
      number: isSelected ? selected.stateId : null,
      string: isSelected ? selected.value : "",
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

const SurvivorsObjects: Story = {
  render: (args: ZDropProps) => {
    const survivor = useZDropStore((s) => s.selectedSurvivor);

    return (
      <div className={styles.zDropStorybookWrapper}>
        <div className={styles.zDropContent}>
          <StoriesVisualComponents storyType="objects" posterType="survivors" />
          <ZDrop
            value={survivor?.object}
            onChange={(selected: any) => onChange(selected)}
            {...args}
          />
        </div>
      </div>
    );
  },
  args: {
    options: survivorOptionsObjects,
    name: "survivorsObjects",
    valueKey: "stateId",
    isMultiple: false,
    isDisabled: false,
    isSearchable: true,
    clear: "whenSearched",
    placeholder: "select a survivor...",
    shouldReturnObjectOnChange: true,
    referenceElementClassName: styles.zDropStorybookWrapper,
    listMaxHeightLimiter: 350,
    styleClasses: {
      container: styles.zDropContainer,
      input: styles.zDropSurvivorsInput,
      label: styles.zDropSurvivorsLabel,
      inputField: styles.zDropSurvivorsInputField,
      inputValue: styles.zDropSurvivorsInputValue,
      clearButton: styles.zDropSurvivorsClearButton,
      expandToggle: styles.zDropSurvivorsExpandToggle,
      removeButton: styles.zDropSurvivorsRemoveButton,
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

export default SurvivorsObjects;
