// import styled from "styled-components";

// export const ButtonDropdownSearchInput = styled.input`
//   display: block;
//   min-width: calc(100% - 30px);
//   height: 100%;
//   padding: 0 10px;
//   color: ${({ theme }) => theme.themeColors.font.base};
//   background: transparent;

//   &::placeholder {
//     color: ${({ theme }) => theme.themeColors.font.buttonDropdown.placeholder};
//   }

//   &:focus {
//     outline: none;
//   }
// `;

// export const SearchIcon = styled.span`
//   position: absolute;
//   top: 0;
//   right: 0;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 30px;
//   height: 100%;
//   background: ${({ theme }) =>
//     theme.themeColors.background.buttonDropdown.searchField};

//   .icon-magnifying-glass {
//     width: 16px;
//     height: 16px;
//     margin-left: 1px;
//     fill: ${({ theme }) => theme.themeColors.fill.buttonDropdown};
//   }
// `;

// export const ButtonDropdownSearchContainer = styled.form`
//   position: relative;
//   display: flex;
//   align-items: center;
//   width: ${({ isActive }) => (isActive ? "100%" : "30px")};
//   height: 30px;
//   margin: 0 0 3px auto;
//   border-radius: ${({ isActive }) => (isActive ? "4px" : "30px")};
//   background: ${({ theme }) =>
//     theme.themeColors.background.buttonDropdown.searchField};
//   overflow: hidden;
//   transition: width 0.2s linear;

//   &:focus-within {
//     width: 100%;
//     border-radius: 4px;

//     .icon-magnifying-glass {
//       fill: ${({ theme }) => theme.themeColors.fillHover.base};
//     }
//   }
// `;
