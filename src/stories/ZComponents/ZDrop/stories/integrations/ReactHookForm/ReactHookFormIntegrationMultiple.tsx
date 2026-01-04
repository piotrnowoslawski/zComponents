import type { StoryObj } from "@storybook/react";
import { ZDropProps, ZDropValue } from "@components/ZDrop/types/zDropTypes";
import styles from "@stories/styles/StorybookTheme.module.scss";
import { useZDropStore, zDropStore } from "@stories/store/zDropStore";
import { zombieOptionsObjects } from "@stories/staticData/objects/zDropObjectsData";
import { ZDropField } from "@components/ZDrop/integrations/react-hook-form/ZDropField";

import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import SaveButton from "@stories/ZComponents/Integrations/ReactHookForm/SaveButton";
import ValuePreview from "@stories/ZComponents/Integrations/ReactHookForm/ValuePreview";
import SubmittedMessage from "@stories/ZComponents/Integrations/ReactHookForm/SubmittedMessage";

interface FormValues {
  zombies: ZDropValue[] | null;
}

type ZDropFieldStoryArgs = Omit<ZDropProps, "name" | "value" | "onChange">;

type Story = StoryObj<ZDropFieldStoryArgs>;

const preparePreviewValue = (value: any[] | null) => {
  if (!value) {
    return { zombies: [] };
  }

  return {
    zombies: value,
  };
};

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

const ReactHookFormIntegrationMultiple: Story = {
  render: (args) => {
    const zombies = useZDropStore((s) => s.selectedZombies);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
      setIsSubmitted(true);
    };

    const { control, handleSubmit, watch } = useForm<FormValues>({
      defaultValues: { zombies: zombies?.objects ?? [] },
    });

    const values = watch();

    useEffect(() => {
      if (isSubmitted) {
        const timer = setTimeout(() => {
          setIsSubmitted(false);
        }, 2000);
        return () => clearTimeout(timer);
      } else {
        setIsSubmitted(false);
      }
    }, [values]);

    return (
      <div className={styles.zDropStorybookWrapper}>
        <div className={styles.zDropHookFormContent}>
          <div>
            <form
              className={styles.zDropHookForm}
              onSubmit={handleSubmit(onSubmit)}
            >
              <ZDropField<FormValues>
                control={control}
                name="zombies"
                valueKey="stateId"
                onChangeTransform={(selected: any) => {
                  onChange(selected);
                  return selected;
                }}
                rules={{
                  validate: (value) =>
                    value?.length === 0 ? "Survivor is required" : true,
                }}
                {...args}
              />
              <SaveButton className={styles.zDropHookFormSaveButton} />
            </form>
            <ValuePreview
              className={styles.zDropHookFormValuePreview}
              values={values?.zombies}
              preparePreviewValue={preparePreviewValue}
            />
            <div className={styles.zDropHookFormSelectionPreview}>
              {isSubmitted && (
                <SubmittedMessage
                  className={styles.zDropHookFormSubmittedMessage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
  args: {
    options: zombieOptionsObjects,
    label: "Zombies:",
    isMultiple: true,
    isDisabled: false,
    isSearchable: true,
    placeholder: "select zombies...",
    shouldReturnObjectOnChange: true,
    clear: "always",
    styleClasses: {
      container: styles.zDropHookFormContainer,
      list: styles.zDropHookFormList,
      listItem: styles.zDropHookFormListItem,
    },
    noDataContent: (
      <div className={styles.zDropHookFormNoDataContent}>
        No survivors found
      </div>
    ),
    isAutoHeightEnabled: true,
    autoHeightPosition: "bottom",
  },
  argTypes: {
    options: {
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
    listMaxHeightLimiter: {
      table: { disable: true },
      control: false,
    },
    positionToReferenceElement: {
      table: { disable: true },
      control: false,
    },
    searchFilterDelay: {
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
  },
  parameters: {
    controls: {
      exclude: ["onChange", "name", "value"],
    },
  },
};

export default ReactHookFormIntegrationMultiple;
