import { fromMm2Pt } from "@/modules/print/shared/lib";
import {
	type GetPageCounterTextOptions,
	getPageCounterText,
} from "@/modules/print/shared/lib/logic/getPageCounterText";
import type { BoxSize } from "@/shared/model";
import { cmyk } from "../color";
import type { PDFTextService } from "./PDFTextService";

type DrawCounterOptions = GetPageCounterTextOptions;

export class PDFCounterService {
	constructor(
		public readonly text: PDFTextService,
		/** page size in pt */
		protected readonly pageSize: BoxSize,
	) {
		this.draw = this.draw.bind(this);
	}

	draw(options: DrawCounterOptions): Promise<void> {
		const { pageSize } = this;
		const label = getPageCounterText(options);

		const mm = fromMm2Pt();

		const x = mm(1.3);
		const y = mm(1.5);
		const width = pageSize.width - 2 * x;

		return this.text.draw(label, {
			fontFamily: "Helvetica",
			y,
			x,
			width,
			align: "right",
			fontSize: mm(2.2),
			color: cmyk(0, 0, 0, 100),
			overprint: true,
		});
	}
}
