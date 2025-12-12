import { useSyncExternalStore } from "react";
import type { ZDropState } from "@stories/types/zDropStoriesStateTypes";
import { loadInitialState, getFallbackState } from "./loadingInitialState";
import { STORAGE_KEY } from "./storageKeys";

const state: ZDropState = loadInitialState();

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("[zDropStore] Failed to persist state", e);
  }
}

export const zDropStore = {
  getState: () => state,
  setState: (patch: Partial<ZDropState>) => {
    Object.assign(state, patch);

    persist();
    emit();
  },
  subscribe: (cb: () => void) => {
    listeners.add(cb);

    return () => listeners.delete(cb);
  },
  reset: () => {
    const fallback = getFallbackState();

    state.selectedWeapon = fallback.selectedWeapon;
    state.selectedSurvivor = fallback.selectedSurvivor;
    state.selectedZombies = fallback.selectedZombies;

    persist();
    emit();
  },
};

export function useZDropStore<T>(selector: (s: ZDropState) => T): T {
  return useSyncExternalStore(
    zDropStore.subscribe,
    () => selector(zDropStore.getState()),
    () => selector(zDropStore.getState())
  );
}
