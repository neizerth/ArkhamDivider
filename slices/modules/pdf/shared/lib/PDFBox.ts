import { mm2pt } from "@/modules/print/shared/lib";
import type { DPI } from "@/modules/print/shared/model";
import type { BoxPosition, BoxSize } from "@/shared/model";

export type PDFBoxOptions = {
	dpi: DPI;
	position: { x: number; y: number };
	/** Width and height in px or pt */
	size: BoxSize;
};

type CreateBoxOptions = Partial<BoxPosition & BoxSize>;

export class PDFBox {
	public readonly mm: (value: number) => number;
	constructor(
		public readonly doc: PDFKit.PDFDocument,
		public readonly options: PDFBoxOptions,
	) {
		this.mm = mm2pt;
	}

	right(value = 0) {
		const { position, size } = this.options;
		return position.x + size.width - this.mm(value);
	}

	bottom(value = 0) {
		const { position, size } = this.options;
		return position.y + size.height - this.mm(value);
	}

	width(left = 0, right = 0) {
		return this.options.size.width - this.mm(left) - this.mm(right);
	}

	height(top = 0, bottom = 0) {
		return this.options.size.height - this.mm(top) - this.mm(bottom);
	}

	x(value = 0) {
		const { position } = this.options;
		return position.x + this.mm(value);
	}

	y(value = 0) {
		const { position } = this.options;
		return position.y + this.mm(value);
	}

	box(options: CreateBoxOptions) {
		const { top = 0, right = 0, bottom = 0, left = 0 } = options;

		const size = {
			width: options.width ? this.mm(options.width) : this.width(left, right),
			height: options.height
				? this.mm(options.height)
				: this.height(top, bottom),
		};

		const x = right ? this.right(right) - size.width : this.x(left);
		const y = bottom ? this.bottom(bottom) - size.height : this.y(top);

		const { dpi } = this.options;

		const position = {
			x,
			y,
		};

		return new PDFBox(this.doc, {
			dpi,
			position,
			size,
		});
	}
}
