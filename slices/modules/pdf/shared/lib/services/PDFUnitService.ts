import { PDFBox, type PDFBoxOptions } from "../PDFBox";

type PDFUnitServiceOptions = PDFBoxOptions & {
	bleedEnabled: boolean;
	bleedSize: number;
};

export class PDFUnitService extends PDFBox {
	constructor(
		public readonly doc: PDFKit.PDFDocument,
		public readonly options: PDFUnitServiceOptions,
	) {
		super(doc, options);
	}

	fromBleed(x = 0, y = 0) {
		const offset = this.options.bleedEnabled ? this.options.bleedSize : 0;
		return this.box({
			top: offset + y,
			left: offset + x,
			right: offset + x,
			bottom: offset + y,
		});
	}
}
