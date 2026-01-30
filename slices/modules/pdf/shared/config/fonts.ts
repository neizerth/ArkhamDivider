import { ArkhamDividerAPI } from "@/shared/api";

const { fontsUrl } = ArkhamDividerAPI;

export const fonts: Record<string, string> = {
	Arkhamic: "/fonts/Arkhamic/Arkhamic.ttf",
	Teutonic: "/fonts/Teutonic/Teutonic.ttf",
	Conkordia: "/fonts/Conkordia/Conkordia.ttf",
	ArnoPro: "/fonts/ArnoPro/ArnoPro-Bold.otf",
	ArkhamIcons: `${fontsUrl}/icons.ttf`,
};
