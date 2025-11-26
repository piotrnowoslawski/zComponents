# 📘 zComponents — Growing UI React Component Library

![npm version](https://img.shields.io/npm/v/zcomponents-ui?color=rgb%2825%2C150%2C90%29&style=for-the-badge)
![npm downloads](https://img.shields.io/npm/dm/zcomponents-ui?color=blue&style=for-the-badge)
![license](https://img.shields.io/npm/l/zcomponents-ui?style=for-the-badge)
![types included](https://img.shields.io/badge/TypeScript-included-blue?style=for-the-badge)

**zComponents** is an evolving library of reusable, customizable React components.  
This package will grow over time, adding new UI building blocks with unified styling and behavior.

- ✅ Written in TypeScript
- ✅ Styled using SCSS Modules
- ✅ Ready for npm distribution
- ✅ Interactive documentation powered by Storybook

The first component included in the library is:

# 🎯 **ZDrop — Advanced Dropdown / Select Component**

This README describes the **ZDrop** component inside the **zComponents** package.

---

# 📚 Table of Contents

- [📘 zComponents — Growing React Component Library](#-zcomponents--growing-react-component-library)
- [🎯 ZDrop — Advanced Dropdown / Select Component](#-zdrop--advanced-dropdown--select-component)
- [🚀 Installation](#-installation)
- [✨ Features (ZDrop)](#-features-zdrop)
- [📦 Basic Usage (ZDrop)](#-basic-usage-zdrop)
- [🧩 Multiple Select Example](#-multiple-select-example)
- [🎨 Custom Rendering](#-custom-rendering)
  - [Custom Option Renderer](#custom-option-renderer)
  - [Custom Value Renderer](#custom-value-renderer)
  - [Custom Expand Toggle](#custom-expand-toggle)
- [🧠 Object Options Example](#-object-options-example)
- [🔍 Search Features](#-search-features)
- [🔎 Additional Behaviors & Notes](#-additional-behaviors--notes)
  - [Flexible Option Types](#flexible-option-types)
  - [valueKey — Underlying Value Extraction](#valuekey--underlying-value-extraction)
  - [labelKey — Display Label](#labelkey--display-label)
  - [referenceElementClassName — Boundary Handling](#referenceelementclassname--boundary-handling)
- [📌 Dropdown Positioning & Max Height](#-dropdown-positioning--max-height)
- [🎛 Props Reference](#-props-reference)
- [🎨 Styling Reference](#-styling-reference)
- [📤 Events](#-events)
- [🏗 Build Outputs](#-build-outputs)
- [📄 License](#-license)

---

## 🚀 Installation

```bash
npm install zcomponents
# or
yarn add zcomponents
# or
pnpm add zcomponents
```

---

## ✨ Features (ZDrop)

- ✔ Single or multiple selection
- ✔ Searchable dropdown
- ✔ Supports `string`, `number`, and `object` options
- ✔ Customizable option renderer
- ✔ Customizable selected value renderer
- ✔ Custom expand toggle
- ✔ Debounced search
- ✔ Boundary detection via reference element
- ✔ Top/bottom smart dropdown positioning
- ✔ **Dynamic list height limiting (`listMaxHeightLimiter`)**
- ✔ Full styling override via `styleClasses`
- ✔ Returns raw values or full objects
- ✔ Lightweight Rollup bundle
- ✔ Part of the evolving **zComponents** library

---

# 📦 Basic Usage (ZDrop)

```tsx
import { ZDrop } from "zcomponents-ui";

const options = ["Hiroshi", "Harper", "Karl"];

export default function App() {
  return (
    <ZDrop
      name="survivor"
      options={options}
      placeholder="Select a survivor"
      onChange={(value) => console.log(value)}
    />
  );
}
```

---

# 🧩 Multiple Select Example

```tsx
<ZDrop
  name="weapons"
  options={["Swords", "Bows", "Shotguns"]}
  isMultiple
  placeholder="Choose weapons"
  onChange={(values) => console.log(values)}
/>
```

---

# 🎨 Custom Rendering

## Custom Option Renderer

```tsx
const optionRenderer = (option, isSelected) => (
  <div style={{ fontWeight: isSelected ? "bold" : "normal" }}>{option}</div>
);

<ZDrop name="custom" optionRenderer={optionRenderer} />;
```

---

## Custom Value Renderer

```tsx
const valueRenderer = ({ option, onRemove }) => (
  <span onClick={onRemove} style={{ marginRight: 8 }}>
    ❌ {option}
  </span>
);

<ZDrop name="tags" isMultiple valueRenderer={valueRenderer} />;
```

---

## Custom Expand Toggle

```tsx
const toggleRenderer = (isOpen) => <span>{isOpen ? "▲" : "▼"}</span>;

<ZDrop name="dropdown" expandToggleRenderer={toggleRenderer} />;
```

---

# 🧠 Object Options Example

```tsx
const options = [
  { id: 1, name: "Hiroshi" },
  { id: 2, name: "Harper" },
  { id: 3, name: "Karl" },
];

<ZDrop
  name="survivor"
  options={options}
  valueKey="id"
  labelKey="name"
  shouldReturnObjectOnChange
  onChange={(val) => console.log(val)}
/>;
```

---

# 🔍 Search Features

### Built-in search

```tsx
isSearchable;
```

### Custom search logic

```tsx
searchFilter={(option, search) => option.includes(search)}
```

### Debounce timing

```tsx
searchFilterDelay={200}
```

---

# 🔎 Additional Behaviors & Notes

## Flexible Option Types

ZDrop supports:

- `string`
- `number`
- `object`

Returned values may be:

- primitive
- object
- array (in `isMultiple` mode)

---

## valueKey — Underlying Value Extraction

```tsx
valueKey = "id";
```

Used to extract a unique primitive identifier from object-based options.

---

## labelKey — Display Label

```tsx
labelKey = "name";
```

Defines which object field is displayed inside the dropdown list.

---

## referenceElementClassName — Boundary Handling

```tsx
referenceElementClassName = "container";
```

- Not required to be a direct parent
- Dropdown will never overflow outside this element
- Useful in scrollable or constrained layouts

---

# 📌 Dropdown Positioning & Max Height

### `positionToReferenceElement`

```tsx
positionToReferenceElement = "top"; // prefers opening upward
positionToReferenceElement = "bottom"; // prefers downward (default)
```

### Smart switching behavior

- If `top` is selected but there isn’t enough space → dropdown opens **bottom**
- If `bottom` is selected but space is limited → dropdown opens **top**

---

## `listMaxHeightLimiter`

```tsx
listMaxHeightLimiter={200} // px
```

### Rules:

- List will **never exceed** this limit
- Overflow enables scrolling
- **Minimum limit:** 50px
- Works together with top/bottom positioning

Example:

```tsx
<ZDrop
  name="cities"
  listMaxHeightLimiter={300}
  positionToReferenceElement="top"
  options={cityList}
/>
```

---

# 🎛 Props Reference

```ts
export interface ZDropProps {
  name: string;
  options?: ZDropOption[];
  value?: ZDropValue;
  valueKey?: string;
  label?: string | ReactElement;
  labelKey?: string;
  placeholder?: string;
  isMultiple?: boolean;
  isDisabled?: boolean;
  isSearchable?: boolean;
  clear?: Clear;
  searchFilterDelay?: number;
  searchFilter?: SearchFilter;
  shouldReturnObjectOnChange?: boolean;
  onChange?: Function;
  onClear?: Function;
  valueRenderer?: ValueRenderer;
  optionRenderer?: OptionRenderer;
  expandToggleRenderer?: ExpandToggleRenderer;
  clearIcon?: ReactElement;
  noDataContent?: string | ReactElement;
  referenceElementClassName?: string;
  positionToReferenceElement?: "top" | "bottom";
  listMaxHeightLimiter?: number;
  styleClasses?: StyleClasses;
}
```

---

# 🎨 Styling Reference

```ts
export interface StyleClasses {
  container?: string;
  label?: string;
  inputField?: string;
  input?: string;
  inputValue?: string;
  inputMultipleValue?: string;
  inputMultipleSearch?: string;
  expandToggle?: string;
  expandToggleIcon?: string;
  list?: string;
  listItem?: string;
  noData?: string;
  clearButton?: string;
  removeButton?: string;
}
```

---

# 📤 Events

### onChange

```ts
(value: ZDropValue) => void
```

### onClear

Triggered when the clear button is pressed.

---

# 🏗 Build Outputs

- **ESM:** `dist/index.esm.js`
- **CJS:** `dist/index.cjs.js`
- **Types:** `dist/index.d.ts`

---

# 📄 License

MIT © Piotr Nowosławski
