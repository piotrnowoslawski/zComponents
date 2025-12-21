# zComponents UI

zComponents is a React UI component library focused on **predictability**, **explicit control**,
and **zero runtime dependencies**.

This documentation is intended for **GitHub users and contributors**.
Interactive examples and full API details live in Storybook.

---

## Documentation map

This repository uses a layered documentation approach.

### Start here

- [Mental model](docs/mental-model.md)  
  Design principles, architectural decisions, and common pitfalls.

### Component guides

- [ZDrop](docs/zdrop.md)  
  Advanced select usage, positioning strategies, controlled behavior.

- [ZDropButton](docs/zdrop-button.md)  
  Compound components, structural rules, and composition patterns.

- [ZRange](docs/zrange.md)  
  Range logic, performance considerations, scaling, and units.

- [Styling & theming](docs/styling.md)  
  How to import default CSS and override component classes safely.

### Integrations

- [React Hook Form](docs/react-hook-form.md)  
  Controlled wrappers, value mapping, and validation notes.

### Interactive documentation

- Storybook: https://piotrnowoslawski.github.io/zComponents

---

## How to read this repository

1. Start with the **Mental model** to understand design decisions.
2. Read component guides in `docs/` for usage patterns and edge cases.
3. Use Storybook to explore interactive behavior and full API.
4. Refer to source code only after understanding the concepts.

---

## Repository structure

```text
github/
  README.md                # GitHub-facing documentation (this file)
  docs/
    mental-model.md
    zdrop.md
    zdrop-button.md
    zrange.md
    react-hook-form.md
```

---

## Non-obvious notes

- Controlled components require updating `value` after `onChange`.
- For object options, `valueKey` must be stable and unique.
- ZDrop positioning strategies are mutually exclusive.
- Prefer `onSelect` over `onChange` in ZRange for expensive side effects.

---

## License

MIT © Piotr Nowosławski
