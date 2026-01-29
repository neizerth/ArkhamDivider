import type { BulkLoad, SingleLoad } from "@react-pdf/font";
import { ArkhamDividerAPI } from "@/shared/api";

const { fontsUrl } = ArkhamDividerAPI;

export const fonts: Record<string, SingleLoad | BulkLoad> = {
	Arkhamic: {
		family: "Arkhamic",
		src: "/fonts/Arkhamic/Arkhamic.ttf",
	},
	Teutonic: {
		family: "Teutonic",
		src: "/fonts/Teutonic/Teutonic.ttf",
	},
	Conkordia: {
		family: "Conkordia",
		src: "/fonts/Conkordia/Conkordia.ttf",
	},
	ArnoPro: {
		family: "ArnoPro",
		fonts: [
			{
				src: "/fonts/ArnoPro/ArnoPro-Bold.otf",
				fontWeight: "bold",
				fontStyle: "normal",
			},
		],
	},
	ArkhamIcons: {
		family: "ArkhamIcons",
		src: `${fontsUrl}/icons.ttf`,
	},
};
