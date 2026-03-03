import { Buffer } from "buffer";
import { omit } from "ramda";
import { isString } from "ramda-adjunct";
import SVGtoPDF from "svg-to-pdfkit";
import { defaultIconPositionManifest } from "@/modules/core/icon/shared/config";
import {
	getIconCorrection,
	getIconScale,
} from "@/modules/core/icon/shared/lib";
import type {
	BaseIconProps,
	Icon,
	IconMapping,
	IconPositionManifest,
	MediaIcon,
	RenderedMediaIcon,
} from "@/modules/core/icon/shared/model";
import { getMediaBlob } from "@/modules/core/media/shared/lib";
import { PDFOverprintService } from "./PDFOverprintService";
import type { DrawTextOptions, PDFTextService } from "./PDFTextService";

export type DrawIconOptions = Omit<DrawTextOptions, "fontFamily"> & {
	iconOptions?: Omit<BaseIconProps, "icon">;
	fontSize: number;
	manifest?: IconPositionManifest | false;
};

export type GetIconOptions = BaseIconProps & {
	icon: string;
	x: number;
	y: number;
	fontSize: number;
	manifest?: IconPositionManifest | false;
};

export class PDFIconService {
	public readonly doc: PDFKit.PDFDocument;
	public readonly overprint: PDFOverprintService;
	constructor(
		public readonly text: PDFTextService,
		public readonly icons: IconMapping,
	) {
		this.doc = text.doc;
		this.overprint = new PDFOverprintService(this.doc);
	}

	getCorrection({
		id,
		fontSize,
		manifest,
	}: {
		id: string;
		fontSize: number;
		manifest: IconPositionManifest;
	}) {
		return getIconCorrection({
			icon: id,
			manifest,
			fontSize,
		});
	}

	protected getIcon(options: GetIconOptions) {
		const id = options.icon;
		const icon = this.icons[id];
		if (!icon) {
			return;
		}
		const {
			scaleType,
			scaleFactor,
			manifest = defaultIconPositionManifest,
		} = options;
		const { ratio, circled } = icon;
		const content = String.fromCharCode(icon.code);

		const scale = getIconScale({
			scaleType,
			scaleFactor,
			ratio,
			circled,
		});

		const initialFontSize = Math.round((options.fontSize * scale) / 100);

		if (manifest) {
			const { left, top, fontSize } = this.getCorrection({
				id,
				fontSize: initialFontSize,
				manifest,
			});

			const position = {
				x: options.x + left,
				y: options.y + top,
			};

			return {
				content,
				fontSize,
				iconParams: icon,
				...position,
			};
		}

		return {
			content,
			fontSize: initialFontSize,
			iconParams: icon,
			x: options.x,
			y: options.y,
		};
	}

	async draw(icon: Icon, options: DrawIconOptions) {
		if (isString(icon)) {
			return this.drawFontIcon(icon, options);
		}
		return this.drawMediaIcon(icon, options);
	}

	async drawMediaIcon(icon: MediaIcon, options: DrawIconOptions) {
		const { mediaId } = icon;
		const blob = await getMediaBlob(mediaId);
		if (!blob) {
			return icon.fallback && this.drawFontIcon(icon.fallback, options);
		}
		const isSVG = icon.mime.startsWith("image/svg");
		const renderedIcon: RenderedMediaIcon = {
			...icon,
			blob,
		};
		if (isSVG) {
			return this.drawSVGIcon(renderedIcon, options);
		}
		return this.drawImageIcon(renderedIcon, options);
	}

	async drawSVGIcon(icon: RenderedMediaIcon, options: DrawIconOptions) {
		const { blob, ratio } = icon;
		const { fontSize, opacity = 1, width, height, overprint, color } = options;
		let { x, y } = options;
		const svgString = await blob.text();

		const iconWidth = fontSize;
		const iconHeight = fontSize * ratio;

		if (width) {
			x += (width - iconWidth) / 2;
		}

		if (height) {
			y += (height - iconHeight) / 2;
		}
		if (overprint) {
			this.overprint.enable();
		}

		SVGtoPDF(this.doc, svgString, x, y, {
			width: iconWidth,
			height: iconHeight,
			preserveAspectRatio: "xMidYMid meet",
			colorCallback(srcColors) {
				const count = srcColors.length;
				const baseColor = [color, opacity];

				if (count === 2) {
					return baseColor;
				}

				const colors = srcColors.slice(0, count - 1).fill(baseColor);

				return [...colors, opacity];
			},
		});

		if (overprint) {
			this.overprint.disable();
		}
	}

	async drawImageIcon(icon: RenderedMediaIcon, options: DrawIconOptions) {
		const { blob, ratio } = icon;
		const { fontSize, opacity = 1, width, height } = options;
		let { x, y } = options;

		const iconWidth = fontSize;
		const iconHeight = fontSize * ratio;

		if (width) {
			x += (width - iconWidth) / 2;
		}

		if (height) {
			y += (height - iconHeight) / 2;
		}

		this.doc.opacity(opacity);
		const arrayBuffer = await blob.arrayBuffer();
		this.doc.image(Buffer.from(arrayBuffer), x, y, {
			width: iconWidth,
			height: iconHeight,
		});
		this.doc.opacity(1);
	}

	async drawFontIcon(id: string, options: DrawIconOptions) {
		const icon = this.getIcon({
			icon: id,
			...options,
			...options.iconOptions,
		});
		if (!icon) {
			return;
		}
		const { width, height } = options;
		const { content, iconParams, fontSize } = icon;

		let x = icon.x;
		let y = icon.y;

		const { ratio = 1 } = iconParams;

		if (width) {
			const iconWidth = ratio * fontSize;
			x += (width - iconWidth) / 2;
		}

		if (height) {
			const iconHeight = fontSize;
			y += (height - iconHeight) / 2;
		}

		const restOptions = omit(
			["width", "height", "iconOptions", "fontSize", "manifest"],
			options,
		);
		// Single character must not trigger line wrap / new page in PDFKit
		await this.text.draw(content, {
			fontFamily: "ArkhamIcons",
			...restOptions,
			fontSize,
			x,
			y,
			lineBreak: false,
		});
	}
}
