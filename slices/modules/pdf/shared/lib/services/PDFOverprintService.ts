import type * as PDFKit from "pdfkit";

export class PDFOverprintService {
	private lastPage: PDFKit.PDFPage | null = null;
	private ref: PDFKit.PDFKitReference | null = null;
	private name: string | null = null;
	private id = 0;

	constructor(private readonly doc: PDFKit.PDFDocument) {}

	enable() {
		const { page } = this.doc;
		if (page !== this.lastPage) {
			this.lastPage = page;
			this.id += 1;
			this.name = `Gs${this.id}`;
			this.ref = this.doc.ref({
				Type: "ExtGState",
				OP: true,
				op: true,
				OPM: 1,
			});
			(this.ref as { end(chunk?: unknown): void }).end();
			page.ext_gstates[this.name] = this.ref;
		}

		this.doc.save();
		this.doc.addContent(`/${this.name} gs`);
	}

	disable() {
		this.doc.restore();
	}
}
