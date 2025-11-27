# 📘 zComponents — Growing UI React Component Library

![npm version](https://img.shields.io/npm/v/zcomponents-ui?color=rgb%2825%2C150%2C90%29&style=for-the-badge)
![npm downloads](https://img.shields.io/npm/dm/zcomponents-ui?color=blue&style=for-the-badge)
![license](https://img.shields.io/npm/l/zcomponents-ui?style=for-the-badge)
![types included](https://img.shields.io/badge/TypeScript-included-blue?style=for-the-badge)
[![storybook](https://img.shields.io/badge/Storybook-Docs%20Site-FF4785?style=flat-square)](https://piotrnowoslawski.github.io/zComponents)

**zComponents** is an evolving library of reusable, customizable React components.  
This package will grow over time, adding new UI building blocks with unified styling and behavior.

- ✅ Written in TypeScript
- ✅ Styled using SCSS Modules
- ✅ Ready for npm distribution
- ✅ Interactive documentation powered by Storybook

---

# 🟩 Zero Dependencies

`zcomponents-ui` is built with **zero external dependencies**.

---

The first component included in the library is:

# 🎯 **ZDrop — Advanced Dropdown / Select Component**

This README describes the **ZDrop** component inside the **zComponents** package.

---

# 📚 Storybook Documentation

All components in the **zComponents UI Library** come with interactive examples and full API documentation.

🔗 **Live Storybook:**  
https://piotrnowoslawski.github.io/zComponents

The Storybook is deployed automatically from `main` using GitHub Pages.

---

# 📚 Table of Contents

- 📘 [zComponents — Growing React Component Library](#-zcomponents--growing-ui-react-component-library)
- 🎯 [ZDrop — Advanced Dropdown / Select Component](#-zdrop--advanced-dropdown--select-component)
- 🚀 [Installation](#-installation)
- ✨ [Features (ZDrop)](#-features-zdrop)
- 📦 [Basic Usage (ZDrop)](#-basic-usage-zdrop)
- 🧩 [Multiple Select Example](#-multiple-select-example)
- 🎨 [Custom Rendering](#-custom-rendering)
  - [Custom Option Renderer](#custom-option-renderer)
  - [Custom Value Renderer](#custom-value-renderer)
  - [Custom Expand Toggle](#custom-expand-toggle)
- 🧠 [Object Options Example](#-object-options-example)
- 🔍 [Search Features](#-search-features)
- 📦 [Additional Behaviors & Notes](#-additional-behaviors--notes)
  - [Flexible Option Types](#flexible-option-types)
  - [valueKey — Underlying Value Extraction](#valuekey--underlying-value-extraction)
  - [labelKey — Display Label](#labelkey--display-label)
  - [referenceElementClassName — Boundary Handling](#referenceelementclassname--boundary-handling)
  - [Clear Behavior (`clear` prop)](#-clear-behavior-clear-prop)
  - [noDataContent](#-nodatacontent)
- 📌 [Dropdown Positioning & Max Height](#-dropdown-positioning--max-height)
- 🎛 [Props Reference](#-props-reference)
- 🎨 [Styling Reference](#-styling-reference)
- 📤 [Events](#-events)
- 🔌 [Integrations](#-integrations)
  - [Integrations React Hook Form](#-react-hook-form)
    - 🔌 [Installation & Import](#-installation--import)
    - 🧱 [ZDropField API](#-zdropfield-api)
    - 🔄 [Value Mapping: onChangeTransform & valueSelector](#-value-mapping-onchangetransform--valueselector)
    - 🧪 [Validation](#-validation)
    - 🧩 [Yup / Zod Example](#-yup--zod-validation)
- 🏗 [Build Outputs](#-build-outputs)
- 📄 [License](#-license)

---

# 🚀 Installation

```bash
npm install zcomponents
# or
yarn add zcomponents
# or
pnpm add zcomponents
```

---

# ✨ Features (ZDrop)

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

### Custom Option Renderer

```tsx
const optionRenderer = (option, isSelected) => (
  <div style={{ fontWeight: isSelected ? "bold" : "normal" }}>{option}</div>
);

<ZDrop name="custom" optionRenderer={optionRenderer} />;
```

---

### Custom Value Renderer

```tsx
const valueRenderer = ({ option, onRemove }) => (
  <span onClick={onRemove} style={{ marginRight: 8 }}>
    ❌ {option}
  </span>
);

<ZDrop name="tags" isMultiple valueRenderer={valueRenderer} />;
```

---

### Custom Expand Toggle

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

# 📦 Additional Behaviors & Notes

### Flexible Option Types

ZDrop supports:

- `string`
- `number`
- `object`

Returned values may be:

- primitive
- object
- array (in `isMultiple` mode)

---

### valueKey — Underlying Value Extraction

```tsx
valueKey = "id";
```

Used to extract a unique primitive identifier from object-based options.

---

### labelKey — Display Label

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

# 🧼 Clear Behavior (`clear` prop)

The `clear` prop controls how and when the clear button becomes visible.

```ts
type Clear = "always" | "whenChanged" | "whenSearched" | "none";
```

### 🔹 `clear: "always"`

The Clear button is always visible after a selection is made or a search is used (unless disabled).

### 🔹 `clear: "whenChanged"`

Visible **only visible after a value has been selected.**.

### 🔹 `clear: "whenSearched"`

Visible **only visible when a search input is active**.

### 🔹 `clear: "none"`

Clear button hidden entirely.

### `onClear` Event

```ts
onClear?: () => void;
```

Example:

```tsx
<ZDrop
  name="countries"
  clear="whenChanged"
  onClear={() => console.log("Cleared!")}
/>
```

---

# 📭 `noDataContent`

The `noDataContent` prop allows you to customize what is displayed when the dropdown has **no matching options** after applying the search filter.

You can provide:

- plain text
- a React element
- a fully custom styled component

### Example

```tsx
<ZDrop
  name="users"
  options={userList}
  isSearchable
  noDataContent={
    <div style={{ padding: 8, color: "#888" }}>No results found</div>
  }
/>
```

Use this prop to create a more user‑friendly “empty state” when the list becomes empty during search.

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

### `listMaxHeightLimiter`

- Only works if a reference element is provided via **referenceElementClassName** prop
- Height adjustment also possible via CSS

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

# 🔌 Integrations

## 🧩 React Hook Form

`ZDrop` works seamlessly with **react-hook-form** using the helper component `ZDropField`.  
This integration is optional — you can still use `ZDrop` standalone.

---

### 🔌 Installation & Import

```bash
npm install zcomponents-ui react-hook-form
```

```tsx
import { ZDropField } from "zcomponents-ui/react-hook-form";
```

---

### 📦 Basic Example

```tsx
import { useForm } from "react-hook-form";
import { ZDropField } from "zcomponents-ui/react-hook-form";

type FormValues = { survivor: string };

const options = [
  { value: "hiroshi", label: "Hiroshi" },
  { value: "harper", label: "Harper" },
];

export function ExampleForm() {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: { survivor: "hiroshi" },
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <ZDropField<FormValues>
        control={control}
        name="survivor"
        options={options}
        placeholder="select a survivor"
        isSearchable
      />
    </form>
  );
}
```

---

## 🧱 ZDropField API

`ZDropField` accepts nearly all props of `ZDrop`, except for:

| Removed from ZDropField | Why                       |
| ----------------------- | ------------------------- |
| `value`                 | Managed internally by RHF |
| `onChange`              | Controlled by RHF         |
| `name`                  | Must match RHF schema     |

Instead, RHF-specific fields are added:

```ts
type ZDropFieldProps = Omit<ZDropProps, "value" | "onChange" | "name"> & {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  rules?: RegisterOptions<TFieldValues>;
  onChangeTransform?: (value: unknown) => unknown;
  valueSelector?: (formValue: unknown) => unknown;
  errorClassName?: string;
  errorRenderer?: (message: string) => React.ReactNode;
};
```

---

### 🔑 Additional Props Explained

#### `rules`

Standard react-hook-form validation rules.

#### `onChangeTransform`

Transforms the selected option before it is stored inside the form.

#### `valueSelector`

Transforms the form value before passing it back into ZDrop.

#### `errorClassName`

CSS class for validation error.

#### `errorRenderer`

Custom renderer for validation messages.

---

## 🔄 Value Mapping: `onChangeTransform` & `valueSelector`

These two functions give complete control over how data flows.

---

### Case 1 — Store only an ID

```tsx
<ZDropField<FormValues>
  name="survivorId"
  valueKey="id"
  options={options}
  onChangeTransform={(option) => option?.id ?? null}
  valueSelector={(id) => options.find((o) => o.id === id)}
/>
```

---

### Case 2 — Store the entire object

```tsx
<ZDropField<FormValues>
  name="survivor"
  shouldReturnObjectOnChange
  onChangeTransform={(option) => option ?? null}
/>
```

---

## 🧪 Validation

### Built-in RHF rules

```tsx
<ZDropField name="survivor" rules={{ required: "Survivor is required" }} />
```

### Validate only on submit

```tsx
useForm({
  mode: "onSubmit",
  reValidateMode: "onSubmit",
});
```

---

## 🧩 Yup / Zod Validation

```ts
const schema = z.object({
  survivor: z
    .object({
      id: z.number(),
      label: z.string(),
    })
    .nullable(),
});
```

```tsx
const { control } = useForm({
  resolver: zodResolver(schema),
});

<ZDropField
  name="survivor"
  shouldReturnObjectOnChange
  onChangeTransform={(option) => option ?? null}
/>;
```

---

## 🧭 Summary

- 🔌 Easy integration with react-hook-form
- 🔄 Full control over value mapping
- ✔ Supports Yup/Zod
- 🎨 Customizable error rendering

# 🏗 Build Outputs

- **ESM:** `dist/index.esm.js`
- **CJS:** `dist/index.cjs.js`
- **Types:** `dist/index.d.ts`

---

# 📄 License

MIT © Piotr Nowosławski
