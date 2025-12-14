# Changelog

## 1.0.0 – Initial release

### ✨ Initial version of ZDrop

- Single & multiple select
- Strings / numbers / objects support
- Custom renderers for value, option, toggle, clear
- SCSS Modules + external style overrides
- Keyboard navigation
- Search with custom filter & delay
- Storybook demo (GitHub Pages)

---

## 1.1.0 – ZDrop React Hook Form Integration

### ✨ New Features

- Added **`ZDropField`** — official integration with **React Hook Form**
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

- Hardened TypeScript definitions for RHF integration
- Introduced dedicated sub-entrypoint:

```ts
import { ZDropField } from "zcomponents-ui/react-hook-form";
```

---

## 1.2.0 – ZDropButton & Advanced Dropdown Behavior

### ✨ New Features

- Added **`ZDropButton`** — a button-based dropdown built with the **Compound Components** pattern
- Flexible composition using:
  - `ZDropButton.Search`
  - `ZDropButton.Content`
  - `ZDropButton.List`
  - `ZDropButton.Item`
- Supports:
  - Button toggle with **title and/or icon**
  - Fully custom dropdown content structure
  - Optional search input with controlled filtering
  - Flexible content positioning (top / bottom / left / right combinations)
  - List items as actions or navigation links
  - Active item state handling
- Type-safe API with **compile-time enforcement**:
  - `title` **or** `toggleIcon` required

### ✨ ZDrop Enhancements

- Introduced **two interchangeable dropdown positioning & height strategies**:
  - Reference element–based (container-aware)
  - Viewport-based auto height
- Added:
  - `isAutoHeightEnabled`
  - `autoHeightPosition`
- Automatic list height adjustment based on available space
- Improved smart top / bottom switching behavior
- Clear separation and mutual exclusivity of positioning strategies enforced in TypeScript

### 🔧 Internal Improvements

- Refactored positioning logic for better predictability
- Improved TypeScript API guards (mutually exclusive props)
- Unified internal dropdown measurement logic
- Extended Storybook with:
  - ZDropButton examples
  - Advanced positioning demos
  - Compound components usage patterns
