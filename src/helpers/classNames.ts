interface ClassNames {
  [key: string]: boolean;
}

export const classNames = (
  ...params: (string | ClassNames | undefined)[]
): string => {
  const classes: string[] = [];

  params.forEach((param) => {
    if (typeof param === "string" && param) {
      classes.push(param);
    } else if (param && typeof param === "object") {
      Object.entries(param).forEach(([key, value]) => {
        if (value) {
          classes.push(key);
        }
      });
    }
  });

  return classes.join(" ");
};
