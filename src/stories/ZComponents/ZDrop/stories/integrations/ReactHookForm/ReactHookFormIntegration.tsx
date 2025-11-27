import type { StoryObj } from "@storybook/react";
import { ZDropProps, ZDropValue } from "@components/ZDrop/types/zDropTypes";
import styles from "@stories/styles/StorybookTheme.module.scss";
import {
  useZDropStore,
  zDropStore,
} from "@stories/ZComponents/ZDrop/store/zDropStore";
import { survivorOptionsObjects } from "../../../staticData/objects/zDropObjectsData";
import { ZDropField } from "@components/ZDrop/integrations/react-hook-form/ZDropField";

import { useForm, SubmitHandler } from "react-hook-form";
import SbSelectionElement from "@stories/ZComponents/ZDrop/visualComponents/SbSelection/SbSelectionElement";
import { useEffect, useState } from "react";

interface FormValues {
  survivor: ZDropValue | null;
}

type ZDropFieldStoryArgs = Omit<ZDropProps, "name" | "value" | "onChange">;

type Story = StoryObj<ZDropFieldStoryArgs>;

const preparePreviewValue = (value: any) => {
  if (!value || !value.survivor) {
    return { survivor: null };
  }

  return {
    survivor: {
      id: value.survivor.id,
      stateId: value.survivor.stateId,
      value: value.survivor.value,
      label: value.survivor.label,
    },
  };
};

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

const ReactHookFormIntegration: Story = {
  render: (args) => {
    const survivor = useZDropStore((s) => s.selectedSurvivor);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
      setIsSubmitted(true);
    };

    const { control, handleSubmit, watch } = useForm<FormValues>({
      defaultValues: { survivor: survivor?.object ?? null },
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
                name="survivor"
                valueKey="stateId"
                onChangeTransform={(selected: any) => {
                  onChange(selected);
                  return selected;
                }}
                rules={{
                  validate: (value) => (value ? true : "Survivor is required"),
                }}
                {...args}
              />

              <button className={styles.zDropHookFormSaveButton} type="submit">
                Save
              </button>
            </form>
            <div className={styles.zDropHookFormValuePreview}>
              <pre>{JSON.stringify(preparePreviewValue(values), null, 2)}</pre>
            </div>
            <div className={styles.zDropHookFormSelectionPreview}>
              <SbSelectionElement
                selected={survivor?.object?.value}
                selectType="survivors"
                storyType={"integrations"}
                {...(isSubmitted && {
                  className: styles.zDropHookFormSubmitted,
                })}
              />
              {isSubmitted && (
                <p className={styles.zDropHookFormSubmittedMessage}>
                  Form submitted!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
  args: {
    options: survivorOptionsObjects,
    isMultiple: false,
    isDisabled: false,
    isSearchable: true,
    placeholder: "select a survivor...",
    shouldReturnObjectOnChange: true,
    clear: "always",
    styleClasses: {
      container: styles.zDropHookFormContainer,
      list: styles.zDropHookFormList,
      listItem: styles.zDropHookFormListItem,
    },
    noDataContent: <div>No survivors found</div>,
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

export default ReactHookFormIntegration;
