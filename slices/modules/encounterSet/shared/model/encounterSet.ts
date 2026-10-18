import type { ArkhamDivider } from "arkham-divider-data";
import type { Defined, Single } from "@/shared/model";

export type EncounterSet = Single<ArkhamDivider.Core["encounterSets"]>;

export type EncounterSetTypeEntry = Single<Defined<EncounterSet["types"]>>;

/** Story/scenario-specific size + types for a partially used encounter set. */
export type EncounterSetData = NonNullable<
	NonNullable<
		Single<ArkhamDivider.Core["stories"]>["encounter_set_data"]
	>[number]
>;

export type EncounterSetGroup = {
	id: string;
	main: string[];
	side: string[];
	version_number: number;
	version_text: string;
};
