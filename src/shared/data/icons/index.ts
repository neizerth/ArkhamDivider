import type { IIconTransform } from "@/shared/model/types/icons";
import campaigns from "./campaigns";
import common from "./common.json";
import custom from "./custom";
import player from "./player.json";
import side from "./side.json";

export const ICON_LAYOUT_HEIGHT = 89;
export const ICON_SIZE = 7.8;

export default [
	...campaigns,
	...custom,
	...side,
	...player,
	...common,
] as IIconTransform[];
