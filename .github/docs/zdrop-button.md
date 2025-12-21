# ZDropButton

Button-based dropdown built using the **Compound Components** pattern.

ZDropButton is intentionally more explicit than typical dropdown components.
Instead of hiding structure behind props, it exposes building blocks that let you fully control layout, behavior, and semantics.

---

## When to use

Use ZDropButton when you need:

- action menus (settings, profile, context menus)
- navigation dropdowns (links, mixed actions)
- icon-based or avatar-based toggles
- custom dropdown layouts (headers, groups, separators)
- full control over markup and composition

Avoid ZDropButton if:

- you just need a simple select-like input (use **ZDrop** instead)
- you expect automatic rendering from an `options` array

---

## Mental model (read once)

ZDropButton follows **composition over configuration**.

This means:

- the component does **not** decide how the dropdown looks
- you explicitly compose toggle, content, list, and items
- `options` are metadata, not a rendering source

---

## Basic usage

```tsx
import { ZDropButton } from "zcomponents-ui";

const options = [
  { id: "settings", label: "Settings" },
  { id: "logout", label: "Log out" },
];

<ZDropButton
  title="Menu"
  options={options}
  onSelect={(index) => console.log(index)}
>
  <ZDropButton.Content position="bottom right">
    <ZDropButton.List>
      {options.map((o, index) => (
        <ZDropButton.Item key={o.id} index={index} title={o.label} />
      ))}
    </ZDropButton.List>
  </ZDropButton.Content>
</ZDropButton>;
```

---

## Toggle requirements (non-obvious)

ZDropButton **requires at least one** of:

- `title`
- `toggleIcon`

This rule is enforced at **TypeScript compile time**.

---

## Options vs rendering

The `options` prop:

- does **not** render items automatically
- exists to provide item count and selection index

Rendering is fully controlled by compound components.

---

## Selection model (index-based)

Selection is **index-based**, not value-based.

Implications:

- keep `options` order stable
- map index to domain value manually

---

## Outside click behavior

```ts
isOutsideClickActive?: boolean;
```

- `true`: dropdown closes on outside click
- `false`: manual close handling required

---

## Content positioning

Controlled via:

```tsx
<ZDropButton.Content position="bottom right">
```

Positioning is visual only (no collision detection).

---

## List and item composition

`ZDropButton.Item` requires a stable `index`.
Duplicate indices break selection logic.

---

## Link mode

Providing `urlPath` makes the item behave as a link.
Navigation may not automatically close the dropdown.

---

## Accessibility notes

- Click-based interaction guaranteed
- Focus management inside content is consumer responsibility

---

## Performance notes

- Memoize `options`
- Avoid heavy inline render logic

---

## Common mistakes

- Expecting `options` to auto-render items
- Indices out of sync with rendered order
