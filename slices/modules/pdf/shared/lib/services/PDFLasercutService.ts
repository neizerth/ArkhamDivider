import { DEFAULT_CORNER_RADIUS } from "@/modules/print/shared/config";
import { fromMm2Pt } from "@/modules/print/shared/lib";
import {
	LASERCUT_COLOR,
	LASERCUT_GAP,
	LASERCUT_LINE_WIDTH,
} from "../../config";

type Options = {
	cornerRadiusEnabled: boolean;
	enabled: boolean;
	bleedEnabled: boolean;
};

type DrawRectOptions = {
	x: number;
	y: number;
	width: number;
	height: number;
};

export class PDFLasercutService {
	constructor(
		public readonly doc: PDFKit.PDFDocument,
		protected options: Options,
	) {}

	drawRect(options: DrawRectOptions) {
		if (!this.options.enabled) {
			return;
		}
		const { bleedEnabled, cornerRadiusEnabled } = this.options;
		const mm = fromMm2Pt();

		const gap = bleedEnabled ? mm(LASERCUT_GAP) : 0;

		const x = options.x - gap;
		const y = options.y - gap;
		const width = options.width + 2 * gap;
		const height = options.height + 2 * gap;

		const cornerRadius = cornerRadiusEnabled ? mm(DEFAULT_CORNER_RADIUS) : 0;

		this.doc
			.roundedRect(x, y, width, height, cornerRadius)
			.lineWidth(LASERCUT_LINE_WIDTH)
			.stroke(LASERCUT_COLOR);
	}
}
