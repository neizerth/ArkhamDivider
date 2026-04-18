import type { Buffer } from "buffer";
import { cmyk } from "@/modules/core/color/shared/lib";
import { i18n } from "@/modules/core/i18n/shared/config";
import type {
	DrawCreditsOptions,
	RenderCreditsParams,
} from "@/modules/pdf/shared/model/credits";
import { localeData } from "@/modules/print/entities/ui/ProjectCredits/config";
import { creditsParams as creditsLayoutMm } from "@/modules/print/shared/config";
import {
	fromMm2Pt,
	getPageSize,
	hasPageCreditsFreeSpace,
} from "@/modules/print/shared/lib";
import type { BoxSize } from "@/shared/model";
import { getQRPngBuffer } from "@/shared/util";
import type { PDFImageService } from "./PDFImageService";
import type { PDFTextService } from "./PDFTextService";

const color = cmyk(0, 0, 0, 100);

type ColumnMeasure = {
	textWidth: number;
	columnHeight: number;
	label: string;
	urlLine: string;
};

type CreditsComputedLayout = {
	pageWidth: number;
	pageHeight: number;
	projectColumn: ColumnMeasure;
	projectBlockWidth: number;
	blockHeight: number;
	creditsBlockTopY: number;
	projectBlockTopY: number;
};

export class PDFCreditsService {
	protected renderParams: RenderCreditsParams | null = null;
	protected layout: CreditsComputedLayout | null = null;

	protected getRenderParams(): RenderCreditsParams {
		const p = this.renderParams;
		if (!p) {
			throw new Error("PDFCreditsService: missing render params");
		}
		return p;
	}

	protected getLayout(): CreditsComputedLayout {
		const layout = this.layout;
		if (!layout) {
			throw new Error("PDFCreditsService: missing layout");
		}
		return layout;
	}

	constructor(
		public readonly doc: PDFKit.PDFDocument,
		protected readonly text: PDFTextService,
		protected readonly image: PDFImageService,
	) {}

	/** Spacing derived from print `creditsParams` in PDF points. */
	protected get creditsSpacing() {
		const mm = fromMm2Pt();
		const c = creditsLayoutMm;
		return {
			pad: mm(c.blockPadding),
			size: mm(c.qrDisplaySize),
			fontSize: mm(c.textFontSize),
			gap: mm(c.rowGap),
			lineGap: mm(c.textLineGap),
			maxBlockHeight: mm(c.contentSize - c.blockPadding),
		};
	}

	async draw(options: DrawCreditsOptions) {
		const params = this.resolvePdfCreditsDrawParams(options);
		if (!params) {
			return;
		}
		this.renderParams = params;
		this.layout = this.computePdfCreditsLayout();
		await this.paintCredits();
	}

	protected bufferToArrayBuffer(buffer: Buffer) {
		return buffer.buffer.slice(
			buffer.byteOffset,
			buffer.byteOffset + buffer.byteLength,
		) as ArrayBuffer;
	}

	protected computePdfCreditsLayout(): CreditsComputedLayout {
		const params = this.getRenderParams();
		const { projectUrl, projectLabel } = params;
		const spacing = this.creditsSpacing;
		const { pad, size, gap, maxBlockHeight, fontSize, lineGap } = spacing;

		const { width: pageWidth, height: pageHeight } = this.doc.page;

		/** Reserved width for the two single-line strings (no wrapping). */
		const textWidth = pageWidth * 0.42;
		const textStackHeight = fontSize * 2 + lineGap;
		const columnHeight = Math.min(
			maxBlockHeight,
			Math.max(size, textStackHeight),
		);
		const projectColumn: ColumnMeasure = {
			textWidth,
			columnHeight,
			label: projectLabel,
			urlLine: projectUrl,
		};

		const projectBlockWidth = projectColumn.textWidth + gap + size;

		const blockHeight = projectColumn.columnHeight;

		const creditsBlockTopY = pageHeight - pad - blockHeight;
		const projectBlockTopY =
			creditsBlockTopY + (blockHeight - projectColumn.columnHeight) / 2;

		return {
			pageWidth,
			pageHeight,
			projectColumn,
			projectBlockWidth,
			blockHeight,
			creditsBlockTopY,
			projectBlockTopY,
		};
	}

	protected buildPdfCreditsRenderParams(options: {
		/** Page size in pt (PDF units). */
		pageSize: BoxSize;
		language: string;
	}): RenderCreditsParams {
		const { pageSize, language } = options;

		const locale = localeData[language] ?? localeData.en;

		return {
			pageSize,
			projectUrl: locale.url,
			projectLabel: i18n.t("Support project on {{platform}}", {
				platform: locale.platform,
			}),
		};
	}

	protected resolvePdfCreditsDrawParams(
		options: Omit<DrawCreditsOptions, "layout">,
	): RenderCreditsParams | null {
		const {
			pageFormat,
			layoutGrid,
			singleItemPerPage,
			cropmarksEnabled,
			pdfLayout,
		} = options;

		if (!pdfLayout.isLast) {
			return null;
		}

		const pageSizeMm = getPageSize({
			units: "mm",
			pageFormat,
			unitSize: layoutGrid.unitSize,
			singleItemPerPage,
			cropmarksEnabled,
		});
		if (
			!hasPageCreditsFreeSpace({
				pageLayout: pdfLayout,
				pageSize: pageSizeMm,
			})
		) {
			return null;
		}

		return this.buildPdfCreditsRenderParams({
			pageSize: options.pageSize,
			language: options.language,
		});
	}

	protected drawQRLink(options: {
		x: number;
		y: number;
		width: number;
		height: number;
		url: string;
	}) {
		const { x, y, width, height, url } = options;
		const { doc } = this;
		doc.save();
		doc.strokeColor(cmyk(0, 0, 0, 8));
		doc.lineWidth(0.25);
		doc.rect(x, y, width, height).stroke();
		doc.link(x, y, width, height, url);
		doc.restore();
	}

	/** Two baselines for label + URL, vertically centered in [qrTopY, qrTopY + size]. */
	protected textBaselinesInQrColumn(qrTopY: number) {
		const { fontSize, lineGap, size } = this.creditsSpacing;
		const stackHeight = fontSize * 2 + lineGap;
		const delta = Math.max(0, (size - stackHeight) / 2);
		const top = qrTopY + delta;
		return {
			yLabel: top + fontSize * 0.2,
			yUrl: top + fontSize + lineGap + fontSize * 0.2,
		};
	}

	protected async paintCredits() {
		const layout = this.getLayout();
		const { pageWidth, projectBlockWidth } = layout;
		const { pad } = this.creditsSpacing;

		const leftX = pageWidth - pad - projectBlockWidth;
		await this.paintProjectBlock(leftX);
	}

	protected async paintProjectBlock(leftX: number) {
		const params = this.getRenderParams();
		const layout = this.getLayout();
		const { projectUrl } = params;
		const { projectColumn, projectBlockTopY } = layout;
		const { fontSize, gap, size } = this.creditsSpacing;
		const { yLabel, yUrl } = this.textBaselinesInQrColumn(projectBlockTopY);
		const qrLeftX = leftX + projectColumn.textWidth + gap;
		const textColumnWidth = projectColumn.textWidth;

		// Right-align without `width`: PDFKit’s line wrapper with `width` near the page bottom
		// can spill onto extra pages; single-line `x` + measured width avoids that.
		const measureOpts = { fontFamily: "ArnoPro" as const, fontSize };
		const labelW = await this.text.measureTextWidth({
			...measureOpts,
			text: projectColumn.label,
		});
		const urlW = await this.text.measureTextWidth({
			...measureOpts,
			text: projectColumn.urlLine,
		});
		const xLabel = leftX + textColumnWidth - labelW;
		const xUrl = leftX + textColumnWidth - urlW;

		await this.text.draw(projectColumn.label, {
			fontFamily: "ArnoPro",
			fontSize,
			x: xLabel,
			y: yLabel,
			lineBreak: false,
			color,
		});
		await this.text.draw(projectColumn.urlLine, {
			fontFamily: "ArnoPro",
			fontSize,
			x: xUrl,
			y: yUrl,
			lineBreak: false,
			underline: true,
			color,
		});
		const qrBuf = await getQRPngBuffer({ url: projectUrl, size });
		this.image.drawImage(this.bufferToArrayBuffer(qrBuf), {
			x: qrLeftX,
			y: projectBlockTopY,
			width: size,
			height: size,
		});
		this.drawQRLink({
			x: qrLeftX,
			y: projectBlockTopY,
			width: size,
			height: size,
			url: projectUrl,
		});
	}
}
