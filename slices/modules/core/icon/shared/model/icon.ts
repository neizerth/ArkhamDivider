import type { ArkhamDivider } from "arkham-divider-data";
import type { Single } from "@/shared/model";

export type Icon = Single<ArkhamDivider.Core["icons"]>;
export type IconMapping = Record<string, Icon>;
