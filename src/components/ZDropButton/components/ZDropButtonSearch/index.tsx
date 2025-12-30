import {
  KeyboardEventHandler,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { ZDropButtonContext } from "../../index";
import { ZDropButtonSearchProps } from "components/ZDropButton/types/zDropButtonTypes";
import { classNames } from "../../../../helpers/classNames";
import styles from "../../styles/ZDropButton.module.scss";

const ZDropButtonSearch = (props: ZDropButtonSearchProps) => {
  const {
    placeholder,
    searchIcon,
    clearIcon,
    className,
    shouldFocusOnOpen = false,
  } = props;

  const { onSearch, searchInputRef, optionsRef, isOpen } =
    useContext(ZDropButtonContext);

  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const searchFormClasses = classNames(styles["zd-button__search"]);

  const searchInputFieldClasses = classNames(
    styles["zd-button__search-input-field"],
    { active: isSearchActive },
    className
  );

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onSearch?.(e.target.value);
  };

  const onSearchMouseEnter = () => {
    setIsSearchActive(true);
  };

  const onSearchMouseLeave: MouseEventHandler<HTMLFormElement> = (e) => {
    if (searchInputRef?.current && !searchInputRef.current?.value) {
      (e.target as HTMLElement).blur();

      setIsSearchActive(false);
    }
  };

  const onSearchKeyDown: KeyboardEventHandler<HTMLFormElement> = (e) => {
    if (["ArrowDown", "Tab"].includes(e.key)) {
      e.preventDefault();

      !searchInputRef?.current?.value && setIsSearchActive(false);

      optionsRef?.current[0].focus();
    }

    if (["ArrowUp"].includes(e.key)) {
      e.preventDefault();

      !searchInputRef?.current?.value && setIsSearchActive(false);

      optionsRef?.current[optionsRef.current.length - 1].focus();
    }
  };

  const onClearClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (searchInputRef?.current) {
      searchInputRef.current.value = "";
      searchInputRef.current.focus();
    }

    onSearch?.("");

    setIsSearchActive(false);
  };

  useEffect(() => {
    if (searchInputRef?.current && isOpen && shouldFocusOnOpen) {
      searchInputRef.current.focus();
    }
  }, []);

  return (
    <form
      className={searchFormClasses}
      onMouseEnter={onSearchMouseEnter}
      onMouseLeave={onSearchMouseLeave}
      onKeyDown={onSearchKeyDown}
    >
      <div className={searchInputFieldClasses}>
        {searchIcon && <div>{searchIcon}</div>}
        <input
          className={styles["zd-button__search-input"]}
          onChange={onInputChange}
          ref={searchInputRef}
          placeholder={placeholder}
        />
        <button
          className={styles["zd-button__search-clear-btn"]}
          type="button"
          onClick={onClearClick}
        >
          {clearIcon || (
            <span className={styles["zd-button__search-clear-btn-icon"]} />
          )}
        </button>
      </div>
    </form>
  );
};

export default ZDropButtonSearch;
