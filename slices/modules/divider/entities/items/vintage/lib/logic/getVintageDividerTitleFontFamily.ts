import type { FontFamily } from "@/shared/model";

const fontFamilies: Record<string, FontFamily> = {
	default: "AtlanticCruiseExtended",
	ru: "Breamcatcher",
	cn: "ZhenShuai",
	ko: "LineSeedKR",
};
export function getVintageDividerTitleFontFamily(language: string) {
	return fontFamilies[language] ?? fontFamilies.default;
}
