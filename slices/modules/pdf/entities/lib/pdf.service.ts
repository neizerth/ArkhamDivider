import { PDFDocument } from "pdf-lib";
import type { IconMapping } from "@/modules/core/icon/shared/model";
import type { DividerLayout } from "@/modules/divider/shared/model";
import type { DPI, PageFormat, PageLayout } from "@/modules/print/shared/model";
import type { DividerRender } from "@/modules/render/shared/model";
import { PDFFontService } from "../../shared/lib";
import { PDFPage } from "./pdf.page";

type Options = {
	dividers: DividerRender[];
	layout: DividerLayout;
	pageLayouts: PageLayout<DividerRender>[];
	pageFormat: PageFormat;
	icons: IconMapping;
	dpi: DPI;
	bleedEnabled: boolean;
};

export class PDFService {
	protected readonly font: PDFFontService;

	constructor(
		public readonly pdf: PDFDocument,
		public readonly options: Options,
	) {
		this.font = new PDFFontService(pdf);

		this.create = this.create.bind(this);
	}

	async create() {
		const { pageLayouts, ...pageOptions } = this.options;

		for (const pageLayout of pageLayouts) {
			const page = new PDFPage({ pageLayout, ...pageOptions });

			await page.addTo(this.pdf, {
				font: this.font,
			});
		}

		return await this.pdf.save();
	}

	static async from(options: Options) {
		const pdf = await PDFDocument.create();
		return new PDFService(pdf, options);
	}
}

PDFService.from = PDFService.from.bind(PDFService);
