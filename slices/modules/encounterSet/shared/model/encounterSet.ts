import type { ArkhamDivider } from "arkham-divider-data";
import type { Defined, Single } from "@/shared/model";

export type EncounterSet = Single<ArkhamDivider.Core["encounterSets"]>;

export type EncounterSetTypeEntry = Single<Defined<EncounterSet["types"]>>;

export type EncounterSetGroup = {
	id: string;
	main: string[];
	side: string[];
	version_number: number;
	version_text: string;
};
