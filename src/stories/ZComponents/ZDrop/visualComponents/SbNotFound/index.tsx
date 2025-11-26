import styles from "@stories/styles/StorybookTheme.module.scss";

const SbNotFound = () => {
  return (
    <div className={styles.sbNotFound}>
      <img
        className={styles.sbNotFoundBoard}
        src={`boards/not-found-board.webp`}
        alt="Not found"
      />
    </div>
  );
};

export default SbNotFound;
