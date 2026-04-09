import { prop } from "ramda";
import type { DividerCategory } from "../../shared/model";
import { arkhamStarterDividerCategory } from "./3mm/config";
import { arkhamDecoCategory } from "./arkham-deco/config";
import { arkhamIndexCategory } from "./arkham-index/config";
import { arkhamesqueClassicCategory } from "./arkhamesque-classic/config";
import { chapter2Category } from "./chapter2/config/category";
import { classicCategory } from "./classic/config";
import { investigatorTokensCategory } from "./investigator-tokens/config";
import { invocation2018Category } from "./invocation2018/config";
import { rynoCategory } from "./ryno/config";
import { sarnetskyCategory } from "./sarnetsky/config/category";
import { sarnetskyBandCategory } from "./sarnetsky-band/config";
import { tcgDividerStickerCategory } from "./tcg-divider-sticker/config";
import { vintageCategory } from "./vintage/config";

/** Categories/layouts only — no UI imports. Use this from shared to avoid circular deps. */
export const dividerCategories: DividerCategory[] = [
	chapter2Category,
	classicCategory,
	invocation2018Category,
	arkhamesqueClassicCategory,
	rynoCategory,
	sarnetskyCategory,
	arkhamDecoCategory,
	arkhamStarterDividerCategory,
	vintageCategory,
	sarnetskyBandCategory,
	investigatorTokensCategory,
	tcgDividerStickerCategory,
	arkhamIndexCategory,
];

export const dividerLayouts = dividerCategories.flatMap(prop("layouts"));
