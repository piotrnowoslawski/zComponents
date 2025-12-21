# ZDropButton

Button-driven dropdown built using the Compound Components pattern.

---

## When to use

Use ZDropButton for:
- action menus
- navigation dropdowns
- custom dropdown layouts

---

## Basic usage

```tsx
import { ZDropButton } from "zcomponents-ui";

<ZDropButton title="Menu" options={options}>
  <ZDropButton.Content position="bottom right">
    <ZDropButton.List>
      <ZDropButton.Item index={0} title="Settings" />
    </ZDropButton.List>
  </ZDropButton.Content>
</ZDropButton>;
```

---

## Non-obvious rules

- Either `title` or `toggleIcon` is required.
- Items are selected by index, not value.
- `options` are metadata, not rendered automatically.
