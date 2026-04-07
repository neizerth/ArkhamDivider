import type { PDFDivider } from "@/modules/pdf/shared/model";

/** Trim box for investigator token layout is 25×25 mm; lasercut circle matches diameter. */
const TOKEN_DIAMETER_MM = 25;

export const InvestigatorTokensDividerPDF: PDFDivider = async (_props, ctx) => {
	const { lasercut, unit } = ctx;
	const bleed = unit.fromBleed();

	const cx = bleed.x() + bleed.width() / 2;
	const cy = bleed.y() + bleed.height() / 2;
	const radius = bleed.mm(TOKEN_DIAMETER_MM / 2);

	lasercut.drawCircle({ x: cx, y: cy, radius });
};
