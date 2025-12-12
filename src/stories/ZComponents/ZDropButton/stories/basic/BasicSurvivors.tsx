import type { StoryObj } from "@storybook/react";
import styles from "@stories/styles/StorybookTheme.module.scss";
// import {
//   useZDropStore,
//   zDropStore,
// } from "@stories/ZComponents/ZDrop/store/zDropStore";

// import StoriesVisualComponents from "@stories/ZComponents/ZDrop/visualComponents";
import ZDropButton from "@components/ZDropButton";
import { ZDropButtonProps } from "@components/ZDropButton/types/zDropButtonTypes";
import { survivorOptions } from "../../staticData/zDropObjectsData";
import { useState } from "react";

type Story = StoryObj<ZDropButtonProps>;

const BasicSurvivors: Story = {
  render: (args: ZDropButtonProps) => {
    // const survivor = useZDropStore((s) => s.selectedSurvivor);

    const [options, setOptions] = useState(survivorOptions);
    const [selectedSurvivorIndex, setSelectedSurvivorIndex] =
      useState<any>(null);

    const onChange = (selectedIndex: number) => {
      console.log("Selected survivor index:", selectedIndex);
      setSelectedSurvivorIndex(selectedIndex);
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

    return (
      <div className={styles.zDropButtonStorybookWrapper}>
        <ZDropButton
          title={"Select Survivor"}
          toggleIcon={
            <img
              src={
                selectedSurvivorIndex
                  ? survivorOptions[selectedSurvivorIndex]?.iconPath
                  : "/icons/survivors/z-stranger.webp"
              }
              alt="Selected Survivor"
            />
          }
          onSelect={onChange}
          onSearch={onSearch}
          {...args}
        >
          <ZDropButton.Search placeholder="Search survivor..." />
          <ZDropButton.Content position="top left">
            <ZDropButton.List>
              {options?.map((option, index) => (
                <ZDropButton.Item
                  key={option.id}
                  title={option.label}
                  index={index}
                  Icon={<img src={option.iconPath} alt={option.label} />}
                  isActive={selectedSurvivorIndex === index}
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
  },
  argTypes: {
    options: {
      table: { disable: true },
      control: false,
    },
  },
};

export default BasicSurvivors;
