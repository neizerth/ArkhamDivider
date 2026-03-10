import type { IconPositionManifest } from "../../model";
import campaign from "./campaign";
import custom from "./custom";
import investigator from "./investigator";
import player from "./player";

export default {
	...campaign,
	...player,
	...investigator,
	...custom,
} as IconPositionManifest;
