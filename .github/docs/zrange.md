# ZRange

Dual-thumb range slider for selecting numeric intervals with precision.

ZRange is designed for scenarios where a simple input or single slider is not enough:
filters, dashboards, analytics, and performance-sensitive UIs.

---

## When to use

Use ZRange when you need:

- min/max range selection
- live preview while dragging
- deferred updates after interaction ends
- predictable normalization of values
- optional non-linear display scaling
- automatic unit formatting

Avoid ZRange if:

- you only need a single numeric input
- range logic is trivial and does not require interaction

---

## Mental model (read once)

ZRange manages **two synchronized values**:

- `min`
- `max`

The component guarantees:

- output is always normalized (`min ≤ max`)
- thumbs can cross — active thumb will swap automatically
- no invalid range state is ever emitted

This means you never need to guard against `min > max` in your application code.

---

## Value and event contract

ZRange exposes **two different events** with distinct purposes:

### `onChange`

- fired continuously during interaction
- intended for UI updates (labels, previews)
- should remain lightweight

### `onSelect`

- fired once interaction ends (mouse up / touch end)
- intended for side effects (API calls, filtering)

Example:

```tsx
<ZRange value={value} onChange={setPreview} onSelect={commitFilter} />
```

**Common pitfall:**
Putting expensive logic (API calls, heavy filtering) in `onChange` can cause performance issues.

---

## Basic usage

```tsx
import { ZRange } from "zcomponents-ui";

<ZRange
  name="price"
  min={0}
  max={1000}
  step={10}
  value={{ min: 100, max: 700 }}
  onChange={(value) => console.log(value)}
/>;
```

---

## Controlled usage

ZRange is **fully controlled**.

If you pass `value`, you must update it after `onChange` / `onSelect`.

```tsx
const [range, setRange] = useState({ min: 0, max: 100 });

<ZRange min={0} max={100} value={range} onChange={setRange} />;
```

Symptom:

- slider moves visually but snaps back

Cause:

- controlled value not updated

Fix:

- update state in `onChange` or `onSelect`

---

## Step and precision (non-obvious)

```tsx
<ZRange step={0.1} />
```

Notes:

- floating point steps can introduce rounding artifacts
- prefer integer steps internally and format values for display

Recommended pattern:

- store integers (e.g. cents, milliseconds)
- format output in UI

---

## Thumb crossing behavior

When dragging:

- thumbs are allowed to cross
- ZRange automatically swaps the active thumb
- emitted value is always normalized

This simplifies UX but means:

- you cannot rely on “left thumb = min” internally
- always read values from `{ min, max }`

---

## Scaling (display-only logic)

ZRange supports optional non-linear scaling via a string-based expression:

```tsx
scale = "Math.log10(x + 1)";
```

Important notes:

- scaling affects **display and indicator positioning only**
- raw output values remain linear
- scaling is evaluated internally — treat it as display logic

Use scaling when:

- large numeric ranges need better visual distribution

Avoid scaling when:

- users expect linear movement mapping

---

## Units and formatting

ZRange can automatically format values using units.

```tsx
unitDivisors={[1, 1000, 1000000]}
unitList={[
  { unit: "H/s", fractionDigits: 0 },
  { unit: "kH/s", fractionDigits: 1 },
  { unit: "MH/s", fractionDigits: 2 },
]}
```

Non-obvious rules:

- `unitDivisors` and `unitList` must align by index
- the largest divisor not exceeding the value is selected
- `fractionDigits` controls rounding, not precision of the underlying value

---

## Indicators and icons

ZRange allows custom icons for:

- min thumb
- max thumb
- indicator elements

Notes:

- icons are purely visual
- they do not affect hitboxes or logic
- ensure icons are lightweight to avoid layout thrashing

---

## Accessibility & UX notes

Current guarantees:

- mouse and touch interaction supported
- visual feedback during drag

Things to consider in your app:

- keyboard accessibility may be partial
- focus handling is minimal
- announce value changes if accessibility is critical

---

## Performance considerations

- keep `onChange` lightweight
- prefer `onSelect` for side effects
- avoid unnecessary re-renders of parent components
- memoize expensive derived values

ZRange uses ResizeObserver internally; avoid nesting it inside frequently resizing parents if not necessary.

---

## Common production issues

### Slider feels laggy

Likely causes:

- heavy logic in `onChange`
- frequent parent re-renders

Fix:

- move heavy work to `onSelect`
- debounce external effects

---

### Values jump unexpectedly

Likely causes:

- floating point `step`
- rounding in parent state

Fix:

- use integer steps internally
- format values only for display

---

### Min and max appear swapped

Explanation:

- thumb crossing is allowed
- values are normalized before emission

Solution:

- always read from `{ min, max }`, not from thumb identity

---

## Recommended patterns

### Use `onSelect` as commit

Treat `onChange` as preview, `onSelect` as commit.

### Store raw values, format later

Keep state predictable and formatting isolated to UI.

---

ZRange is designed to keep range logic **safe and predictable**, even in complex interactions.

## Styling

ZRange exposes **explicit class overrides** via the `styleClasses` prop.
This allows you to customize every internal element without relying on fragile selectors.

Default styles provide layout, thumb positioning, indicator behavior and interaction states.

### Import styles

You can choose **one of two approaches**:

#### Option A — Import all styles (simplest)

```ts
import "zcomponents-ui/styles.css";
```

This loads styles for **all zComponents** and works out of the box.

#### Option B — Import only ZRange styles (recommended)

```ts
import "zcomponents-ui/styles/zrange";
```

This loads **only ZRange styles** and gives you precise control over CSS scope.

> ⚠️ If no styles are imported, thumbs, indicators and track positioning will not work correctly.

---

For advanced theming, per-component imports, and override strategies, see:

- [Styling & Theming](styling.md)
