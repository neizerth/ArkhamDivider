import { propEq } from "ramda";
import { subtypes } from "@/modules/divider/shared/config";
import type { DividerSubtype } from "@/modules/divider/shared/model";
import { factionNames } from "@/modules/faction/shared/config";
import { getFactionIcon } from "@/modules/faction/shared/lib";
import type { Faction } from "@/modules/faction/shared/model";

type Options = {
	subtype: DividerSubtype;
	faction: Faction;
};
export const getDividerSubtypeData = ({ subtype, faction }: Options) => {
	const isFaction = subtype === "faction" || subtype === "investigators";
	const item = subtypes.find(propEq(subtype, "type"));
	if (isFaction || !item) {
		const icon = getFactionIcon(faction);
		const title = factionNames[faction];
		return {
			title,
			icon,
		};
	}
	const { icon, name } = item;
	return {
		title: name,
		icon,
	};
};
