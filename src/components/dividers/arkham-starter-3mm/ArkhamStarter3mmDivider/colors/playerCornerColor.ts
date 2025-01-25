import { IDivider } from "@/shared/types/dividers";
import { IRGBAColor } from "@/shared/types/ui";
import { Mapping } from "@/shared/types/util";
import { rgba256 } from "@/shared/lib/features/util/colors";

export const factionPlayerCornerColor: Mapping<IRGBAColor> = {
	guardian: { r: 0.16862746, g: 0.42745098, b: 0.7058824, a: 1 },
	seeker: { r: 0.8509804, g: 0.52156866, b: 0.09019608, a: 1 },
	rogue: { r: 0.29411766, g: 0.44705883, b: 0.25490198, a: 1 },
	neutral: { r: 0.8784314, g: 0.8666667, b: 0.6666667, a: 1 },
	mystic: { r: 0.45490196, g: 0.28235295, b: 0.77254903, a: 1 },
	survivor: { r: 0.65882355, g: 0.22745098, b: 0.25490198, a: 1 },
	multiclass: { r: 0.70199996, g: 0.62598723, b: 0.371121, a: 1 },
};

export const customPlayerCornerColor: Mapping<IRGBAColor> = {
	brown: { r: 0.5686275, g: 0.3882353, b: 0.29411766, a: 1 },
	grey: { r: 0.34901962, g: 0.34901962, b: 0.34901962, a: 1 },
	white: { r: 0.8773585, g: 0.8773585, b: 0.8773585, a: 1 },
};

export const playerCornerColor: Mapping<IRGBAColor> = {
	...factionPlayerCornerColor,
	...customPlayerCornerColor,
};

export const getPlayerCornerColor = (divider: IDivider) => {
	const color = getChannelPlayerCornerColor(divider);
	return rgba256(color);
};

export const getChannelPlayerCornerColor = ({ faction, icon }: IDivider) => {
	if (faction && playerCornerColor[faction]) {
		return playerCornerColor[faction];
	}
	if (icon === "weakness") {
		return playerCornerColor.white as IRGBAColor;
	}

	return playerCornerColor.brown as IRGBAColor;
};
