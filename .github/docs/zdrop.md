# ZDrop

Advanced dropdown/select component for complex UI scenarios.

ZDrop is built for cases where native `<select>` or simple UI libraries are not enough: object options, complex forms, custom rendering, container constraints, and large datasets.

---

## When to use

Use ZDrop when you need:

- object-based options with `valueKey` / `labelKey`
- multi-select with custom value rendering
- search (optionally debounced)
- reliable behavior inside modals or scroll containers
- explicit control over value shape and returned data
- dropdown positioning that adapts to available space

---

## Mental model (read once)

ZDrop can be used:

- **uncontrolled**: you don’t pass `value`, you only handle `onChange`
- **controlled**: you pass `value` and must update it after `onChange`

If you pass `value` but don’t update it, the UI can look “stuck” — that is expected for controlled components.

---

## Value contract (what `onChange` returns)

The returned shape depends on configuration.

Typical outcomes:

- `isMultiple = false`  
  → a single selected value (or `null`, depending on usage)
- `isMultiple = true`  
  → **always an array**
- `shouldReturnObjectOnChange = true`  
  → returns selected **object(s)** instead of primitives

Tip: Decide early whether your app state stores IDs (primitives) or full objects.

---

## Basic usage

```tsx
import { ZDrop } from "zcomponents-ui";

const options = ["Hiroshi", "Harper", "Karl"];

<ZDrop
  name="survivor"
  options={options}
  placeholder="Select a survivor"
  onChange={(value) => console.log(value)}
/>;
```

---

## Multiple selection

```tsx
<ZDrop
  name="weapons"
  options={["Swords", "Bows", "Shotguns"]}
  isMultiple
  onChange={(values) => console.log(values)}
/>
```

Notes:

- Value is always an array in `isMultiple` mode.
- Clearing should reset to an empty array when controlled.

---

## Object options

```tsx
const options = [
  { id: 1, name: "Hiroshi" },
  { id: 2, name: "Harper" },
];

<ZDrop
  name="survivor"
  options={options}
  valueKey="id"
  labelKey="name"
  shouldReturnObjectOnChange
/>;
```

Non-obvious rules:

- `valueKey` must be a **unique, stable primitive**
- Do not change `valueKey` / `labelKey` between renders
- Returning objects introduces reference-equality concerns

Best practice:

- Keep `options` stable
- Store IDs in state instead of full objects

---

## Controlled usage

```tsx
const [value, setValue] = useState<string | null>(null);

<ZDrop value={value} onChange={setValue} />;
```

Symptom: UI does not update after selection  
Cause: controlled value not updated  
Fix: update state in `onChange`

---

## Clear behavior

```ts
type Clear = "always" | "whenChanged" | "whenSearched" | "none";
```

Notes:

- `onClear` is not the same as `onChange(null)`
- Decide explicitly what clearing means in your UX
- Multi-select clearing should result in `[]`

---

## Search behavior

```tsx
<ZDrop
  isSearchable
  searchFilterDelay={200}
  searchFilter={(option, search) =>
    option.toLowerCase().includes(search.toLowerCase())
  }
/>
```

Notes:

- `searchFilter` must be pure
- Debounce affects filtering, not typing
- For large datasets, filter upstream

---

## Custom rendering

ZDrop supports:

- `optionRenderer`
- `valueRenderer`
- `expandToggleRenderer`

Notes:

- Memoize renderers for large lists
- Avoid heavy logic inside renderers
- Use stable keys in multi-select

---

## Positioning strategies (mutually exclusive)

### Strategy A — Reference element based

Use for modals and scroll containers.

```tsx
<ZDrop referenceElementClassName="container" />
```

Pitfalls:

- Reference element must exist and be unique
- Class applied to multiple elements breaks calculations

---

### Strategy B — Viewport auto height

Use for standard layouts.

```tsx
<ZDrop isAutoHeightEnabled />
```

Do not combine with reference-element props.

---

## Common production issues

### Dropdown clipped

Cause:

- Parent has `overflow: hidden/auto`

Fix:

- Use reference-element strategy

---

### Wrong selection with object options

Causes:

- Non-unique `valueKey`
- Changing key type (`1` vs `"1"`)
- Recreated options array

Fix:

- Stable keys
- Memoized options
- Prefer ID storage

---

## Performance recommendations

- Memoize `options`
- Memoize renderers
- Keep `onChange` lightweight
- Filter large datasets upstream
