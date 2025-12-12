import {
  defaultSelectedWeapon,
  defaultSelectedSurvivor,
  defaultSelectedZombies,
} from "./zDropDefaultState";
import type {
  ZDropState,
  SelectedZombies,
} from "@stories/types/zDropStoriesStateTypes";
import { STORAGE_KEY } from "./storageKeys";

export const getFallbackState = (): ZDropState => ({
  selectedWeapon: defaultSelectedWeapon,
  selectedSurvivor: defaultSelectedSurvivor,
  selectedZombies: defaultSelectedZombies,
});

export const loadInitialState = (): ZDropState => {
  if (typeof window === "undefined") return getFallbackState();

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return getFallbackState();

    const parsed = JSON.parse(raw) as ZDropState;

    const zs = parsed.selectedZombies;

    if (!zs || typeof zs !== "object") {
      parsed.selectedZombies = defaultSelectedZombies;
    } else {
      const safe: SelectedZombies = {
        numbers: Array.isArray(zs.numbers)
          ? zs.numbers
          : defaultSelectedZombies.numbers,
        strings: Array.isArray(zs.strings)
          ? zs.strings
          : defaultSelectedZombies.strings,
        objects: Array.isArray(zs.objects)
          ? zs.objects
          : defaultSelectedZombies.objects,
      };

      parsed.selectedZombies = safe;
    }

    return {
      ...getFallbackState(),
      ...parsed,
    };
  } catch (e) {
    console.warn("[zDropStore] Failed to parse localStorage state", e);
    return getFallbackState();
  }
};
