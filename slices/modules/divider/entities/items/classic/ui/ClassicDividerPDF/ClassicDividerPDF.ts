import { cmyk } from "@/modules/pdf/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { fromDPI } from "@/modules/print/shared/lib";
import { withStoryTranslation } from "@/modules/story/shared/lib";

// PDFKit expects CMYK in 0–100; 100 = full black
// const textColor = cmyk(0, 17.39, 26.09, 81.96);
const textColor = cmyk(0, 0, 0, 100);

export const ClassicDividerPDF: PDFDivider = async (props, ctx) => {
	const { story, fontSizeScale = 100, position } = props;
	const { text, dpi, layout, bleedEnabled } = ctx;
	const bleed = bleedEnabled ? layout.bleed : 0;
	const t = withStoryTranslation(story);

	const title = props.customTitle ?? t(props.title);

	const mm = fromDPI(dpi);

	const x = (value: number) => position.x + mm(value + bleed);
	const y = (value: number) => position.y + mm(value + bleed);

	const fontSize = mm((fontSizeScale / 100) * 4.58);

	await text.draw(title, {
		x: x(3),
		y: y(12),
		// width: mm(size.width),
		fontSize,
		align: "left",
		// align: "center",
		overprint: true,
		fontFamily: "Conkordia",
		color: textColor,
	});
};
