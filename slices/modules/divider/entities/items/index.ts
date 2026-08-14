import { lazy, memo } from "react";
import type { DividerWithRelations } from "../../shared/model";
import { arkhamStarterDividerCategoryId } from "./3mm/config";
import { arkhamDecoCategoryId } from "./arkham-deco/config";
import { arkhamIndexCategoryId } from "./arkham-index/config";
import { arkhamesqueClassicCategoryId } from "./arkhamesque-classic/config";
import { binderBookmarkCategoryId } from "./binder-bookmark/config";
import { chapter2CategoryId } from "./chapter2/config";
import { classicCategoryId } from "./classic/config/common";
import { dividerCategories, dividerLayouts } from "./data";
import { investigatorTokensCategoryId } from "./investigator-tokens/config";
import { invocation2018CategoryId } from "./invocation2018/config";
import { rynoCategoryId } from "./ryno/config";
import { sarnetskyCategoryId } from "./sarnetsky/config";
import { sarnetskyBandCategoryId } from "./sarnetsky-band/config";
import { simpleStickerCategoryId } from "./simple-sticker/config";
import { tcgDividerStickerCategoryId } from "./tcg-divider-sticker/config";
import { vintageDividerCategoryId } from "./vintage/config/common";

export { dividerCategories, dividerLayouts, invocation2018CategoryId };

/**
 * `memo` is needed even though `DividerView` is itself memoized. `DividerView` subscribes to
 * preview zoom and print scale, so it re-renders whenever those change — while the divider's
 * own props (a stable entry from the memoized `selectDividerPageLayouts`) are unchanged.
 * Without `memo` that re-renders the whole divider subtree, times the print run.
 */
const lazyDivider = (
	loader: () => Promise<{
		// biome-ignore lint/suspicious/noExplicitAny: matches `dividerComponents` below
		default: React.ComponentType<DividerWithRelations<any>>;
	}>,
) => memo(lazy(loader));

const ClassicDivider = lazyDivider(
	() => import("./classic/ui/ClassicDivider/ClassicDivider"),
);
const Invocation2018Divider = lazyDivider(
	() =>
		import("./invocation2018/ui/Invocation2018Divider/Invocation2018Divider"),
);
const SarnetskyDivider = lazyDivider(
	() => import("./sarnetsky/ui/SarnetskyDivider/SarnetskyDivider"),
);
const SarnetskyBand = lazyDivider(
	() => import("./sarnetsky-band/ui/SarnetskyBand/SarnetskyBand"),
);
const ArkhamDecoDivider = lazyDivider(
	() => import("./arkham-deco/ui/ArkhamDecoDivider/ArkhamDecoDivider"),
);
const RynoDivider = lazyDivider(
	() => import("./ryno/ui/RynoDivider/RynoDivider"),
);
const ArkhamesqueClassicDivider = lazyDivider(
	() =>
		import(
			"./arkhamesque-classic/ui/ArkhamesqueClassicDivider/ArkhamesqueClassicDivider"
		),
);
const ArkhamStarterDivider = lazyDivider(
	() => import("./3mm/ui/ArkhamStarterDivider/ArkhamStarterDivider"),
);
const VintageDivider = lazyDivider(
	() => import("./vintage/ui/VintageDivider/VintageDivider"),
);
const InvestigatorToken = lazyDivider(
	() => import("./investigator-tokens/ui/InvestigatorToken/InvestigatorToken"),
);
const Chapter2Divider = lazyDivider(
	() => import("./chapter2/ui/Chapter2Divider/Chapter2Divider"),
);
const TCGDividerSticker = lazyDivider(
	() => import("./tcg-divider-sticker/ui/TCGDividerSticker/TCGDividerSticker"),
);
const BinderBookmark = lazyDivider(
	() => import("./binder-bookmark/ui/BinderBookmark/BinderBookmark"),
);
const SimpleSticker = lazyDivider(
	() => import("./simple-sticker/ui/SimpleSticker/SimpleSticker"),
);
const ArkhamIndexDivider = lazyDivider(
	() => import("./arkham-index/ui/ArkhamIndexDivider/ArkhamIndexDivider"),
);

export const dividerComponents: Record<
	string,
	// biome-ignore lint/suspicious/noExplicitAny: any is used to allow any type of params
	React.ComponentType<DividerWithRelations<any>>
> = {
	[classicCategoryId]: ClassicDivider,
	[invocation2018CategoryId]: Invocation2018Divider,
	[sarnetskyCategoryId]: SarnetskyDivider,
	[sarnetskyBandCategoryId]: SarnetskyBand,
	[arkhamDecoCategoryId]: ArkhamDecoDivider,
	[rynoCategoryId]: RynoDivider,
	[arkhamesqueClassicCategoryId]: ArkhamesqueClassicDivider,
	[arkhamStarterDividerCategoryId]: ArkhamStarterDivider,
	[vintageDividerCategoryId]: VintageDivider,
	[investigatorTokensCategoryId]: InvestigatorToken,
	[chapter2CategoryId]: Chapter2Divider,
	[tcgDividerStickerCategoryId]: TCGDividerSticker,
	[arkhamIndexCategoryId]: ArkhamIndexDivider,
	[binderBookmarkCategoryId]: BinderBookmark,
	[simpleStickerCategoryId]: SimpleSticker,
};
