# Styling & Theming

zComponents ships with **minimal, behavior-focused default styles**.
They handle layout, positioning, interaction states and accessibility,
but intentionally **do not impose a visual identity**.

> ⚠️ **Styling Notes**
>
> All default styles are **purely conventional** and serve only as a structural scaffold for the components.  
> Their color system is based on **`:where(...)` selectors**, giving them **zero specificity**.  
> This is intentional: the library provides **behavior and layout**, not a visual identity.
>
> Style components **exactly as you want, exactly as you need**, without fighting selector overrides or relying on `!important`.  
> The defaults cover what truly matters — **positioning, layout, and internal element cooperation** — while all visual aspects are entirely up to you.

You are expected to either:

- use the provided styles as a baseline and override them, or
- import styles only for selected components, or
- fully replace styling via class overrides.

This gives you full control over look & feel without fighting the library.

---

## Importing styles

### Option A — Import all styles (simplest)

Import **once** in your application entry point:

```ts
import "zcomponents-ui/styles.css";
```

This includes styles for **all components**:
`ZDrop`, `ZDropButton`, and `ZRange`.

Use this option if:

- you use multiple components
- bundle size is not a concern
- you want everything to work out of the box

---

### Option B — Import per‑component styles (recommended for libraries & apps)

You can import styles **only for components you use**:

```ts
import "zcomponents-ui/styles/zdrop";
import "zcomponents-ui/styles/zdropbutton";
import "zcomponents-ui/styles/zrange";
```

Each import loads **only one CSS file** and has no JavaScript side effects.

Use this option if:

- you care about minimal CSS
- you ship your own design system
- you want explicit control over styling

---

## Important

If **no styles are imported**, components will render **without layout and interaction styling**
(e.g. dropdowns may overlap, range thumbs may not align correctly).

Styles must be imported **exactly once**.

---

## Recommended styling approaches

### 1. Class overrides (recommended)

Most zComponents expose a `styleClasses` prop.
This allows you to override internal elements explicitly without relying on fragile selectors.

This is the **most stable and future‑proof approach**.

Example:

```tsx
<ZRange
  styleClasses={{
    trackSelected: "my-range-track",
    indicator: "my-range-indicator",
  }}
/>
```

---

### 2. Styling composed structure (ZDropButton)

`ZDropButton` is **composition‑first**.
You are expected to style your own structure using:

- `className`
- `toggleClassName`
- wrappers inside `Content`, `List`, `Item`

This gives you full layout control without hidden DOM constraints.

---

### 3. Full replacement

If your design system requires complete control:

- override all exposed class slots
- ignore default visual rules
- treat zComponents styles as optional scaffolding

---

## CSS ordering & conflicts

Common issues:

- importing zComponents styles **after** your app styles may override your theme
- importing them **before** resets may cause spacing inconsistencies

Recommended order:

1. CSS reset / normalize
2. `zcomponents-ui` styles (global or per‑component)
3. application / theme styles

---

## Framework‑specific notes

### Next.js (App Router)

Import global CSS in `app/layout.tsx`:

```ts
import "zcomponents-ui/styles.css";
```

Or per‑component:

```ts
import "zcomponents-ui/styles/zrange";
```

---

### Vite / CRA

Import in `main.tsx` or `index.tsx`.

---

## Troubleshooting: components look broken

Checklist:

- Are styles imported exactly once?
- Are you importing the correct per‑component file?
- Does your bundler allow CSS imports from `node_modules`?
- Is the CSS file present in the final bundle?

Inspect the DOM and verify expected class names exist in computed styles.

---

## Philosophy

zComponents styles are intentionally minimal.
The library prioritizes **behavior, predictability, and composability**
over visual opinion.

You are encouraged to adapt components to your design system —
not adapt your design system to the components.
