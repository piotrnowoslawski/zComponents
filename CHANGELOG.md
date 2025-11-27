# Changelog

## 1.0.0 – Initial release

### ✨ Initial version of ZDrop:

- Single & multiple select
- Strings / numbers / objects
- Custom renderers for value, option, toggle, clear
- SCSS Modules + external style overrides
- Keyboard navigation
- Search with custom filter & delay
- Storybook demo (GitHub Pages)

## **1.1.0 – ZDrop React Hook Form Integration**

### ✨ New Features

- Added **`ZDropField`** — an official integration for **React Hook Form**
- Supports:
  - `rules` validation (required, validate, etc.)
  - RHF `mode` / `reValidateMode`
  - Custom error rendering: `errorRenderer`, `errorClassName`
  - Object ↔ form-value mapping using:
    - `onChangeTransform`
    - `valueSelector`
- Fully compatible with **Yup**, **Zod**, and all RHF resolvers
- Added Storybook examples:
  - Form integration
  - Validation flows
  - Object-based values

### 🔧 Internal Improvements

- Cleaned & hardened TypeScript definitions for integration types
- Introduced clean sub-entrypoint:
  ```ts
  import { ZDropField } from "zcomponents-ui/react-hook-form";
  ```
