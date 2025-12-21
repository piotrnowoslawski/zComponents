interface Props {
  className?: string;
}

const SubmittedMessage = (props: Props) => {
  const { className } = props;

  return <p className={className}>Form submitted!</p>;
};

export default SubmittedMessage;
