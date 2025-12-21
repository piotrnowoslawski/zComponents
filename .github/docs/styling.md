# Styling & Theming

zComponents ships with **minimal default styles** as a compiled CSS file.
These styles provide layout, positioning, and interaction behavior, but do not impose a visual identity.

You are expected to either:

- use the default styles as a baseline and override them, or
- fully replace styling via class overrides.

---

## Import styles (required)

You must import the default styles **once** in your application.

```ts
import "zcomponents-ui/styles.css";
```

If this import is missing, components will render without layout and interaction styles
(e.g. dropdowns may overlap, ranges may not align correctly).

---

## Recommended styling approaches

### 1. Class overrides (recommended)

Most zComponents expose a `styleClasses` / `stylesClasses` prop.
This allows you to override internal elements explicitly without relying on fragile selectors.

This is the **most stable and future-proof approach**.

---

### 2. Styling composed structure (ZDropButton)

ZDropButton is composition-first.
You are expected to style your own structure using:

- `className`
- `toggleClassName`
- wrappers inside `Content` / `List`

---

### 3. Full replacement

If your design system requires complete control:

- override all exposed class slots
- treat default styles as optional scaffolding

---

## CSS ordering and conflicts

Common issues:

- importing `styles.css` after your app styles may override your theme
- importing it before resets/normalizers may cause spacing inconsistencies

Recommended order:

1. CSS reset / normalize
2. `zcomponents-ui/styles.css`
3. application / theme styles

---

## Framework-specific notes

### Next.js (App Router)

Import global CSS in `app/layout.tsx`:

```ts
import "zcomponents-ui/styles.css";
```

### Vite / CRA

Import in `main.tsx` or `index.tsx`.

---

## Troubleshooting: components look broken

Checklist:

- Is `zcomponents-ui/styles.css` imported exactly once?
- Does your bundler support CSS imports from `node_modules`?
- Are CSS Modules configured to allow global CSS?
- Is the CSS file present in the final bundle?

Inspect the DOM and verify expected class names exist in computed styles.

---

## Philosophy

zComponents styles are intentionally minimal.
The library prioritizes **behavior and predictability** over visual opinion.

You are encouraged to adapt components to your design system
instead of adapting your design system to the components.
