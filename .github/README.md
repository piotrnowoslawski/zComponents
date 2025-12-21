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

# 📚 Storybook Documentation

All components in the **zComponents UI Library** come with interactive examples and full API documentation.

🔗 **Live Storybook:**  
https://piotrnowoslawski.github.io/zComponents

The Storybook is deployed automatically from `main` using GitHub Pages.

---

# 📦 Components:

## **ZDrop — Advanced Dropdown / Select Component**

## **ZDropButton — Advanced Select / Nav Button**

## **ZRange — Advanced Range Slider**

# 📌 Table of Contents

- 📘 [zComponents — Growing React Component Library](#-zcomponents--growing-ui-react-component-library)
- 🚀 [Installation](#-installation)
- 📦 Components:

  - 🎯 [ZDrop](#-zdrop)

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
    - 📌 [Dropdown Positioning & Height Management](#-dropdown-positioning--height-management)
    - 🎛 [Props Reference](#-props-reference)
    - 🎨 [Styling Reference](#-styling-reference)
    - 📤 [Events](#-events)
    - 🔌 [Integrations](#-zdrop-integrations)

      - [React Hook Form](#-react-hook-form)
        - 🔌 [Installation & Import](#-installation--import)
        - 🧱 [ZDropField API](#-zdropfield-api)
        - 🔄 [Value Mapping: onChangeTransform & valueSelector](#-value-mapping-onchangetransform--valueselector)
        - 🧪 [Validation](#-validation)
        - 🧩 [Yup / Zod Example](#-yup--zod-validation)

  - 🎯 [ZDropButton](#-zdropbutton)

    - ✨ [Features (ZDropButton)](#-features-zdropbutton)
    - 🧩 [Compound Components Architecture](#-compound-components-architecture)
    - 📦 [Basic Usage (ZDropButton)](#-basic-usage-1)
    - ✅ [Toggle Requirements](#-toggle-requirements)
    - 🔍 [Search — ZDropButton.Search](#-search--zdropbuttonsearch)
    - 📌 [Dropdown Content & Positioning](#-dropdown-content--positioning)
    - 📃 [List & Items](#-list--items)
    - 🧼 [Outside Click Handling](#-outside-click-handling)
    - 🎛 [Props Reference (ZDropButton)](#-zdropbutton-props-reference)
    - 📤 [Events (ZDropButton)](#-events-1)
    - 🧭 [Summary (ZDropButton)](#-summary-1)

  - 🎚 [ZRange](#-zrange)

    - ✨ [Features (ZRange)](#-features-zrange)
    - 📦 [Basic Usage (ZRange)](#-basic-usage-zrange)
    - 📐 [Range Logic & Behavior](#-range-logic--behavior)
    - 📊 [Scaling & Units](#-scaling--units)
    - 🎨 [Styling (ZRange)](#-styling-zrange)
    - 🎛 [Props Reference (ZRange)](#-props-reference-zrange)
    - 🔌 [Integrations](#-zrange-integrations)

      - 🧩 [React Hook Form](#-react-hook-form-1)
        - 🔌 [Installation & Import](#-installation--import-1)
        - 📦 [Basic Example](#-basic-example)
        - 🧱 [ZRangeField API](#-zrangefield-api)
        - 🔄 [Update Behavior (`updateTiming`)](#-update-behavior-updatetiming)
        - 🧪 [Validation](#-validation-1)
        - 🧩 [Yup / Zod Validation](#-yup--zod-validation-1)
        - 🎨 [Error Rendering](#-error-rendering)
        - 🧭 [Summary (ZRange + RHF)](#-summary-zrange--rhf)

    - 🧭 [Summary (ZRange)](#-summary-zrange)

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

# 🎯 ZDrop

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
- ✔ **Two interchangeable positioning & height strategies**
- ✔ Full styling override via `styleClasses`
- ✔ Returns raw values or full objects
- ✔ Lightweight Rollup bundle
- ✔ Part of the evolving **zComponents** library

---

## 📦 Basic Usage (ZDrop)

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

## 🧩 Multiple Select Example

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

## 🎨 Custom Rendering

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

## 🧠 Object Options Example

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

## 🔍 Search Features

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

## 📦 Additional Behaviors & Notes

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

---

## 📌 Dropdown Positioning & Height Management

ZDrop supports **two interchangeable strategies** for determining dropdown position and list height.

> ⚠️ These strategies are **mutually exclusive** — use **only one at a time**.

---

### 🧱 Strategy A — Reference Element Based (Container-aware)

#### `referenceElementClassName`

#### `positionToReferenceElement`

This strategy constrains the dropdown to a specific **DOM container**.

```tsx
<ZDrop
  referenceElementClassName="container"
  positionToReferenceElement="bottom"
/>
```

##### How it works

- Dropdown measures available space **inside the reference element**
- Prevents overflow outside scrollable or clipped containers
- Automatically switches top / bottom if space is insufficient

##### When to use

- Scrollable layouts
- Modals
- Side panels
- Any constrained container

---

### 🌍 Strategy B — Auto Height (Viewport-based)

#### `isAutoHeightEnabled`

#### `autoHeightPosition`

This strategy uses the **browser viewport** as the reference.

```tsx
<ZDrop isAutoHeightEnabled autoHeightPosition="bottom" />
```

##### How it works

- On open, ZDrop checks available space:
  - above the control
  - below the control
- Chooses the best direction (`top` / `bottom`)
- Automatically **limits list height** to fit the visible viewport
- Enables scrolling when needed

##### When to use

- Standard page layouts
- Fullscreen views
- No specific container boundaries

---

### 🔁 Strategy Comparison

| Feature                     | Reference Element | Auto Height |
| --------------------------- | ----------------- | ----------- |
| Context                     | Custom container  | Viewport    |
| Prevents container overflow | ✅                | ❌          |
| Auto height adjustment      | ✅                | ✅          |
| Requires DOM class          | ✅                | ❌          |
| Best for                    | Modals, panels    | Pages       |

---

### 📐 listMaxHeightLimiter

```tsx
listMaxHeightLimiter={300}
```

- Applies to **both strategies**
- Maximum list height in pixels
- Enables scroll if exceeded
- Minimum enforced: `50px`

### ⚠️ Important Rules

- ❌ Do NOT combine:
  - `referenceElementClassName` with `isAutoHeightEnabled`
  - `positionToReferenceElement` with `autoHeightPosition`
- ✔ Only **one strategy** should be active

---

---

## 🧼 Clear Behavior (`clear` prop)

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
///>
```

---

## 📭 `noDataContent`

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

## 📌 Dropdown Positioning & Max Height

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

## 🎛 Props Reference

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
  onBlur?: FocusEventHandler<HTMLDivElement>;
  onClear?: Function;
  valueRenderer?: ValueRenderer;
  optionRenderer?: OptionRenderer;
  expandToggleRenderer?: ExpandToggleRenderer;
  clearIcon?: ReactElement;
  noDataContent?: string | ReactElement;

  // Strategy A
  referenceElementClassName?: string;
  positionToReferenceElement?: "top" | "bottom";

  // Strategy B
  isAutoHeightEnabled?: boolean;
  autoHeightPosition?: "top" | "bottom";

  listMaxHeightLimiter?: number;
  styleClasses?: StyleClasses;
}
```

---

## 🎨 Styling Reference

zcomponents-ui ships with a compiled CSS file containing all default styles.  
You need to import it once in your application (usually in your main entry file).

```ts
import "zcomponents-ui/styles.css";
```

The default styles are intentionally minimal and unobtrusive — the component does not impose a visual identity.  
The goal of ZDrop is to stay out of the way and give you full freedom in shaping your own look & feel, whether through custom CSS, SCSS Modules, Tailwind, or the styleClasses override system.

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

## 📤 Events

### onChange

```ts
(value: ZDropValue) => void
```

### onClear

Triggered when the clear button is pressed.

---

## 🔌 ZDrop Integrations

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

### 🧱 ZDropField API

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

### 🔄 Value Mapping: `onChangeTransform` & `valueSelector`

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

### 🧪 Validation

#### Built-in RHF rules

```tsx
<ZDropField name="survivor" rules={{ required: "Survivor is required" }} />
```

#### Validate only on submit

```tsx
useForm({
  mode: "onSubmit",
  reValidateMode: "onSubmit",
});
```

---

### 🧩 Yup / Zod Validation

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

### 🧭 Summary

- 🔌 Easy integration with react-hook-form
- 🔄 Full control over value mapping
- ✔ Supports Yup/Zod
- 🎨 Customizable error rendering

---

# 🎯 ZDropButton

**ZDropButton** is an advanced button-based dropdown built using the **Compound Components** pattern.  
It provides full control over the dropdown structure: toggle, search, content positioning, list, and list items.

The component is designed for:

- action menus
- icon-based selectors
- navigation dropdowns
- highly customized UIs (e.g. game, admin, dashboard)

---

## ✨ Features (ZDropButton)

- ✔ Compound Components API
- ✔ `title` **or** `toggleIcon` as trigger (at least one required)
- ✔ Callbacks: `onToggle`, `onSelect`, `onHide`, `onSearch`
- ✔ Optional outside click handling
- ✔ Flexible dropdown positioning
- ✔ List items as actions or links
- ✔ Active item state handling
- ✔ Type-safe API with compile-time enforcement

---

## 🧩 Compound Components Architecture

ZDropButton works using a **shared internal context** that is consumed by all child components.

Available components:

- `ZDropButton`
- `ZDropButton.Toggle`
- `ZDropButton.Search`
- `ZDropButton.Content`
- `ZDropButton.List`
- `ZDropButton.Item`

This approach allows you to freely compose the dropdown structure without manually passing props down the tree.

---

## 📦 Basic Usage

```tsx
<ZDropButton
  title="Select option"
  options={options}
  onSelect={(index) => console.log(index)}
>
  <ZDropButton.Content position="bottom left">
    <ZDropButton.List>
      {options.map((o, index) => (
        <ZDropButton.Item key={o.id} index={index} title={o.label} />
      ))}
    </ZDropButton.List>
  </ZDropButton.Content>
</ZDropButton>
```

---

## ✅ Toggle Requirements

ZDropButton **requires at least one** of the following props:

- `title: string | number`
- `toggleIcon: ReactElement`

Valid configurations:

```tsx
<ZDropButton title="Menu" options={options} />
```

```tsx
<ZDropButton toggleIcon={<Icon />} options={options} />
```

```tsx
<ZDropButton title="Profile" toggleIcon={<Avatar />} options={options} />
```

This rule is enforced at **TypeScript compile-time**.

---

## 🔍 Search — `ZDropButton.Search`

Search is optional and works in a **controlled mode** — filtering logic is handled by the consumer.

```tsx
<ZDropButton onSearch={handleSearch} ...>
  <ZDropButton.Search
    placeholder="Search..."
    clearIcon={<ClearIcon />}
    shouldFocusOnOpen
  />
</ZDropButton>
```

### Props

```ts
export interface ZDropButtonSearchProps {
  placeholder?: string;
  searchIcon?: ReactElement;
  clearIcon?: ReactElement;
  searchClassName?: string;
  shouldFocusOnOpen?: boolean;
}
```

---

## 📌 Dropdown Content & Positioning

The dropdown panel is rendered using `ZDropButton.Content`.

```tsx
<ZDropButton.Content position="bottom right">...</ZDropButton.Content>
```

### Available positions

- `left`
- `right`
- `top`
- `bottom`
- `top left`
- `top right`
- `bottom left`
- `bottom right`

---

## 📃 List & Items

### ZDropButton.List

Wrapper component for list items.

```tsx
<ZDropButton.List>...</ZDropButton.List>
```

---

### ZDropButton.Item

```tsx
<ZDropButton.Item
  index={index}
  title="Settings"
  Icon={<SettingsIcon />}
  isActive={isSelected}
/>
```

#### Props

```ts
export interface ZDropButtonListItemProps {
  index: number;
  title: string | number;
  Icon?: JSX.Element;
  urlPath?: string;
  className?: string;
  linkAs?: "a" | React.ComponentType;
  isActive?: boolean;
}
```

---

### 🔗 Link Mode

If `urlPath` is provided, the list item behaves like a link.  
You can override the underlying element using `linkAs` (e.g. React Router `Link`).

```tsx
<ZDropButton.Item
  index={0}
  title="Settings"
  urlPath="/settings"
  linkAs={Link}
/>
```

---

## 🧼 Outside Click Handling

```ts
isOutsideClickActive?: boolean;
```

- `true` — dropdown closes when clicking outside
- `false` — full manual control

---

## 🎛 ZDropButton Props Reference

```ts
export interface ZDropButtonBaseProps {
  options: any[];
  className?: string;
  toggleClassName?: string;
  children: ReactNode;

  onToggle?: Function;
  onSelect?: (selectedItemIndex: number) => void;
  onHide?: Function;

  onSearch?: (e: ChangeEvent<HTMLInputElement>) => void;
  isOutsideClickActive?: boolean;
}

export type ZDropButtonProps =
  | {
      title: string | number;
      toggleIcon?: ReactElement;
    }
  | {
      title?: string | number;
      toggleIcon: ReactElement;
    };
```

---

## 📤 Events (ZDropButton)

### `onToggle`

Triggered when the dropdown is opened or closed.

### `onSelect(index)`

Triggered when a list item is selected.

### `onHide`

Triggered when the dropdown is closed.

### `onSearch(event)`

Triggered on search input change.

---

## 🧭 Summary (ZDropButton)

- ZDropButton is a **highly flexible dropdown-button**
- Compound Components provide full structural control
- Type-safe API (`title` OR `toggleIcon`)
- Ideal for advanced and custom UI scenarios

---

# 🎚 ZRange

**ZRange** is an advanced **dual-thumb range slider** designed for selecting numeric intervals with high precision and full control.

It is built for use cases where a simple input is not enough:
filters, price ranges, metrics, performance tuning, dashboards, and data-heavy UIs.

---

## ✨ Features (ZRange)

- ✔ Dual-thumb range selection (min / max)
- ✔ Fully controlled value model
- ✔ Step-based snapping
- ✔ Safe min/max swapping logic
- ✔ Optional non-linear scaling
- ✔ Dynamic indicator for active thumb
- ✔ Optional units with automatic formatting
- ✔ Mouse & touch support
- ✔ Custom icons for thumbs and indicators
- ✔ Resize-aware layout (ResizeObserver)
- ✔ Modular internal architecture
- ✔ Full styling control via class overrides
- ✔ Zero external dependencies

---

## 📦 Basic Usage (ZRange)

```tsx
import { ZRange } from "zcomponents-ui";

<ZRange
  name="price"
  min={0}
  max={1000}
  step={10}
  value={{ min: 100, max: 700 }}
  onChange={(value) => console.log(value)}
/>;
```

---

## 📐 Range Logic & Behavior

### Dual input model

ZRange internally manages **two synchronized inputs**:

- minimum value
- maximum value

The component automatically:

- prevents invalid ranges
- swaps active thumb when crossing occurs
- normalizes output values (`min ≤ max`)

### Controlled updates

- `onChange` → fired **during interaction**
- `onSelect` → fired **after interaction ends**

This allows:

- live UI updates
- deferred filtering / API calls

---

## 📊 Scaling & Units

### Non-linear scaling

ZRange supports custom **non-linear scales** via a string-based function schema.

```tsx
scale = "Math.log10(x + 1)";
```

The scale is applied only to **display & indicator logic** —  
raw values remain linear and predictable.

---

### Units & formatting

```tsx
unitDivisors={[1, 1000, 1000000]}
unitList={[
  { unit: "H/s", fractionDigits: 0 },
  { unit: "kH/s", fractionDigits: 1 },
  { unit: "MH/s", fractionDigits: 2 },
]}
```

ZRange automatically selects the best unit
and formats values accordingly.

---

## 🎨 Styling (ZRange)

ZRange exposes **class-based overrides** for every internal element.

```ts
export interface ZRangeStyleClasses {
  container?: string;
  label?: string;

  input?: string;
  inputActive?: string;

  trackContainer?: string;
  trackRange?: string;
  trackSelected?: string;

  indicator?: string;
  indicatorMin?: string;
  indicatorMax?: string;
  indicatorValue?: string;
  indicatorIcon?: string;

  sliderValue?: string;
}
```

Default styles are included via:

```ts
import "zcomponents-ui/styles.css";
```

---

## 🎛 Props Reference (ZRange)

```ts
export interface ZRangeProps {
  value: { min: number; max: number };
  name: string;

  min: number;
  max: number;
  step?: number;

  scale?: string;

  unitDivisors?: number[];
  unitList?: {
    unit: string;
    fractionDigits: number;
  }[];

  label?: string | ReactNode;

  onChange?: Function;
  onSelect?: Function;

  icons?: {
    thumbMin?: ReactNode;
    thumbMax?: ReactNode;
    indicatorMin?: ReactNode;
    indicatorMax?: ReactNode;
  };

  stylesClasses?: ZRangeStyleClasses;

  isIndicatorUnitHidden?: boolean;
}
```

---

## 🔌 ZRange Integrations

## 🧩 React Hook Form

`ZRange` can be used standalone, but it also supports **react-hook-form** via a dedicated wrapper: **`ZRangeField`**.

`ZRangeField`:

- manages `value` internally through RHF
- updates form state on change and/or on select (configurable)
- displays validation errors (built-in RHF rules + Yup/Zod resolvers)
- ensures the form always receives a normalized `{ min, max }` object

---

### 🔌 Installation & Import

```bash
npm install zcomponents-ui react-hook-form
```

```tsx
import { ZRangeField } from "zcomponents-ui/react-hook-form";
```

---

### 📦 Basic Example

```tsx
import { useForm } from "react-hook-form";
import { ZRangeField } from "zcomponents-ui/react-hook-form";

type FormValues = {
  price: { min: number; max: number };
};

export function ExampleForm() {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      price: { min: 100, max: 700 },
    },
  });

  const price = watch("price");

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <ZRangeField<FormValues>
        control={control}
        name="price"
        min={0}
        max={1000}
        step={10}
        label="Price range"
      />

      <pre>{JSON.stringify(price, null, 2)}</pre>

      <button type="submit">Submit</button>
    </form>
  );
}
```

---

### 🧱 ZRangeField API

`ZRangeField` accepts nearly all props of `ZRange`, except for:

| Removed from ZRangeField | Why                       |
| ------------------------ | ------------------------- |
| `value`                  | Managed internally by RHF |
| `onChange`               | Controlled by RHF         |
| `onSelect`               | Controlled by RHF         |
| `name` (ZRange prop)     | Must match RHF schema     |

Instead, it adds RHF-specific props and error UI configuration.

```ts
import type {
  Control,
  FieldValues,
  FieldPath,
  RegisterOptions,
} from "react-hook-form";
import type { ZRangeProps, ZRangeRangeValue } from "zcomponents-ui";

export type ZRangeFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = Omit<ZRangeProps, "value" | "onChange" | "onSelect" | "name"> & {
  control: Control<TFieldValues>;
  name: TName;

  rules?: RegisterOptions<TFieldValues, TName>;
  defaultValue?: ZRangeRangeValue;
  shouldUnregister?: boolean;

  updateTiming?: "onChange" | "onSelect";

  onValueChange?: (value: ZRangeRangeValue, fieldName: string) => void;
  onValueSelect?: (value: ZRangeRangeValue, fieldName: string) => void;

  hideError?: boolean;
  errorClassName?: string;
  errorRenderer?: (message: string) => React.ReactNode;
};
```

---

### 🔄 Update Behavior: `updateTiming`

- `onChange` → update RHF during interaction
- `onSelect` → update RHF when interaction ends

```tsx
<ZRangeField<FormValues>
  control={control}
  name="price"
  min={0}
  max={1000}
  step={10}
  updateTiming="onSelect"
/>
```

---

### 🧪 Validation

```tsx
<ZRangeField<FormValues>
  control={control}
  name="price"
  min={0}
  max={1000}
  step={10}
  rules={{
    validate: (v) => v.min <= v.max || "Min must be <= max",
  }}
/>
```

---

### 🧩 Yup / Zod Validation

Zod and Yup resolvers are fully supported.

---

### 🎨 Error Rendering

```tsx
<ZRangeField<FormValues>
  control={control}
  name="price"
  min={0}
  max={1000}
  step={10}
  errorRenderer={(message) => <div style={{ color: "crimson" }}>{message}</div>}
/>
```

---

## 🧭 Summary (ZRange)

- 🎚 Designed for **advanced numeric ranges**
- 📐 Safe and predictable min/max behavior
- 📊 Supports non-linear scales & units
- 🎨 Fully stylable without breaking internals
- 🧩 Modular, typed, zero-dependency design
- 📚 Fully documented in Storybook
- Easy RHF integration via `ZRangeField`
- Predictable `{ min, max }` form value
- Supports Yup / Zod
- Customizable validation UI

---

# 📄 License

MIT © Piotr Nowosławski
