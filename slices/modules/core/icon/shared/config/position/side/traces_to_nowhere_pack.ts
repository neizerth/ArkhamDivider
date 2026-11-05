import { percent } from "@/shared/util";
import type { IconPositionManifest } from "../../../model";

export default {
	traces_to_nowhere_pack: {
		scale: percent(105),
	},
	dimensional_madness: {
		top: percent(-2),
		scale: percent(100),
	},
	traces_to_nowhere: {
		top: percent(-1),
		scale: percent(105),
	},
} as IconPositionManifest;
