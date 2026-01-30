import { cmyk } from "pdf-lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { fromDPI } from "@/modules/print/shared/lib";
import { withStoryTranslation } from "@/modules/story/shared/lib";

export const ClassicDividerPDF: PDFDivider = async (props, ctx) => {
	const { story, fontSizeScale = 100 } = props;
	const { text, dpi, layout, bleedEnabled } = ctx;
	const bleed = bleedEnabled ? layout.bleed : 0;
	const t = withStoryTranslation(story);

	const title = props.customTitle ?? t(props.title);

	const mm = fromDPI(dpi);

	const rel = (value: number) => mm(value + bleed);

	const fontSize = mm((fontSizeScale / 100) * 4.58);

	await text.draw(title, {
		left: rel(8.66),
		top: rel(2.8),
		right: rel(10.16),
		size: fontSize,
		align: "center",
		overprint: true,
		fontFamily: "Conkordia",
		color: cmyk(0, 0, 0, 1),
	});
};
