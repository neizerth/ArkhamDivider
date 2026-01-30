import type { PDFDocument } from "pdf-lib";
import { omit, range } from "ramda";
import type { IconMapping } from "@/modules/core/icon/shared/model";
import { dividerPDFComponents } from "@/modules/divider/entities/items";
import type { DividerLayout } from "@/modules/divider/shared/model";
import {
	fromDPI,
	getPageLayoutOffsetPx,
	getPageSizePx,
	getUnitSizePx,
} from "@/modules/print/shared/lib";
import type { DPI, PageFormat, PageLayout } from "@/modules/print/shared/model";
import type { DividerRender } from "@/modules/render/shared/model";
import { type PDFFontService, PDFIconService } from "../../shared/lib";
import { PDFTextService } from "../../shared/lib/pdf.text.service";
import type { PDFDividerContext, PDFDividerProps } from "../../shared/model";

type Options = {
	pageLayout: PageLayout<DividerRender>;
	layout: DividerLayout;
	bleedEnabled: boolean;
	pageFormat: PageFormat;
	dpi: DPI;
	icons: IconMapping;
};

type AddToOptions = {
	font: PDFFontService;
};

export class PDFPage {
	protected mm: (value: number) => number;

	constructor(protected readonly options: Options) {
		const { dpi } = this.options;
		this.mm = fromDPI(dpi);
	}

	getPageSize() {
		const { pageFormat, dpi } = this.options;
		return getPageSizePx({ pageFormat, dpi });
	}

	getUnitSize() {
		const { pageLayout, dpi } = this.options;
		return getUnitSizePx({ pageLayout, dpi });
	}

	getLayoutOffset() {
		const { pageLayout, dpi, pageFormat } = this.options;
		const pageSize = this.getPageSize();
		const offset = getPageLayoutOffsetPx({
			pageLayout,
			dpi,
			pageFormat,
		});

		const top = pageSize.height - offset.y;

		return {
			...offset,
			top,
		};
	}

	async addTo(pdf: PDFDocument, { font }: AddToOptions) {
		const { pageLayout, layout, dpi, icons, bleedEnabled } = this.options;
		const { grid } = pageLayout;

		const pageSize = this.getPageSize();
		const { width, height } = pageSize;

		const unitSize = this.getUnitSize();
		const layoutOffset = this.getLayoutOffset();
		const page = pdf.addPage([width, height]);

		const drawDivider = dividerPDFComponents[layout.categoryId];

		const rows = range(0, grid.rows);
		const cols = range(0, grid.cols);

		for (const row of rows) {
			for (const col of cols) {
				const render = pageLayout?.items[row]?.items[col];
				if (!render) {
					continue;
				}
				const x = layoutOffset.x + col * unitSize.width;
				/** pdf-lib (0, 0) is bottom-left, so we need to subtract the height of the row */
				const y = layoutOffset.y + (grid.rows - row - 1) * unitSize.height;
				const position = {
					x,
					y,
				};

				const text = new PDFTextService(font, page, unitSize, position);
				const icon = new PDFIconService(text, icons);

				if (render.background) {
					const background = await pdf.embedPng(render.background);
					page.drawImage(background, {
						x,
						y,
						...unitSize,
					});
				}

				const props = omit(["background"], render) as PDFDividerProps;

				const context: PDFDividerContext = {
					text,
					icon,
					page,
					position,
					dpi,
					width: unitSize.width,
					height: unitSize.height,
					bleedEnabled,
					layout,
				};

				await drawDivider(props, context);
			}
		}
	}
}
