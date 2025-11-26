export const checkIsClearHidden = (
  hasValueChanged: boolean,
  currentSearchedValue: string,
  isListVisible: boolean,
  isClearableOnlyWhenChange: boolean,
  isClearableOnlyWhenSearch: boolean
): boolean => {
  if (isClearableOnlyWhenChange && !isListVisible && hasValueChanged) {
    return false;
  }

  if (isClearableOnlyWhenSearch && isListVisible && currentSearchedValue) {
    return false;
  }

  if (
    !isClearableOnlyWhenChange &&
    !isClearableOnlyWhenSearch &&
    (currentSearchedValue || hasValueChanged)
  ) {
    return false;
  }

  return true;
};
