import { cmyk } from "@/modules/core/color/shared/lib";
import { getDividerIcon } from "@/modules/divider/features/lib";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { chapter2Objects as O } from "../../config/common";
import { getChapter2DividerDefaultIcon } from "../../lib";
import type { Chapter2DividerProps } from "../../model/chapter2";

const blackInk = cmyk(0, 0, 0, 100);

const iconOverprint = { overprint: true, color: blackInk } as const;

export const Chapter2DividerPDF: PDFDivider<
	Chapter2DividerProps["params"]
> = async (props, ctx) => {
	const { lasercut, unit, icon, crease, layout } = ctx;
	const bleed = unit.fromBleed();

	if (layout.creasingTop) {
		crease.draw({
			x: bleed.x(),
			y: bleed.y(),
			offset: unit.mm(layout.creasingTop),
			width: bleed.width(),
		});
	}

	lasercut.drawRect({
		x: bleed.x(),
		y: bleed.y(),
		width: bleed.width(),
		height: bleed.height(),
	});

	const defaultIcon = getChapter2DividerDefaultIcon(props);

	const foregroundIcon = getDividerIcon({
		divider: props,
		param: "icon",
		defaultIcon,
	});

	const backgroundIcon = getDividerIcon({
		divider: props,
		param: "backgroundIcon",
		defaultIcon,
	});

	if (backgroundIcon) {
		const box = bleed.box({
			top: O.background.top,
			left: O.background.left,
			width: O.background.width,
			height: O.background.height,
		});
		await icon.draw(backgroundIcon, {
			...iconOverprint,
			x: box.x(),
			y: box.y(),
			width: box.width(),
			height: box.height(),
			fontSize: unit.mm(O.background.fontSize),
			opacity: O.background.opacity,
			manifest: false,
		});
	}

	if (foregroundIcon) {
		const box = bleed.box({
			top: O.icon.top,
			left: O.icon.left,
			width: O.icon.width,
			height: O.icon.height,
		});
		await icon.draw(foregroundIcon, {
			...iconOverprint,
			x: box.x(),
			y: box.y(),
			width: box.width(),
			height: box.height(),
			fontSize: unit.mm(O.icon.fontSize),
			iconOptions: { scaleType: "circle" },
			manifest: false,
		});
	}
};
