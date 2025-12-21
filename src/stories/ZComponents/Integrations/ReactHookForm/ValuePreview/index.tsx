interface Props {
  className?: string;
  values?: any;
  preparePreviewValue: (value: any) => any;
}

const ValuePreview = (props: Props) => {
  const { className, values, preparePreviewValue } = props;

  return (
    <div className={className}>
      <pre>{JSON.stringify(preparePreviewValue(values), null, 2)}</pre>
    </div>
  );
};

export default ValuePreview;
