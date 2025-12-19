// import { UnitList } from "../types/zRangeTypes";

// export const convertToUnit = (
//   value: number,
//   units: UnitList[] = [],
//   unitDivisors: number[] = []
// ) => {
//   let convertedValue = value;

//   if (units.length === 0) {
//     return value;
//   }

//   for (let i = 0; i < units.length; i++) {
//     const unit = units[i].unit;

//     const unitDivisor = unitDivisors?.[i] || 1;

//     if (convertedValue >= unitDivisor) {
//       convertedValue /= unitDivisor;
//     } else {
//       return `${convertedValue.toFixed(units[i].fractionDigits)} ${unit}`;
//     }
//   }

//   return `${convertedValue.toFixed(units[units.length - 1].fractionDigits)} ${
//     units[units.length - 1]
//   }`;
// };

type UnitDef = { unit: string; fractionDigits: number };

export const convertToUnit = (
  rawValue: number,
  units: UnitDef[] = [],
  unitDivisors: number[] = [],
  isIndicatorUnitHidden = false,
  scaleFn: (x: number) => number = (x) => x
): string => {
  if (!units.length) return String(rawValue);
  if (!Number.isFinite(rawValue)) return String(rawValue);

  const scaled = scaleFn(rawValue);

  const sign = scaled < 0 ? "-" : "";
  const value = Math.abs(scaled);

  const divisors = unitDivisors
    .slice(0, units.length)
    .map((d) => (d > 0 ? d : 1));

  if (!divisors.length) {
    return `${sign}${value.toFixed(units[0].fractionDigits)} ${units[0].unit}`;
  }

  let idx = 0;
  for (let i = 0; i < units.length; i++) {
    const d = divisors[i] ?? 1;
    if (value >= d) idx = i;
  }

  const d = divisors[idx] ?? 1;
  const converted = value / d;

  if (isIndicatorUnitHidden) {
    return `${sign}${converted.toFixed(units[idx].fractionDigits)}`;
  }

  return `${sign}${converted.toFixed(units[idx].fractionDigits)} ${
    units[idx].unit
  }`;
};
