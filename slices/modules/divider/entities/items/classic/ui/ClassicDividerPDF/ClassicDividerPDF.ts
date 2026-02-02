import { cmyk } from "@/modules/pdf/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";

const color = cmyk(0, 0, 0, 100);

export const ClassicDividerPDF: PDFDivider = async (props, ctx) => {
	const { story, fontSizeScale = 100 } = props;
	const { text, unit, icon } = ctx;
	const t = withStoryTranslation(story);

	const title = props.customTitle ?? t(props.title);

	const fontSize = unit.mm((fontSizeScale / 100) * 4.58);
	const bleed = unit.fromBleed();

	await text.draw(title, {
		x: bleed.x(8.66),
		y: bleed.y(4),
		width: bleed.width(8.66, 10.16),
		height: unit.mm(7),
		fontSize,
		align: "center",
		overprint: true,
		fontFamily: "Conkordia",
		color,
	});

	if (props.icon) {
		const smallIcon = bleed.box({
			top: 2,
			right: 0.9,
			width: 8.33,
			height: 8.33,
		});

		await icon.draw(props.icon, {
			x: smallIcon.x(),
			y: smallIcon.y(),
			iconOptions: {
				scaleType: "circle",
				scaleFactor: {
					circled: 0.9,
				},
			},
			fontSize: unit.mm(8),
			width: smallIcon.width(),
			height: smallIcon.height(),
			overprint: true,
			color,
		});

		await icon.draw(props.icon, {
			x: bleed.x(),
			y: bleed.y(2),
			width: bleed.width(),
			height: bleed.height(),
			fontSize: unit.mm(50),
			color,
			opacity: 0.05,
			overprint: true,
		});
	}
};
