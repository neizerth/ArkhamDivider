import { cmyk } from "@/modules/core/color/shared/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { simpleStickerIcon, simpleStickerIconScale } from "../../config";
import type { SimpleStickerProps } from "../../model";

const black = cmyk(0, 0, 0, 100);

export const SimpleStickerPDF: PDFDivider<
	SimpleStickerProps["params"]
> = async (props, ctx) => {
	const { icon, lasercut, unit, layout } = ctx;
	const bleed = unit.fromBleed();

	// Layout size is a square; sticker is a circle within it.
	const diameterMm = layout.size.width;

	const cx = bleed.x() + bleed.width() / 2;
	const cy = bleed.y() + bleed.height() / 2;
	const radius = unit.mm(diameterMm / 2);

	lasercut.drawCircle({ x: cx, y: cy, radius });

	const stickerIcon = getDividerIcon({
		divider: props,
		param: "icon",
		defaultIcon: props.icon,
	});

	const iconSizeMm = diameterMm * simpleStickerIconScale;
	const iconOffsetMm = (diameterMm - iconSizeMm) / 2;

	const iconBox = bleed.box({
		top: iconOffsetMm,
		left: iconOffsetMm,
		width: iconSizeMm,
		height: iconSizeMm,
	});

	if (!stickerIcon) {
		return;
	}

	await icon.draw(stickerIcon, {
		x: iconBox.x(),
		y: iconBox.y(),
		width: iconBox.width(),
		height: iconBox.height(),
		fontSize: unit.mm(diameterMm * simpleStickerIcon.fontSizeScale),
		iconOptions: { scaleType: "circle" },
		color: black,
		overprint: true,
	});
};
