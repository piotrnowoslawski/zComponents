interface Props {
  className?: string;
}

const SaveButton = (props: Props) => {
  const { className } = props;

  return (
    <button className={className} type="submit">
      Save
    </button>
  );
};

export default SaveButton;
