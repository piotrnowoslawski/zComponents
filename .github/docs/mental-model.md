# Mental model

This document explains how to think about zComponents and why some APIs are intentionally explicit.

---

## Explicit over implicit

zComponents avoids hidden behavior. If something affects logic or layout, it is exposed as a prop.

This reduces magic and makes edge cases easier to reason about.

---

## Controlled-first mindset

Components can be uncontrolled, but controlled usage is always supported and predictable.

If you pass a `value` prop:
- the component will call `onChange`
- you are responsible for updating the value

If the value is not updated, the UI will not change. This is expected behavior.

---

## Composition over configuration

Where possible:
- data is passed as options
- rendering is handled via renderers or compound components

This allows custom layouts without forking the library.

---

## Separation of concerns

- README → repository overview and navigation
- docs/ → concepts, patterns, and pitfalls
- Storybook → interactive behavior and API reference

---

## Common pitfalls checklist

- Default styles imported?
- Controlled value updated after `onChange`?
- Stable `valueKey` for object options?
- Mutually exclusive props not mixed?
