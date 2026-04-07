import type { DividerWithRelations } from "@/modules/divider/shared/model";
import type { PDFPageLayoutItem } from "@/modules/pdf/shared/model";
import type { ArkhamesqueClassicDividerParams } from "../../../../model";

export type ArkhamesqueClassicPdfProps = PDFPageLayoutItem<
	DividerWithRelations<ArkhamesqueClassicDividerParams>
>;
