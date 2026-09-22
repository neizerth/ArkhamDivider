import type { EncounterSet } from "../model";

export const isReturnEncounterSet = ({ cycle_code }: EncounterSet) =>
	cycle_code === "return";
