import type { StoryObj } from "@storybook/react";
import ZDrop from "@components/ZDrop";
import { ZDropProps } from "@components/ZDrop/types/zDropTypes";
import styles from "@stories/styles/StorybookTheme.module.scss";
import { useZDropStore, zDropStore } from "@stories/store/zDropStore";
import { classNames } from "@helpers/classNames";
import StoriesVisualComponents from "@stories/ZComponents/ZDrop/visualComponents";
import { zombieOptionsObjects } from "@stories/staticData/objects/zDropObjectsData";
import { removeOrReplaceCharacter } from "@stories/helpers/removeOrReplaceCharacter";
import { shrinkName } from "@stories/helpers/shrinkName";
import { on } from "events";
import SbNotFound from "../../visualComponents/SbNotFound";

type Story = StoryObj<ZDropProps>;

const ZombiesObjects: Story = {
  render: (args: ZDropProps) => {
    const survivor = useZDropStore((s) => s.selectedSurvivor);
    const weapon = useZDropStore((s) => s.selectedWeapon);
    const zombies = useZDropStore((s) => s.selectedZombies);

    const selectedSurvivor = (survivor as any)?.string;
    const selectedWeapon = (weapon as any)?.string;

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

    const onChange = (selected: any[]) => {
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

    return (
      <div className={styles.zDropStorybookWrapper}>
        <div className={styles.zDropContent}>
          <StoriesVisualComponents storyType="objects" posterType="zombies" />
          <ZDrop
            value={zombies?.objects}
            onChange={(selected: any[]) => onChange(selected)}
            clearIcon={
              <img
                className={styles.zDropZombiesClearButtonIcon}
                src={`icons/weapons/z-chainsaws.webp`}
                alt="Remove Chainsaws Icon"
              />
            }
            expandToggleRenderer={(isListVisible) => {
              return (
                <img
                  style={{ pointerEvents: "none" }}
                  className={toggleRendererClasses(isListVisible)}
                  src={`icons/weapons/z-hand-sword.webp`}
                  alt="Toggle Sword Icon"
                />
              );
            }}
            valueRenderer={(selected) => (
              <div className={styles.zDropZombiesInputValueContent}>
                <div className={styles.zDropZombiesValueItem}>
                  <img
                    src={`${(selected.option as any).iconPath}`}
                    alt={`${(selected.option as any).label}`}
                  />
                </div>
                <button
                  className={styles.zDropZombiesRemoveButton}
                  onClick={selected.onRemove}
                >
                  <img
                    src={"icons/weapons/z-swords.webp"}
                    alt="Remove Sword Icon"
                  />
                </button>
              </div>
            )}
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
                    removeOrReplaceCharacter((option as any).label, "-", " ")
                  )}
                </span>
                <div className={styles.zDropZombiesListItemImagesWrapper}>
                  <div>
                    <img
                      className={styles.zDropZombiesListItemImageZombie}
                      src={`${(option as any)?.iconPath}`}
                      alt={`Zombie ${(option as any)?.label}`}
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
            noDataContent={<SbNotFound />}
            {...args}
          />
        </div>
      </div>
    );
  },
  args: {
    options: zombieOptionsObjects,
    name: "zombiesObjects",
    valueKey: "stateId",
    isMultiple: true,
    isDisabled: false,
    isSearchable: true,
    clear: "whenSearched",
    shouldReturnObjectOnChange: true,
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

export default ZombiesObjects;
