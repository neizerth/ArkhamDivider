import { cmyk } from "@/modules/core/color/shared/lib";
import { i18n } from "@/modules/core/i18n/shared/config/i18n";
import { getDividerIcon } from "@/modules/divider/features/lib";
import { getDefaultDividerFontFamily } from "@/modules/divider/shared/lib";
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic";
import type { PDFDivider } from "@/modules/pdf/shared/model";
import { withStoryTranslation } from "@/modules/story/shared/lib";
import {
	arkhamStarterLayoutObjects as O,
	arkhamStarterSharedPositions as P,
} from "../../../config";
import {
	get3mmDividerDefaultIcon,
	get3mmDividerTitleObject,
	get3mmDividerXPCostData,
	get3mmSideStripPosition,
	show3mmDividerIconCorner,
	show3mmDividerPlayerIcon,
} from "../../../lib";
import type { ArkhamStarterDividerParams } from "../../../model";

const black = cmyk(0, 0, 0, 100);
const white = cmyk(0, 0, 0, 0);
// UI uses #352e1f; PDF rendering uses black stroke for print safety.
const storyStroke = black;
const storyStrokeWidthMm = 0.3;

type Box = { x: number; y: number; width: number; height: number };
type Rect = Box;

type RotateInBoxOptions = {
	x: number;
	y: number;
	width: number;
	height: number;
	angle: number;
	origin: "topLeft" | "bottomLeft";
};

async function rotateInBox(
	doc: PDFKit.PDFDocument,
	options: RotateInBoxOptions,
	cb: (box: Box) => Promise<void> | void,
) {
	const { x, y, width, height, angle, origin } = options;

	const originX = x;
	const originY = origin === "bottomLeft" ? y + height : y;

	doc.save();
	doc.translate(originX, originY);
	doc.rotate(angle);

	const localX = 0;
	const localY = origin === "bottomLeft" ? -height : 0;
	await cb({ x: localX, y: localY, width, height });

	doc.restore();
}

export const ArkhamStarterDividerPDF: PDFDivider<
	ArkhamStarterDividerParams
> = async (props, ctx) => {
	const { story, fontSizeScale = 100 } = props;
	const { text, lasercut, unit, language } = ctx;

	const params = props.params as ArkhamStarterDividerParams | undefined;

	const t = withStoryTranslation(story);

	const titleObject = get3mmDividerTitleObject(props);
	const side = get3mmSideStripPosition(props);

	const xpCost = getDividerXPCost(props);
	const xpCostData = xpCost ? get3mmDividerXPCostData(xpCost) : null;
	const defaultXP =
		xpCostData &&
		i18n.t(xpCostData.key, {
			// avoid relying on global i18n state in PDF rendering
			lng: language,
			...xpCostData.data,
		});

	const title = params?.customTitle ?? t(props.title);
	const storyTitle = params?.customStoryTitle ?? props.story?.name ?? "";
	const xp = params?.customXP ?? defaultXP ?? "";

	const titleFontFamily = getDefaultDividerFontFamily(language);
	const storyFontFamily = getDefaultDividerFontFamily(language);

	const bleed = unit.fromBleed();
	const { mm } = unit;

	lasercut.drawRect({
		x: bleed.x(),
		y: bleed.y(),
		width: bleed.width(),
		height: bleed.height(),
	});

	const defaultIcon = get3mmDividerDefaultIcon(props);

	const icon = getDividerIcon({
		divider: props,
		param: "icon",
		defaultIcon,
	});

	const playerIcon = getDividerIcon({
		divider: props,
		param: "playerIcon",
		defaultIcon: props.story?.icon,
	});

	const showCornerIcon = show3mmDividerIconCorner(props);
	const showPlayerIcon = show3mmDividerPlayerIcon(props);

	const titleDraw = async (box: Box, T: typeof titleObject) => {
		const fontSize = mm((fontSizeScale / 100) * T.fontSize);
		const textHeight = mm(T.height);
		await text.draw(title, {
			x: box.x + mm(T.left),
			y: box.y + mm(T.top) + textHeight / 2,
			width: box.width - mm(T.left) - mm(T.right),
			height: textHeight,
			fontSize,
			align: "left",
			baseline: "middle",
			overprint: true,
			fontFamily: titleFontFamily,
			color: black,
		});
	};

	const storyTitleStrokeDraw = async (box: Box, coords: Rect) => {
		if (!props.story) {
			return;
		}
		const storyScale = params?.customStoryTitleFontSizeScale ?? 100;
		const fontSize = mm((storyScale / 100) * O.storyTitle.fontSize);

		// Ensure font is loaded into PDFKit state for stroke pass.
		await text.measureTextWidth(storyTitle, {
			fontFamily: storyFontFamily,
			fontSize,
		});

		const x = box.x + coords.x;
		const y = box.y + coords.y + coords.height / 2;

		// Stroke layer (like Classic: stroke is rendered, then text is drawn on top later)
		ctx.doc.save();
		ctx.doc.strokeColor(storyStroke);
		ctx.doc.lineWidth(mm(storyStrokeWidthMm));
		ctx.doc.text(storyTitle, x, y, {
			width: coords.width,
			height: coords.height,
			align: "left",
			baseline: "middle",
			stroke: true,
			fill: false,
			lineBreak: false,
		});
		ctx.doc.restore();
	};

	const storyTitleDraw = async (box: Box, coords: Rect) => {
		if (!props.story) {
			return;
		}
		const storyScale = params?.customStoryTitleFontSizeScale ?? 100;
		const fontSize = mm((storyScale / 100) * O.storyTitle.fontSize);

		const x = box.x + coords.x;
		const y = box.y + coords.y + coords.height / 2;

		// Fill layer
		await text.draw(storyTitle, {
			x,
			y,
			width: coords.width,
			height: coords.height,
			fontSize,
			align: "left",
			baseline: "middle",
			overprint: false,
			fontFamily: storyFontFamily,
			color: white,
		});
	};

	const xpDraw = async (box: Box, coords: Rect) => {
		if (!xpCost && !params?.customXP) {
			return;
		}
		const xpScale = params?.customXPFontSizeScale ?? 100;
		const baseFontSize = mm((xpScale / 100) * O.xp.fontSize);
		const measuredWidth = await text.measureTextWidth(xp, {
			fontFamily: "Arkhamic",
			fontSize: baseFontSize,
		});
		const widthFitScale =
			measuredWidth > coords.width ? (coords.width / measuredWidth) * 0.98 : 1;
		// In UI `use-fit-text` also fits to height; approximate in PDF by capping font size.
		const heightFitScale = (coords.height / baseFontSize) * 0.92;
		const fitScale = Math.min(1, widthFitScale, heightFitScale);
		const fontSize = baseFontSize * fitScale;
		await text.draw(xp, {
			x: box.x + coords.x,
			y: box.y + coords.y + coords.height / 2,
			width: coords.width,
			height: coords.height,
			fontSize,
			align: "right",
			baseline: "middle",
			overprint: true,
			fontFamily: "Arkhamic",
			color: black,
		});
	};

	const iconDrawBase = {
		color: black,
		overprint: true,
	} as const;

	// Top header (horizontal)
	{
		const headerBox = {
			x: bleed.x(),
			y: bleed.y(),
			width: bleed.width(),
			height: bleed.height(),
		};

		if (showCornerIcon && icon) {
			await ctx.icon.draw(icon, {
				...iconDrawBase,
				x: bleed.x(O.cornerIcon.left),
				y: bleed.y(O.cornerIcon.top),
				width: mm(O.cornerIcon.width),
				height: mm(O.cornerIcon.height),
				fontSize: mm(O.cornerIcon.fontSize),
			});
		}

		if (showPlayerIcon && playerIcon) {
			await ctx.icon.draw(playerIcon, {
				...iconDrawBase,
				x: bleed.x(titleObject.playerIconLeft),
				y: bleed.y(O.storyIcon.top),
				width: mm(O.storyIcon.width),
				height: mm(O.storyIcon.height),
				fontSize: mm(O.storyIcon.fontSize),
			});
		}

		await titleDraw(headerBox, titleObject);

		await storyTitleStrokeDraw(headerBox, {
			x: bleed.width() - mm(O.storyTitle.right) - mm(O.storyTitle.width),
			y: mm(O.storyTitle.top),
			width: mm(O.storyTitle.width),
			height: mm(O.storyTitle.height),
		});

		await storyTitleDraw(headerBox, {
			x: bleed.width() - mm(O.storyTitle.right) - mm(O.storyTitle.width),
			y: mm(O.storyTitle.top),
			width: mm(O.storyTitle.width),
			height: mm(O.storyTitle.height),
		});

		await xpDraw(headerBox, {
			x: 0,
			y: mm(O.xp.top),
			width: bleed.width(0, O.xp.right),
			height: mm(O.xp.height),
		});
	}

	// Side header (vertical; rotated -90deg in UI)
	{
		const sideHeader = {
			x: bleed.x(P.sideHeaderBox.left),
			y: bleed.bottom(P.sideHeaderBox.bottom) - mm(P.sideHeaderBox.height),
			width: mm(P.sideHeaderBox.width),
			height: mm(P.sideHeaderBox.height),
		};

		await rotateInBox(
			ctx.doc,
			{
				x: sideHeader.x,
				y: sideHeader.y,
				width: sideHeader.width,
				height: sideHeader.height,
				angle: -90,
				origin: "bottomLeft",
			},
			async (box) => {
				if (showCornerIcon && icon) {
					await ctx.icon.draw(icon, {
						...iconDrawBase,
						x: box.x,
						y: box.y,
						width: mm(O.cornerIcon.width),
						height: mm(O.cornerIcon.height),
						fontSize: mm(O.cornerIcon.fontSize),
					});
				}

				if (showPlayerIcon && playerIcon) {
					await ctx.icon.draw(playerIcon, {
						...iconDrawBase,
						x: box.x + mm(titleObject.vertical.playerIconLeft),
						y: box.y + mm(O.storyIcon.top),
						width: mm(O.storyIcon.width),
						height: mm(O.storyIcon.height),
						fontSize: mm(O.storyIcon.fontSize),
					});
				}

				const verticalTitle = {
					...titleObject,
					left: titleObject.vertical.left,
					right: titleObject.vertical.right,
					height: titleObject.vertical.height,
					// UI: vertical title reuses the same fontSize as horizontal; only the box changes.
					fontSize: titleObject.fontSize,
					top: 0,
				};
				await titleDraw(box, verticalTitle as typeof titleObject);

				const storyLeft =
					side === "left"
						? O.storyTitle.right
						: P.sideHeaderBox.width - O.storyTitle.right - O.storyTitle.width;

				await storyTitleStrokeDraw(box, {
					x: mm(storyLeft),
					y: mm(O.storyTitle.top),
					width: mm(O.storyTitle.width),
					height: mm(O.storyTitle.height),
				});

				await storyTitleDraw(box, {
					x: mm(storyLeft),
					y: mm(O.storyTitle.top),
					width: mm(O.storyTitle.width),
					height: mm(O.storyTitle.height),
				});

				const xpRight =
					side === "left" ? O.xp.vertical.right : O.xp.vertical.withStory.right;

				await xpDraw(box, {
					x: 0,
					y: mm(O.xp.top),
					width: box.width - mm(xpRight),
					height: mm(O.xp.height),
				});
			},
		);
	}
};
