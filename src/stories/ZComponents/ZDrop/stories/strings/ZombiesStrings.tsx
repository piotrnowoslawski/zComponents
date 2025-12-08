import type { StoryObj } from "@storybook/react";
import ZDrop from "@components/ZDrop";
import { ZDropProps } from "@components/ZDrop/types/zDropTypes";
import styles from "@stories/styles/StorybookTheme.module.scss";
import {
  useZDropStore,
  zDropStore,
} from "@stories/ZComponents/ZDrop/store/zDropStore";
import { zombieOptionsStrings } from "@stories/ZComponents/ZDrop/staticData/strings/ZDropStringsData";
import { classNames } from "@helpers/classNames";
import { removeOrReplaceCharacter } from "@stories/helpers/removeOrReplaceCharacter";
import { shrinkName } from "@stories/helpers/shrinkName";
import StoriesVisualComponents from "@stories/ZComponents/ZDrop/visualComponents";
import SbNotFound from "../../visualComponents/SbNotFound";

type Story = StoryObj<ZDropProps>;

const toggleRendererClasses = (isListVisible: boolean) =>
  classNames(styles.zDropZombiesExpandToggleIcon, {
    [styles["zDropZombiesExpandToggleIcon--active"]]: isListVisible,
  });

const optionItemClasses = (
  isSelected: boolean,
  isWeaponSelected: boolean,
  isSurvivorSelected: boolean
) =>
  classNames(styles.zDropZombiesListItemContent, {
    [styles["zDropZombiesListItemContent--selected"]]: isSelected,
    [styles["zDropZombiesListItemContent--noWeaponOrSurvivorSelected"]]:
      !isWeaponSelected && !isSurvivorSelected,
    [styles["zDropZombiesListItemContent--weaponOrSurvivorSelected"]]:
      (isWeaponSelected && !isSurvivorSelected) ||
      (isSurvivorSelected && !isWeaponSelected),
    [styles["zDropZombiesListItemContent--weaponAndSurvivorSelected"]]:
      isWeaponSelected && isSurvivorSelected,
  });

const optionItemKilledClasses = (isSelected: boolean) =>
  classNames(styles.zDropZombiesListItemContent, {
    [styles["zDropZombiesListItemImageZombie--killed"]]: isSelected,
  });

const valueRenderer = (selected: any) => (
  <div className={styles.zDropZombiesInputValueContent}>
    <div className={styles.zDropZombiesValueItem}>
      <img
        src={`icons/zombies/${selected.option}.webp`}
        alt={`Zombie ${selected.option}`}
      />
    </div>
    <button
      className={styles.zDropZombiesRemoveButton}
      onClick={selected.onRemove}
    >
      <img src={"icons/weapons/z-swords.webp"} alt="Remove Sword Icon" />
    </button>
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
    className={styles.zDropZombiesCustomClearButtonIcon}
    src={`icons/weapons/z-chainsaws.webp`}
    alt="Remove Chainsaws Icon"
  />
);

const noDataContent = <SbNotFound />;

const onchange = (selected: string[]) => {
  if (!selected) {
    return;
  }

  zDropStore.setState({
    selectedZombies: {
      numbers: selected.map((str) => parseInt(str.split("-")[1])),
      strings: selected,
      objects: selected.map((str) => ({
        number: parseInt(str.split("-")[1]),
        string: str,
        stateId: parseInt(str.split("-")[1]),
      })),
    },
  });
};

const ZombiesStrings: Story = {
  name: "Array of strings - multiple",
  render: (args: ZDropProps) => {
    const survivor = useZDropStore((s) => s.selectedSurvivor);
    const weapon = useZDropStore((s) => s.selectedWeapon);
    const zombies = useZDropStore((s) => s.selectedZombies);

    const selectedSurvivor = (survivor as any).string;
    const selectedWeapon = (weapon as any).string;

    return (
      <div className={styles.zDropStorybookWrapper}>
        <div className={styles.zDropContent}>
          <StoriesVisualComponents storyType="strings" posterType="zombies" />
          <ZDrop
            value={zombies?.strings}
            onChange={(selected: any[]) => onchange(selected)}
            optionRenderer={(option, isSelected) => (
              <div
                className={optionItemClasses(
                  isSelected,
                  !!selectedWeapon,
                  !!selectedSurvivor
                )}
                data-selected={isSelected}
              >
                <span className={styles.zDropZombiesListItemTitle}>
                  {shrinkName(
                    removeOrReplaceCharacter(String(option), "-", " ")
                  )}
                </span>
                <div className={styles.zDropZombiesListItemImagesWrapper}>
                  <div>
                    <img
                      className={styles.zDropZombiesListItemImageZombie}
                      src={`icons/zombies/${option}.webp`}
                      alt={`Zombie ${option}`}
                    />
                    {isSelected && (
                      <img
                        className={optionItemKilledClasses(isSelected)}
                        src={`icons/zombies/z-killed.webp`}
                        alt={`Zombie killed`}
                      />
                    )}
                  </div>
                  {selectedWeapon && (
                    <img
                      className={styles.zDropZombiesListItemImageWeapon}
                      src={`icons/weapons/z-${selectedWeapon}.webp`}
                      alt={`Weapon ${selectedWeapon}`}
                    />
                  )}
                  {selectedSurvivor && (
                    <img
                      className={styles.zDropZombiesListItemImageSurvivor}
                      src={`icons/survivors/z-${selectedSurvivor}.webp`}
                      alt={`Survivor ${selectedSurvivor}`}
                    />
                  )}
                </div>
              </div>
            )}
            {...args}
          />
        </div>
      </div>
    );
  },
  args: {
    options: zombieOptionsStrings,
    name: "zombiesStrings",
    isMultiple: true,
    isDisabled: false,
    isSearchable: true,
    clear: "whenSearched",
    placeholder: "select a zombie to eliminate...",
    referenceElementClassName: styles.zDropStorybookWrapper,
    listMaxHeightLimiter: 350,
    styleClasses: {
      container: styles.zDropContainer,
      inputField: styles.zDropZombiesInputField,
      inputMultipleValue: styles.zDropZombiesInputValue,
      inputMultipleSearch: styles.zDropZombiesInputSearch,
      clearButton: styles.zDropZombiesClearButton,
      expandToggle: styles.zDropZombiesExpandToggle,
      listItem: styles.zDropZombiesListItem,
      noData: styles.sbNotFoundWrapper,
    },
    valueRenderer,
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

export default ZombiesStrings;
