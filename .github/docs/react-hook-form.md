# React Hook Form integration

zComponents provides optional wrappers for **react-hook-form**:

- `ZDropField`
- `ZRangeField`

These wrappers are designed to keep zComponents predictable in forms by managing controlled value flow internally,
while still exposing the component configuration you need.

---

## Install

```bash
npm install react-hook-form
```

If you use schema validation:

```bash
npm install @hookform/resolvers zod
# or
npm install @hookform/resolvers yup
```

---

## Mental model (read once)

### Why wrappers exist

In react-hook-form, fields are controlled by the form state.
zComponents components can be controlled, but RHF introduces a specific pattern:

- form state is the source of truth
- the wrapper reads from RHF and passes the correct value to the component
- the wrapper transforms output back into a shape RHF expects

### Most common mistake

**Do not pass `value` or `onChange` to `ZDropField` / `ZRangeField`.**  
Wrappers own those props.

If you do, you’ll get:

- stale UI
- double updates
- unexpected validation behavior

---

## ZDropField

### Basic example

```tsx
import { useForm } from "react-hook-form";
import { ZDropField } from "zcomponents-ui/react-hook-form";

type FormValues = {
  survivor: string | null;
};

export function Example() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { survivor: null },
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <ZDropField<FormValues>
        control={control}
        name="survivor"
        options={["Hiroshi", "Harper"]}
        placeholder="Select"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

### Pattern 1 — Store only an ID (recommended)

Store a stable primitive in the form state.

```tsx
type FormValues = { survivorId: number | null };

const options = [
  { id: 1, name: "Hiroshi" },
  { id: 2, name: "Harper" },
];

<ZDropField<FormValues>
  control={control}
  name="survivorId"
  options={options}
  valueKey="id"
  labelKey="name"
  placeholder="Select"
  onChangeTransform={(option) => option?.id ?? null}
  valueSelector={(id) => options.find((o) => o.id === id) ?? null}
/>;
```

Why this is robust:

- avoids reference equality issues
- easy to validate
- easy to serialize and submit

---

### Pattern 2 — Store the full object (only if needed)

```tsx
type FormValues = { survivor: { id: number; name: string } | null };

<ZDropField<FormValues>
  control={control}
  name="survivor"
  options={options}
  shouldReturnObjectOnChange
  onChangeTransform={(option) => option ?? null}
/>;
```

Pitfalls:

- object identity can change if `options` are recreated
- validation schemas must match nested object shape

---

### Pattern 3 — Multi-select store array of IDs

```tsx
type FormValues = { weaponIds: number[] };

const options = [
  { id: 1, name: "Sword" },
  { id: 2, name: "Bow" },
];

<ZDropField<FormValues>
  control={control}
  name="weaponIds"
  options={options}
  isMultiple
  valueKey="id"
  labelKey="name"
  onChangeTransform={(selected) =>
    Array.isArray(selected) ? selected.map((o) => o.id) : []
  }
  valueSelector={(ids) => options.filter((o) => ids?.includes(o.id))}
/>;
```

Non-obvious notes:

- keep `options` stable (useMemo) so selectors don’t churn
- always return an array for multi-select fields

---

### Validation

#### Simple rules

```tsx
<ZDropField name="survivor" rules={{ required: "Selection is required" }} />
```

#### Validation mode tips

- `mode: "onSubmit"` reduces noise for users
- `mode: "onChange"` gives instant feedback but can be noisy

---

## ZRangeField

### Basic example

```tsx
import { useForm } from "react-hook-form";
import { ZRangeField } from "zcomponents-ui/react-hook-form";

type FormValues = {
  price: { min: number; max: number };
};

export function Example() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { price: { min: 100, max: 700 } },
  });

  return (
    <form onSubmit={handleSubmit(console.log)}>
      <ZRangeField<FormValues>
        control={control}
        name="price"
        min={0}
        max={1000}
        step={10}
        label="Price"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

### Update timing (performance critical)

`updateTiming` controls when RHF state is updated:

- `"onChange"` — updates while dragging (more re-renders)
- `"onSelect"` — updates when interaction ends (recommended for heavy forms)

```tsx
<ZRangeField<FormValues>
  control={control}
  name="price"
  min={0}
  max={1000}
  step={10}
  updateTiming="onSelect"
/>
```

Pitfall:

- if you expect live preview elsewhere in the UI, `onSelect` may feel delayed
- solution: keep a local preview state outside RHF if needed

---

### Validation examples

#### Basic rules

```tsx
<ZRangeField
  name="price"
  rules={{
    validate: (v) => v.min <= v.max || "Min must be <= max",
  }}
/>
```

#### Schema validation (Zod example)

```ts
import { z } from "zod";

export const schema = z.object({
  price: z.object({
    min: z.number(),
    max: z.number(),
  }),
});
```

---

## Error rendering

Wrappers support:

- `errorClassName`
- `errorRenderer`

Example:

```tsx
<ZDropField
  name="survivor"
  errorRenderer={(message) => (
    <div style={{ color: "crimson", marginTop: 6 }}>{message}</div>
  )}
/>
```

---

## Common pitfalls

### Field doesn’t update / looks stuck

Cause:

- passing `value` / `onChange` to the wrapper
- mixing controlled props with RHF control

Fix:

- remove controlled props and rely on wrapper

---

### Object option selection behaves oddly

Cause:

- storing objects in form state while recreating `options`

Fix:

- store IDs instead, and map via `valueSelector`

---

### Performance issues in big forms

Fix:

- set `ZRangeField updateTiming="onSelect"`
- keep `ZDrop` search filtering upstream for huge datasets
- memoize `options` and mapping functions

---

## Recommended defaults

- Prefer storing **IDs** in form state for selects
- Use `updateTiming="onSelect"` for range fields in large forms
- Memoize `options` and selectors to reduce unnecessary re-renders
