import { ArkhamDividerAPI } from "@/shared/api";
import { createFont } from "../createFont";

const isDev = import.meta.env.DEV;

const { fontsUrl } = ArkhamDividerAPI;

const baseUrl = isDev ? "/arkham-icons" : fontsUrl;

export const ArkhamIcons = createFont({
	family: "ArkhamIcons",
	src: `${baseUrl}/icons.ttf`,
});
