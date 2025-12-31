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

const BasicSurvivors: Story = {
  render: (args: ZDropButtonStoryProps) => {
    const survivor = useZDropStore((s) => s.selectedSurvivor);

    const { shouldFocusOnOpen, position, options, ...zDropButtonArgs } = args;

    const defaultSurvivorIndex = options.findIndex(
      (option) => option.stateId === survivor?.object?.stateId
    );

    const [optionsToDisplay, setOptionsToDisplay] = useState(options);
    const [selectedSurvivorIndex, setSelectedSurvivorIndex] = useState<any>(
      defaultSurvivorIndex ?? null
    );

    const onSelect = (selectedIndex: number) => {
      const selectedSurvivor = optionsToDisplay[selectedIndex];

      setSelectedSurvivorIndex(
        options.findIndex(
          (option) => option.stateId === selectedSurvivor?.stateId
        )
      );

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

    const onSearch = (value: string) => {
      const searchedValue = value.toLowerCase();

      if (searchedValue === "") {
        setOptionsToDisplay(options);
        return;
      }

      const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchedValue)
      );

      setOptionsToDisplay(filteredOptions);
    };

    return (
      <div className={styles.zDropButtonStorybookWrapper}>
        <ZDropButton
          options={optionsToDisplay}
          toggleIcon={
            <img
              src={
                typeof selectedSurvivorIndex === "number" &&
                selectedSurvivorIndex !== -1
                  ? options[selectedSurvivorIndex]?.iconPath
                  : "icons/survivors/z-stranger.webp"
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
            shouldFocusOnOpen={shouldFocusOnOpen}
          />
          <ZDropButton.Content
            position={position}
            optionsCount={optionsToDisplay.length}
          >
            <ZDropButton.List>
              {optionsToDisplay?.length > 0 &&
                optionsToDisplay?.map((option, index) => (
                  <ZDropButton.Item
                    key={option.id}
                    title={option.label}
                    index={index}
                    Icon={<img src={option.iconPath} alt={option.label} />}
                    isActive={selectedSurvivorIndex === index}
                  />
                ))}
              {optionsToDisplay?.length === 0 && (
                <div className={styles.zDropButtonNoDataContent}>
                  No survivors found.
                </div>
              )}
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
    position: "bottom left",
    shouldFocusOnOpen: true,
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

export default BasicSurvivors;
