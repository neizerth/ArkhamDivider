import { isFunction } from "ramda-adjunct";

export const destroyPDFDocument = (doc: PDFKit.PDFDocument) => {
	if ("destroy" in doc && isFunction(doc.destroy)) {
		try {
			doc.destroy();
		} catch {
			console.error("Failed to destroy PDF document", doc);
		}
	}
};
