interface ClassNames {
  [key: string]: boolean | undefined;
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
        console.log("key,value", key, value);
        if (typeof key === "string" && key !== "undefined" && value) {
          classes.push(key);
        }
      });
    }
  });

  return classes.join(" ");
};
