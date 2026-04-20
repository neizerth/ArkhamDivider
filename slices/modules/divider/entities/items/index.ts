import { lazy } from "react";
import type { DividerWithRelations } from "../../shared/model";
import { arkhamStarterDividerCategoryId } from "./3mm/config";
import { arkhamDecoCategoryId } from "./arkham-deco/config";
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

const ClassicDivider = lazy(() =>
	import("./classic/ui").then((m) => ({ default: m.ClassicDivider })),
);
const Invocation2018Divider = lazy(() =>
	import("./invocation2018/ui").then((m) => ({
		default: m.Invocation2018Divider,
	})),
);
const SarnetskyDivider = lazy(() =>
	import("./sarnetsky/ui").then((m) => ({ default: m.SarnetskyDivider })),
);
const SarnetskyBand = lazy(() =>
	import("./sarnetsky-band/ui").then((m) => ({ default: m.SarnetskyBand })),
);
const ArkhamDecoDivider = lazy(() =>
	import("./arkham-deco/ui").then((m) => ({ default: m.ArkhamDecoDivider })),
);
const RynoDivider = lazy(() =>
	import("./ryno/ui/RynoDivider").then((m) => ({ default: m.RynoDivider })),
);
const ArkhamesqueClassicDivider = lazy(() =>
	import("./arkhamesque-classic/ui").then((m) => ({
		default: m.ArkhamesqueClassicDivider,
	})),
);
const ArkhamStarterDivider = lazy(() =>
	import("./3mm/ui").then((m) => ({ default: m.ArkhamStarterDivider })),
);
const VintageDivider = lazy(() =>
	import("./vintage/ui").then((m) => ({ default: m.VintageDivider })),
);
const InvestigatorToken = lazy(() =>
	import("./investigator-tokens/ui").then((m) => ({
		default: m.InvestigatorToken,
	})),
);
const Chapter2Divider = lazy(() =>
	import("./chapter2/ui").then((m) => ({ default: m.Chapter2Divider })),
);
const TCGDividerSticker = lazy(() =>
	import("./tcg-divider-sticker/ui").then((m) => ({
		default: m.TCGDividerSticker,
	})),
);
const BinderBookmark = lazy(() =>
	import("./binder-bookmark/ui").then((m) => ({ default: m.BinderBookmark })),
);
const SimpleSticker = lazy(() =>
	import("./simple-sticker/ui").then((m) => ({ default: m.SimpleSticker })),
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
	[binderBookmarkCategoryId]: BinderBookmark,
	[simpleStickerCategoryId]: SimpleSticker,
};
