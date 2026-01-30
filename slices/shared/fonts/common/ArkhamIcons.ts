import { ArkhamDividerAPI } from "@/shared/api";
import { createFont } from "../createFont";

const { fontsUrl } = ArkhamDividerAPI;

export const ArkhamIcons = createFont({
	family: "ArkhamIcons",
	src: `${fontsUrl}/icons.ttf`,
});
