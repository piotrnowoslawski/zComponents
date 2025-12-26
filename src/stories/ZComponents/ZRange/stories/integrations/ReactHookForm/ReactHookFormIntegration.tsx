import type { StoryObj } from "@storybook/react";
import styles from "@stories/styles/StorybookTheme.module.scss";
import { ZRangeField } from "@components/ZRange/integrations/react-hook-form/ZRangeField";
import { ZRangeProps } from "@components/ZRange/types/zRangeTypes";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import StoriesVisualComponents from "@stories/ZComponents/ZRange/visualComponents";
import SaveButton from "@stories/ZComponents/Integrations/ReactHookForm/SaveButton";
import ValuePreview from "@stories/ZComponents/Integrations/ReactHookForm/ValuePreview";
import SubmittedMessage from "@stories/ZComponents/Integrations/ReactHookForm/SubmittedMessage";

interface FormValues {
  price: { min: number; max: number } | null;
}

type ZDropFieldStoryArgs = Omit<ZRangeProps, "name">;

type Story = StoryObj<ZDropFieldStoryArgs>;

const ReactHookFormIntegration: Story = {
  render: (args: ZDropFieldStoryArgs) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit: SubmitHandler<FormValues> = (data) => {
      setIsSubmitted(true);
    };

    const { control, handleSubmit, watch } = useForm<FormValues>({
      defaultValues: { price: { min: args.value.min, max: args.value.max } },
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

    const preparePreviewValue = (value: any) => {
      if (!value || !value.price) {
        return { price: null };
      }

      return {
        price: value.price,
      };
    };

    return (
      <div className={styles.zRangeStorybookWrapper}>
        <form
          className={styles.zRangeHookForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <ZRangeField control={control} name="price" {...args} />
          <div className={styles.zRangeHookFormSaveButtonWrapper}>
            <SaveButton className={styles.zRangeHookFormSaveButton} />
          </div>
        </form>
        <ValuePreview
          className={styles.zRangeHookFormValuePreview}
          values={values}
          preparePreviewValue={preparePreviewValue}
        />
        {isSubmitted && (
          <SubmittedMessage className={styles.zRangeHookFormSubmittedMessage} />
        )}
        <StoriesVisualComponents
          units={args.unitList || []}
          divisors={args.unitDivisors || []}
          title="Price"
          range={watch().price || { min: args.value.min, max: args.value.max }}
          rangeParams={{
            step: args.step || 1,
            min: args.min,
            max: args.max,
            scale: args.scale || "x",
          }}
        />
      </div>
    );
  },
  args: {
    value: { min: 130, max: 700 },
    step: 10,
    min: 0,
    max: 1000,
    scale: "x",
    unitList: [{ unit: "$", fractionDigits: 0 }],
    unitDivisors: [1],
    isIndicatorUnitHidden: false,
    styleClasses: {
      container: styles.zRange,
    },
    label: "Price:",
  },
  argTypes: {
    icons: {
      table: { disable: true },
      control: false,
    },
    onSelect: {
      table: { disable: true },
      control: false,
    },
    onChange: {
      table: { disable: true },
      control: false,
    },
    scale: {
      table: { disable: true },
      control: false,
    },
  },
};

export default ReactHookFormIntegration;
