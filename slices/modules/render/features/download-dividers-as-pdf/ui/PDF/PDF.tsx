import { Document } from "@react-pdf/renderer";
import { dividerPDFComponents } from "@/modules/divider/entities/items";
import { usePDFFont } from "@/modules/pdf/shared/lib";
import type { DPI, PageFormat, PageLayout } from "@/modules/print/shared/model";
import type { DividerRender } from "@/modules/render/shared/model";
import { PDFPage } from "../PDFPage";

type PDFProps = {
	categoryId: string;
	pageLayouts: PageLayout<DividerRender>[];
	pageFormat: PageFormat;
	dpi: DPI;
};

export function PDF({ categoryId, dpi, pageFormat, pageLayouts }: PDFProps) {
	const Component = dividerPDFComponents[categoryId];

	usePDFFont("ArkhamIcons");

	return (
		<Document>
			<PDFPage
				dpi={dpi}
				side="front"
				pageFormat={pageFormat}
				pageLayout={pageLayouts[0]}
				number={1}
				total={pageLayouts.length}
				Component={Component}
			/>
		</Document>
	);
}
