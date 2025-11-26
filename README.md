# 📘 zComponents — Growing React Component Library

**Lightweight, typed, customizable UI building blocks for React.**

![npm version](<https://img.shields.io/npm/v/zcomponents-ui?color=rgb(25,150,90)&style=flat-square>)
![npm downloads](https://img.shields.io/npm/dm/zcomponents-ui?color=blue&style=flat-square)
![license](https://img.shields.io/npm/l/zcomponents-ui?style=flat-square)
[![storybook](https://img.shields.io/badge/Storybook-Docs%20Site-FF4785?style=flat-square)](https://piotrnowoslawski.github.io/zComponents)

---

# 🎯 ZDrop — Dropdown / Select Component

### ✔ Flexible option model

Support for `string`, `number`, and full `object` entries.

### ✔ Full control over rendering

Perfect for tagging systems, chips, advanced UI states.

### ✔ Flexible behavior and layout adaptation

Boundary detection, list height limit, smart direction switching.

### ✔ Custom search logic

Inject your own filter function with full access to options.

---

## 📚 Storybook Documentation

All components in the **zComponents UI Library** come with interactive examples and full API documentation.

🔗 **Live Storybook:**  
https://piotrnowoslawski.github.io/zComponents

The Storybook is deployed automatically from `main` using GitHub Pages.

---

# 🚀 Installation

```bash
npm install zcomponents
```

---

# 📦 Quick Usage

```tsx
import { ZDrop } from "zcomponents-ui";

const options = ["Hiroshi", "Harper", "Karl"];

export default () => (
  <ZDrop
    name="survivor"
    options={options}
    placeholder="Pick someone"
    onChange={(val) => console.log(val)}
  />
);
```

---

# 🔍 Search

### Built-in search

```tsx
isSearchable;
```

### Custom search

```tsx
searchFilter={({ options, currentValue, labelKey }) =>
  options.filter((o) =>
    String(o[labelKey]).toLowerCase().includes(currentValue.toLowerCase())
  )
}
```

---

# 🧠 Object Options Example

```tsx
<ZDrop
  name="survivor"
  options={[{ id: 1, name: "Hiroshi" }]}
  valueKey="id" // default: "value"
  labelKey="name" // default: "label"
  shouldReturnObjectOnChange
/>
```

---

# 🎨 Customize Everything

```tsx
optionRenderer={(option, isSelected) => (
  <div className={isSelected ? "selected" : ""}>{option}</div>
)}
```

```tsx
valueRenderer={({option, onRemove }) => (
  <span onClick={onRemove} style={{ marginRight: 8 }}>
    ❌ {option}
  </span>
)};
```

---

# 📚 Props (Short)

```ts
valueKey?: string; // default: "value"
labelKey?: string; // default: "label"
isSearchable?: boolean;
searchFilter?: SearchFilter;
isMultiple?: boolean;
listMaxHeightLimiter?: number;
```

---

# 📄 License

MIT © Piotr Nowosławski
