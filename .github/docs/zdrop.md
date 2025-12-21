# ZDrop

Advanced dropdown/select component for complex UI scenarios.

---

## When to use

Use ZDrop when you need:
- object-based options
- multi-select with custom rendering
- search with debouncing
- reliable behavior inside modals or scroll containers

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
/>;
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
  options={options}
  valueKey="id"
  labelKey="name"
  shouldReturnObjectOnChange
/>;
```

Pitfalls:
- `valueKey` must be unique and stable.
- Do not change `valueKey` between renders.

---

## Controlled usage

```tsx
const [value, setValue] = useState(null);

<ZDrop value={value} onChange={setValue} />;
```

If you pass `value`, you must update it after `onChange`.

---

## Positioning strategies

ZDrop supports two mutually exclusive strategies.

### Reference element based

```tsx
<ZDrop referenceElementClassName="container" />
```

Use in modals or constrained layouts.

### Viewport auto height

```tsx
<ZDrop isAutoHeightEnabled />
```

Do not combine both strategies.
