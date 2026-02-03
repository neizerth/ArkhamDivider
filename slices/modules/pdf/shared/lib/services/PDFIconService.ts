import { omit } from "ramda";
import { defaultIconPositionManifest } from "@/modules/core/icon/shared/config";
import {
	getIconCorrection,
	getIconScale,
} from "@/modules/core/icon/shared/lib";
import type {
	BaseIconProps,
	IconMapping,
	IconPositionManifest,
} from "@/modules/core/icon/shared/model";
import type { DrawTextOptions, PDFTextService } from "./PDFTextService";

export type DrawIconOptions = Omit<DrawTextOptions, "fontFamily"> & {
	iconOptions?: Omit<BaseIconProps, "icon">;
	fontSize: number;
	manifest?: IconPositionManifest | false;
};

export type GetIconOptions = BaseIconProps & {
	x: number;
	y: number;
	fontSize: number;
	manifest?: IconPositionManifest | false;
};

export class PDFIconService {
	public readonly doc: PDFKit.PDFDocument;
	constructor(
		public readonly text: PDFTextService,
		public readonly icons: IconMapping,
	) {
		this.doc = text.doc;
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

	async draw(id: string, options: DrawIconOptions) {
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

		await this.text.draw(content, {
			fontFamily: "ArkhamIcons",
			...restOptions,
			fontSize,
			x,
			y,
		});
	}
}
