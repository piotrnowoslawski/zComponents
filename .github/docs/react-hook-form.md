# React Hook Form integration

zComponents provides optional wrappers:

- `ZDropField`
- `ZRangeField`

---

## ZDropField example

```tsx
<ZDropField
  name="survivorId"
  valueKey="id"
  onChangeTransform={(o) => o?.id}
/>
```

Notes:
- Do not pass `value` or `onChange` manually.
- Wrappers control form state.
