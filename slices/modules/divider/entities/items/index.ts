import type { DividerWithRelations } from "../../shared/model";
import { arkhamStarterDividerCategoryId } from "./3mm/config";
import { ArkhamStarterDivider } from "./3mm/ui";
import { arkhamDecoCategoryId } from "./arkham-deco/config";
import { ArkhamDecoDivider } from "./arkham-deco/ui";
import { arkhamIndexCategoryId } from "./arkham-index/config";
import { ArkhamIndexDivider } from "./arkham-index/ui";
import { arkhamesqueClassicCategoryId } from "./arkhamesque-classic/config";
import { ArkhamesqueClassicDivider } from "./arkhamesque-classic/ui";
import { chapter2CategoryId } from "./chapter2/config";
import { Chapter2Divider } from "./chapter2/ui";
import { classicCategoryId } from "./classic/config/common";
import { ClassicDivider } from "./classic/ui";
import { dividerCategories, dividerLayouts } from "./data";
import { investigatorTokensCategoryId } from "./investigator-tokens/config";
import { InvestigatorToken } from "./investigator-tokens/ui";
import { invocation2018CategoryId } from "./invocation2018/config";
import { Invocation2018Divider } from "./invocation2018/ui";
import { rynoCategoryId } from "./ryno/config";
import { RynoDivider } from "./ryno/ui/RynoDivider";
import { sarnetskyCategoryId } from "./sarnetsky/config";
import { SarnetskyDivider } from "./sarnetsky/ui";
import { sarnetskyBandCategoryId } from "./sarnetsky-band/config";
import { SarnetskyBand } from "./sarnetsky-band/ui";
import { tcgDividerStickerCategoryId } from "./tcg-divider-sticker/config";
import { TCGDividerSticker } from "./tcg-divider-sticker/ui";
import { vintageDividerCategoryId } from "./vintage/config/common";
import { VintageDivider } from "./vintage/ui";

export { dividerCategories, dividerLayouts, invocation2018CategoryId };

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
};
