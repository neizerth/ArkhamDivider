import { DividerSubtype, DividerType, IDivider } from "@/shared/model/types/dividers";
import { CardType } from "@/shared/model/types/game";

export const INVESTIGATOR_ICON_LANGUAGES = ["ko", "zh-cn", "zh"];
export const getDefaultIcon = ({
	divider,
	language,
}: {
	divider: IDivider;
	language: string;
}) => {
	const { icon, specialIcon, cardType, subtype, type } = divider;

	if (
		type === DividerType.INVESTIGATOR &&
		!INVESTIGATOR_ICON_LANGUAGES.includes(language)
	) {
		return;
	}
	if (cardType === CardType.ASSET) {
		return subtype === DividerSubtype.ALLY ? icon : "clue";
	}
	if (cardType === CardType.EVENT) {
		return "stopwatch";
	}
	if (cardType === CardType.SKILL) {
		return "skill_wild";
	}
	return specialIcon || icon;
};
