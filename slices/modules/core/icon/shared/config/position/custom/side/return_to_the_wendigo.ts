import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";

export default {
	return_to_the_wendigo: {
		top: percent(1),
		left: percent(-2),
		scale: percent(90),
	},
	"return_to_the_wendigo-curse_of_the_wendigo": {
		left: percent(-1),
		top: percent(-2),
	},
	"return_to_the_wendigo-fearsome_fates": {
		left: percent(-1),
		top: percent(-3),
		scale: percent(90),
	},
	"return_to_the_wendigo-spoils_of_hanninah": {
		left: percent(-1),
		top: percent(3),
		scale: percent(70),
	},
	"return_to_the_wendigo-return_to_the_wendigo_set": {},
} as IconPositionManifest;
