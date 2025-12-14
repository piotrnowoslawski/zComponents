import type { StoryObj } from "@storybook/react";
import styles from "@stories/styles/StorybookTheme.module.scss";
import { useZDropStore, zDropStore } from "@stories/store/zDropStore";
import ZDropButton from "@components/ZDropButton";
import {
  ZDropButtonContentProps,
  ZDropButtonProps,
  ZDropButtonSearchProps,
} from "@components/ZDropButton/types/zDropButtonTypes";
import { survivorOptions } from "../../staticData/zDropObjectsData";
import { useState } from "react";

type ZDropButtonStoryProps = ZDropButtonProps &
  ZDropButtonContentProps &
  ZDropButtonSearchProps;

type Story = StoryObj<ZDropButtonStoryProps>;

const clearIcon = (
  <img
    className={styles.zDropButtonSearchClearIcon}
    src={`icons/weapons/z-chainsaws.webp`}
    alt="Remove Chainsaws Icon"
  />
);

const CustomSurvivors: Story = {
  render: (args: ZDropButtonStoryProps) => {
    const survivor = useZDropStore((s) => s.selectedSurvivor);

    const defaultSurvivorIndex = survivorOptions.findIndex(
      (option) => option.stateId === survivor?.object?.stateId
    );

    const [options, setOptions] = useState(survivorOptions);
    const [selectedSurvivorIndex, setSelectedSurvivorIndex] = useState<any>(
      defaultSurvivorIndex || null
    );
    const onSelect = (selectedIndex: number) => {
      setSelectedSurvivorIndex(selectedIndex);

      const selectedSurvivor = survivorOptions[selectedIndex];

      zDropStore.setState({
        selectedSurvivor: {
          number: selectedSurvivor ? selectedSurvivor.stateId : null,
          string: selectedSurvivor ? selectedSurvivor.value : "",
          object: selectedSurvivor
            ? {
                stateId: selectedSurvivor.stateId,
                value: selectedSurvivor.value,
                label: selectedSurvivor.label,
              }
            : null,
        },
      });
    };

    const onSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const searchedValue = e.target.value.toLowerCase();

      if (searchedValue === "") {
        setOptions(survivorOptions);
        return;
      }

      const filteredOptions = survivorOptions.filter((option) =>
        option.label.toLowerCase().includes(searchedValue)
      );

      setOptions(filteredOptions);
    };

    const { searchClassName, shouldFocusOnOpen, position, ...zDropButtonArgs } =
      args;

    return (
      <div className={styles.zDropButtonStorybookWrapper}>
        <ZDropButton
          toggleIcon={
            <img
              src={
                typeof selectedSurvivorIndex === "number"
                  ? survivorOptions[selectedSurvivorIndex]?.iconPath
                  : "/icons/survivors/z-stranger.webp"
              }
              alt="Selected Survivor"
            />
          }
          onSelect={onSelect}
          onSearch={onSearch}
          {...zDropButtonArgs}
        >
          <ZDropButton.Search
            placeholder="Search survivor..."
            searchClassName={styles.zDropButtonSearch}
            clearIcon={clearIcon}
            shouldFocusOnOpen={shouldFocusOnOpen}
          />
          <ZDropButton.Content position={position}>
            <ZDropButton.List>
              {options?.map((option, index) => (
                <ZDropButton.Item
                  key={option.id}
                  title={option.label}
                  index={index}
                  Icon={<img src={option.iconPath} alt={option.label} />}
                  isActive={selectedSurvivorIndex === index}
                  className={styles.zDropButtonListItem}
                />
              ))}
            </ZDropButton.List>
          </ZDropButton.Content>
        </ZDropButton>
      </div>
    );
  },
  args: {
    options: survivorOptions,
    title: "Select Survivor",
    className: styles.zDropButton,
    toggleClassName: styles.zDropButtonToggle,
    searchClassName: styles.zDropButtonSearch,
    position: "bottom left",
    shouldFocusOnOpen: false,
  },
  argTypes: {
    options: {
      table: { disable: true },
      control: false,
    },
    toggleIcon: {
      table: { disable: true },
      control: false,
    },
    onToggle: {
      table: { disable: true },
      control: false,
    },
    onSelect: {
      table: { disable: true },
      control: false,
    },
    onSearch: {
      table: { disable: true },
      control: false,
    },
    onHide: {
      table: { disable: true },
      control: false,
    },
  },
};

export default CustomSurvivors;
