import type { IconPositionManifest } from "../../model";
import campaign from "./campaign";
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
} as IconPositionManifest;
