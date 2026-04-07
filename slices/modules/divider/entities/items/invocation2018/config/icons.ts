import { defaultIconPositionManifest } from "@/modules/core/icon/shared/config";
import type { IconPositionManifest } from "@/modules/core/icon/shared/model";
import { percent } from "@/shared/util";

export const invocation2018Manifest: IconPositionManifest = {
	...defaultIconPositionManifest,
	event: {
		top: percent(-2),
		left: percent(-0.5),
	},
	skill: {
		top: percent(-2),
	},
};
