import type { Color } from "pdf-lib";
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
import type { PDFTextService } from "./pdf.text.service";

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

	getIcon(
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
			left: options.x + left,
			top: options.y + top,
		};

		return {
			content,
			size: fontSize,
			...position,
		};
	}

	async draw(options: {
		icon: string;
		x: number;
		y: number;
		fontSize: number;
		color?: Color;
		manifest?: IconPositionManifest;
	}) {
		const icon = this.getIcon(options);
		if (!icon) {
			return;
		}
		const { color } = options;

		await this.text.draw(icon.content, {
			...icon,
			fontFamily: "ArkhamIcons",
			color,
		});
	}
}
