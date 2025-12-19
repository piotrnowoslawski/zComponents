import { UnitList } from "@components/ZRange/types/zRangeTypes";

export const survivorsUnitList: UnitList[] = [
  { unit: "loner", fractionDigits: 0 }, // 1,
  { unit: "pair", fractionDigits: 0 }, // 5,
  { unit: "group", fractionDigits: 0 }, // 10,
  { unit: "crew", fractionDigits: 0 }, // 25,
  { unit: "camp", fractionDigits: 1 }, // 50,
  { unit: "settlement", fractionDigits: 1 }, // 100,
  { unit: "outpost", fractionDigits: 2 }, // 200,
  { unit: "colony", fractionDigits: 2 }, // 500,
  { unit: "federation", fractionDigits: 4 }, // 1000,
];

export const survivorsUnitDivisors: number[] = [
  1, 5, 10, 25, 50, 100, 200, 500, 1000,
];

export const zombiesUnitList: UnitList[] = [
  { unit: "straggler", fractionDigits: 0 }, // 1
  { unit: "pack", fractionDigits: 0 }, // 5
  { unit: "cluster", fractionDigits: 0 }, // 10
  { unit: "swarm", fractionDigits: 1 }, // 25
  { unit: "horde", fractionDigits: 2 }, // 50
  { unit: "mega horde", fractionDigits: 2 }, // 100
  { unit: "plague wave", fractionDigits: 3 }, // 200
  { unit: "doom legion", fractionDigits: 4 }, // 500
  { unit: "endfall", fractionDigits: 4 }, // 1000
];

export const zombiesUnitDivisors: number[] = [
  1, 5, 10, 25, 50, 100, 200, 500, 1000,
];
