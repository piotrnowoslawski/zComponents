# ZRange

Dual-thumb range slider for selecting numeric intervals.

---

## Basic usage

```tsx
import { ZRange } from "zcomponents-ui";

<ZRange
  min={0}
  max={1000}
  value={{ min: 100, max: 700 }}
  onChange={(value) => console.log(value)}
/>;
```

---

## Behavior notes

- Values are normalized (`min ≤ max`).
- `onChange` fires during interaction.
- `onSelect` fires after interaction ends.

Use `onSelect` for expensive operations.
