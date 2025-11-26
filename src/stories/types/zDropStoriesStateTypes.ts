export type ZombiesNumbers = number[];
export type ZombiesStrings = string[];

export type ZombieObject = {
  number: number;
  string: string;
  stateId: number;
};

export type ZombiesObjects = ZombieObject[];

export type SelectedZombies = {
  numbers: ZombiesNumbers;
  strings: ZombiesStrings;
  objects: ZombiesObjects;
};

export type ZDropState = {
  selectedWeapon?: {
    number: number | null;
    string: string | "";
    object: { stateId: number; value: string; label: string } | null;
  };
  selectedSurvivor?: {
    number: number | null;
    string: string | "";
    object: { stateId: number; value: string; label: string } | null;
  };
  selectedZombies?: SelectedZombies;
};
