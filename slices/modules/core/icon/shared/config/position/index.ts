import type { IconPositionManifest } from "../../model";
import campaign from "./campaign";
import challenge from "./challenge";
import custom from "./custom";
import investigator from "./investigator";
import player from "./player";
import side from "./side";

export default {
	...campaign,
	...player,
	...investigator,
	...custom,
	...side,
	...challenge,
} as IconPositionManifest;
