import type { IconPositionManifest } from "../../model";
import campaign from "./campaign";
import challenge from "./challenge";
import common from "./common";
import custom from "./custom";
import side from "./side";
import { initialIcon } from "./util";

export default {
	initial: initialIcon,
	...campaign,
	...custom,
	...side,
	...challenge,
	...common,
} as IconPositionManifest;
