import type { PDFDivider } from "@/modules/pdf/shared/model";
import { arkhamStarterDividerCategoryId } from "./3mm/config";
import { ArkhamStarterDividerPDF } from "./3mm/ui";
import { arkhamDecoCategoryId } from "./arkham-deco/config";
import { ArkhamDecoDividerPDF } from "./arkham-deco/ui";
import { arkhamesqueClassicCategoryId } from "./arkhamesque-classic/config/common";
import { ArkhamesqueClassicDividerPDF } from "./arkhamesque-classic/ui/pdf";
import { chapter2CategoryId } from "./chapter2/config";
import { Chapter2DividerPDF } from "./chapter2/ui/pdf";
import { classicCategoryId } from "./classic/config/common";
import { ClassicDividerPDF } from "./classic/ui";
import { investigatorTokensCategoryId } from "./investigator-tokens/config";
import { InvestigatorTokensDividerPDF } from "./investigator-tokens/ui/pdf";
import { invocation2018CategoryId } from "./invocation2018/config";
import { Invocation2018DividerPDF } from "./invocation2018/ui/Invocation2018DividerPDF";
import { rynoCategoryId } from "./ryno/config/common";
import { RynoDividerPDF } from "./ryno/ui/pdf";
import { sarnetskyCategoryId } from "./sarnetsky/config";
import { SarnetskyDividerPDF } from "./sarnetsky/ui";
import { sarnetskyBandCategoryId } from "./sarnetsky-band/config";
import { SarnetskyBandDividerPDF } from "./sarnetsky-band/ui";
import { tcgDividerStickerCategoryId } from "./tcg-divider-sticker/config";
import { TCGDividerStickerPDF } from "./tcg-divider-sticker/ui/pdf";
import { vintageDividerCategoryId } from "./vintage/config/common";
import { VintageDividerPDF } from "./vintage/ui/pdf";

// biome-ignore lint/suspicious/noExplicitAny: any is used to allow any type of params
export const dividerPDFComponents: Record<string, PDFDivider<any>> = {
	[arkhamesqueClassicCategoryId]: ArkhamesqueClassicDividerPDF,
	[arkhamDecoCategoryId]: ArkhamDecoDividerPDF,
	[classicCategoryId]: ClassicDividerPDF,
	[invocation2018CategoryId]: Invocation2018DividerPDF,
	[investigatorTokensCategoryId]: InvestigatorTokensDividerPDF,
	[rynoCategoryId]: RynoDividerPDF,
	[sarnetskyCategoryId]: SarnetskyDividerPDF,
	[sarnetskyBandCategoryId]: SarnetskyBandDividerPDF,
	[arkhamStarterDividerCategoryId]: ArkhamStarterDividerPDF,
	[vintageDividerCategoryId]: VintageDividerPDF,
	[chapter2CategoryId]: Chapter2DividerPDF,
	[tcgDividerStickerCategoryId]: TCGDividerStickerPDF,
};
