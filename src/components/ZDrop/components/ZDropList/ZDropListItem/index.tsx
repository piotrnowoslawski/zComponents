import { KeyboardEvent, MouseEvent } from "react";
import { ZDropListItemProps } from "../../../types/zDropTypes";

export const ZDropListItem = (props: ZDropListItemProps) => {
  const {
    option,
    index,
    labelKey,
    innerRef,
    onOptionClick,
    onOptionKeyDown,
    className,
    children,
  } = props;

  const onListItemClick = (e: MouseEvent<HTMLLIElement>) => {
    onOptionClick(e, option);
  };

  const onListItemKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    onOptionKeyDown(e, option, index);
  };

  return (
    <li
      tabIndex={0}
      ref={innerRef}
      className={className}
      onClick={onListItemClick}
      onKeyDown={onListItemKeyDown}
    >
      {children || (labelKey && (option as any)[labelKey]) || option}
    </li>
  );
};

export default ZDropListItem;
