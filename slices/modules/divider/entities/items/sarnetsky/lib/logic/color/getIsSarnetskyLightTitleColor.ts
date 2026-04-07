import type { DividerSubtype } from "@/modules/divider/shared/model";
import type { Faction } from "@/modules/faction/shared/model";

type Options = {
	faction?: Faction | null;
	subtype?: DividerSubtype | null;
};

export const getIsSarnetskyLightTitleColor = ({
	faction,
	subtype,
}: Options) => {
	if (
		subtype &&
		["customizations", "weakness", "basic_weakness"].includes(subtype)
	) {
		return false;
	}
	if (faction) {
		return ["guardian", "rogue", "survivor", "mystic"].includes(faction);
	}
	return false;
};
