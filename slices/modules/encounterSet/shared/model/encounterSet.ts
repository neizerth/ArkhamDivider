import type { ArkhamDivider } from "arkham-divider-data";
import type { Defined, Single } from "@/shared/model";

export type EncounterSet = Single<ArkhamDivider.Core["encounterSets"]>;

export type EncounterSetTypeEntry = Single<Defined<EncounterSet["types"]>>;
