import type { ArkhamDivider } from "arkham-divider-data";
import type { Single } from "@/shared/model";

export type Story = Single<ArkhamDivider.Core["stories"]> & {
	translated?: boolean;
};
