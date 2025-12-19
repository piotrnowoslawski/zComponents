# 📘 zComponents — Growing React Component Library

![npm version](<https://img.shields.io/npm/v/zcomponents-ui?color=rgb(25,150,90)&style=flat-square>)
![npm downloads](https://img.shields.io/npm/dm/zcomponents-ui?color=blue&style=flat-square)
![license](https://img.shields.io/npm/l/zcomponents-ui?style=flat-square)
[![storybook](https://img.shields.io/badge/Storybook-Docs%20Site-FF4785?style=flat-square)](https://piotrnowoslawski.github.io/zComponents)

---

**zComponents UI** is a lightweight React component library focused on **flexible dropdowns and selection components**, built with TypeScript and zero external dependencies.

👉 Full documentation and live examples are available in Storybook.

🔗 **Storybook:**  
https://piotrnowoslawski.github.io/zComponents

---

## ✨ Features

- ✅ Written in **TypeScript**
- ✅ **Zero dependencies**
- ✅ SCSS Modules styling
- ✅ Type-safe APIs
- ✅ Designed for advanced UI use cases
- ✅ Interactive Storybook documentation

---

## 📦 Installation

```bash
npm install zcomponents-ui
# or
yarn add zcomponents-ui
# or
pnpm add zcomponents-ui
```

---

## 🎯 Components Overview

### ZDrop

Advanced dropdown / select component with full control over behavior and rendering.

**What it does:**

- Single & multiple select
- Searchable options
- Supports primitive and object-based options
- Smart dropdown positioning (top / bottom)
- Automatic list height adjustment
- Custom renderers for options, values, and toggle
- Type-safe value handling

👉 Best for forms, filters, and complex selects.

---

### ZDropButton

Button-based dropdown built with the **Compound Components** pattern.

**What it does:**

- Dropdown menu triggered by button
- Supports title and/or icon as toggle
- Custom dropdown content structure
- Optional search input
- Flexible content positioning
- List items as actions or links
- Fully controlled selection logic

👉 Best for menus, navigation, and action selectors.

---

### ZRange

Advanced **range slider** component for selecting numeric intervals with full control over behavior and formatting.

**What it does:**

- Dual-thumb range selection (min / max)
- Fully controlled value state
- Step-based snapping
- Optional non-linear scaling
- Dynamic value indicator for active thumb
- Optional units with automatic formatting
- Mouse & touch interaction support
- Custom icons for thumbs and indicators
- Fully stylable internal structure

👉 Best for numeric filters, price ranges, metrics selection, and advanced sliders.

---

## 🎨 Styling

Default styles are provided as a single CSS file:

```ts
import "zcomponents-ui/styles.css";
```

Styles are intentionally minimal and easy to override using:

- custom CSS
- SCSS Modules
- utility frameworks (e.g. Tailwind)

---

## 📚 Documentation

Full API documentation, examples, and usage patterns are available in Storybook:

🔗 **https://piotrnowoslawski.github.io/zComponents**

---

## 📄 License

MIT © Piotr Nowosławski
