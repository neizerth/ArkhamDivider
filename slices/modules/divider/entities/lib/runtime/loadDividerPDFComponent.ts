import type { PDFDivider } from "@/modules/pdf/shared/model";

/** Dynamic import so PDF renderers pick up HMR updates (saga keeps a stale static import otherwise). */
export async function loadDividerPDFComponent(
	categoryId: string,
): Promise<PDFDivider<unknown> | undefined> {
	const { dividerPDFComponents } = await import(
		"@/modules/divider/entities/items/pdf"
	);
	return dividerPDFComponents[categoryId];
}
