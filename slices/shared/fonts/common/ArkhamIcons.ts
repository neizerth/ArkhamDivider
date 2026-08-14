import { createFont } from "../createFont";

export const ArkhamIcons = createFont({
	family: "ArkhamIcons",
	src: "/fonts/ArkhamIcons/ArkhamIcons.ttf",
	// `scripts/install-font.ts` re-downloads this .ttf during prebuild, so there is no
	// committed .woff2 to point at. Converting it needs a step in that script.
	woff2: false,
});
