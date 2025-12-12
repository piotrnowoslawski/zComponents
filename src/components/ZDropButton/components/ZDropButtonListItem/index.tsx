import { KeyboardEventHandler, MouseEventHandler, useContext } from "react";
import { ZDropButtonContext } from "../../index";
import { ZDropButtonListItemProps } from "components/ZDropButton/types/zDropButtonTypes";
import { classNames } from "../../../../helpers/classNames";
import styles from "../../styles/ZDropButton.module.scss";

const ZDropButtonListItem = (props: ZDropButtonListItemProps) => {
  const {
    index,
    title,
    Icon,
    urlPath,
    className,
    linkAs: LinkTag = "a",
    isActive = false,
    children,
  } = props;
  const { addToRefs, optionsRef, onItemSelect, searchInputRef } =
    useContext(ZDropButtonContext);

  const itemContainerClasses = (isActive: boolean) =>
    classNames(
      styles["zd-button__list-item"],
      {
        [styles["zd-button__list-item--active"]]: !urlPath && isActive,
      },
      className
    );

  const onItemClick: MouseEventHandler<HTMLElement> = (e) => {
    if (!urlPath) {
      e.preventDefault();
      e.stopPropagation();
    }

    onItemSelect?.(index);
  };

  const onItemMouseEnter = () => {
    optionsRef?.current[index].focus();
  };

  const onItemMouseLeave = () => {
    optionsRef?.current[index].blur();
  };

  const onItemKeyDown: KeyboardEventHandler<HTMLElement> = (e) => {
    if ([" ", "Enter"].includes(e.key)) {
      if (urlPath) {
        return e.currentTarget.click();
      }
      e.preventDefault();
      e.stopPropagation();

      onItemSelect?.(index);

      return;
    }

    if (e.key === "ArrowUp" && index !== 0) {
      e.preventDefault();
      e.stopPropagation();

      optionsRef?.current[index - 1].focus();

      return;
    }

    if (e.key === "ArrowUp" && index === 0) {
      e.preventDefault();
      e.stopPropagation();

      if (searchInputRef?.current) {
        searchInputRef.current.focus();

        return;
      }

      optionsRef?.current[optionsRef.current.length - 1].focus();

      return;
    }

    if (
      e.key === "ArrowDown" &&
      optionsRef?.current &&
      index !== optionsRef?.current?.length - 1
    ) {
      e.preventDefault();
      e.stopPropagation();

      optionsRef?.current[index + 1].focus();

      return;
    }

    if (
      e.key === "ArrowDown" &&
      optionsRef?.current &&
      index === optionsRef?.current?.length - 1
    ) {
      e.preventDefault();
      e.stopPropagation();

      if (searchInputRef?.current) {
        searchInputRef.current.focus();

        return;
      }

      optionsRef.current[0].focus();
    }
  };

  const ItemTypeComponent = urlPath ? LinkTag : "div";

  return (
    <li>
      <ItemTypeComponent
        ref={(el: HTMLElement | null) => addToRefs?.(el, index)}
        className={itemContainerClasses(isActive)}
        tabIndex={0}
        onClick={onItemClick}
        onMouseEnter={onItemMouseEnter}
        onMouseLeave={onItemMouseLeave}
        onKeyDown={onItemKeyDown}
        {...(urlPath &&
          (LinkTag === "a" ? { href: urlPath } : { to: urlPath }))}
      >
        {Icon && (
          <div className={styles["zd-button__list-item-icon"]}>{Icon}</div>
        )}
        <span className={styles["zd-button__list-item-title"]}>{title}</span>
        {children}
      </ItemTypeComponent>
    </li>
  );
};

export default ZDropButtonListItem;
