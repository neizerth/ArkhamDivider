import { cmyk } from "@/modules/pdf/shared/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";
import { classicDividerObjects as O } from "../../config";

const color = cmyk(0, 0, 0, 100);

export const ClassicDividerPDF: PDFDivider = async (props, ctx) => {
	const { story, fontSizeScale = 100 } = props;
	const { text, unit, icon } = ctx;
	const t = withStoryTranslation(story);

	const title = props.customTitle ?? t(props.title);

	const fontSize = unit.mm((fontSizeScale / 100) * 4.58);
	const bleed = unit.fromBleed();

	await text.draw(title, {
		x: bleed.x(O.text.default.left),
		y: bleed.y(O.text.ru.top),
		width: bleed.width(O.text.default.left, O.text.default.right),
		height: unit.mm(O.text.default.height),
		fontSize,
		align: "center",
		overprint: true,
		fontFamily: "Conkordia",
		color,
	});

	if (props.icon) {
		const smallIcon = bleed.box({
			top: O.icon.top,
			right: O.icon.right,
			width: O.icon.size,
			height: O.icon.size,
		});

		await icon.draw(props.icon, {
			x: smallIcon.x(),
			y: smallIcon.y(),
			iconOptions: O.icon.params,
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
			fontSize: unit.mm(O.backgroundIcon.fontSize),
			color,
			opacity: O.backgroundIcon.opacity,
			overprint: true,
		});
	}
};
