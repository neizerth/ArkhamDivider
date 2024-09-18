import { ArkhamDivider } from "arkham-divider-data";
import { Single } from "./util";

export type IStory = Single<ArkhamDivider.Core['stories']>
export type IEncounterSet = Single<ArkhamDivider.Core['encounterSets']>;
