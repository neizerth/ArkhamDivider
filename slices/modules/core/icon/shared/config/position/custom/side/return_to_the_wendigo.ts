import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../../model";

export default {
	return_to_the_wendigo: {
		top: percent(-1),
		left: percent(2),
		scale: percent(90),
	},
	"return_to_the_wendigo-curse_of_the_wendigo": {
		top: percent(-4),
		left: percent(3),
	},
	"return_to_the_wendigo-fearsome_fates": {
		top: percent(-5),
		left: percent(3),
		scale: percent(90),
	},
	"return_to_the_wendigo-spoils_of_hanninah": {
		top: percent(1),
		left: percent(3),
		scale: percent(70),
	},
	"return_to_the_wendigo-return_to_the_wendigo_set": {
		top: percent(-2),
		left: percent(4),
	},
} as IconPositionManifest;
