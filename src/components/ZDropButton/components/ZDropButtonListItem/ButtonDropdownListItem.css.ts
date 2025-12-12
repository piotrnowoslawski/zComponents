// import styled, { css } from "styled-components";
// import { NavLink } from "react-router-dom";

// const itemActiveStyle = (theme) => css`
//   background: ${theme.themeColors.backgroundActive.buttonDropdown.listItem};

//   ${ItemTitle} {
//     color: ${theme.themeColors.fontHover.buttonDropdown.title};
//   }

//   .icon {
//     fill: ${theme.themeColors.fillHover.buttonDropdown};
//   }
// `;

// export const ItemTitle = styled.span`
//   font-size: 14px;
//   font-weight: 500;
//   white-space: nowrap;
//   color: ${({ theme }) => theme.themeColors.font.buttonDropdown.title};
//   transition: color 0.2s linear, transform 0.1s linear;
// `;

// const itemContentStyle = css`
//   position: relative;
//   display: flex;
//   align-items: center;
//   width: 100%;
//   padding: 10px 25px;
//   transition: background-color 0.2s linear;
//   cursor: pointer;

//   .icon {
//     height: 18px;
//     width: 18px;
//     margin-right: 5px;
//     fill: ${({ theme }) => theme.themeColors.fill.buttonDropdown};
//     transition: fill 0.2s linear, transform 0.1s linear;
//   }

//   &.active {
//     ${({ theme }) => itemActiveStyle(theme)}
//   }

//   &:focus {
//     outline: none;
//   }

//   &:hover,
//   &:focus {
//     background: ${({ theme }) =>
//       theme.themeColors.backgroundHover.buttonDropdown.listItem};

//     ${ItemTitle} {
//       color: ${({ theme }) => theme.themeColors.fontHover.buttonDropdown.title};
//       transform: translateX(-4px);
//     }

//     .icon {
//       fill: ${({ theme }) => theme.themeColors.fillHover.buttonDropdown};
//       transform: translateX(-4px);
//     }
//   }
// `;

// export const ItemContent = styled.div`
//   ${itemContentStyle};
// `;

// export const ItemContentLink = styled(NavLink)`
//   ${itemContentStyle};
// `;

// export const ButtonDropdownListItemContainer = styled.li``;
