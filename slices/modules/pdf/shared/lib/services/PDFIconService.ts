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

export type DrawIconOptions = DrawTextOptions & {
	icon: string;
	fontSize: number;
	manifest?: IconPositionManifest;
};

export class PDFIconService {
	constructor(
		protected readonly text: PDFTextService,
		protected readonly icons: IconMapping,
	) {}

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

	protected getIcon(
		options: BaseIconProps & {
			x: number;
			y: number;
			fontSize: number;
			manifest?: IconPositionManifest;
		},
	) {
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

		const size = getIconScale({
			scaleType,
			scaleFactor,
			ratio,
			circled,
		});

		const { left, top, fontSize } = this.getCorrection({
			id,
			fontSize: options.fontSize * size,
			manifest,
		});

		const position = {
			x: options.x + left,
			y: options.y + top,
		};

		return {
			content,
			fontSize,
			...position,
		};
	}

	async draw(options: DrawIconOptions) {
		const icon = this.getIcon(options);
		if (!icon) {
			return;
		}
		const { fontFamily, color } = options;
		const { content, ...textOptions } = icon;
		await this.text.draw(content, {
			fontFamily,
			color,
			...textOptions,
		});
	}
}
