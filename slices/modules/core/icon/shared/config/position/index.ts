import type { IconPositionManifest } from "../../model";
import campaign from "./campaign";
import investigator from "./investigator";
import player from "./player";

export default {
	...campaign,
	...player,
	...investigator,
} as IconPositionManifest;
