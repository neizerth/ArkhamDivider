import { Box, Tooltip } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { isEmptyIcon } from "@/modules/core/icon/shared/lib";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import {
	getDividerFaction,
	setAllDividersParam,
	useTabPosition,
	useTabSize,
} from "@/modules/divider/shared/lib";
import { usePrintSx, usePrintUnitCallback } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppDispatch } from "@/shared/lib";
import { FitInput, Image } from "@/shared/ui";
import { arkhamIndexDividerBaseUrl } from "../../../config";
import {
	getArkhamIndexDividerIconLeft,
	getArkhamIndexDividerSideObject,
	getArkhamIndexDividerTabLeft,
	getArkhamIndexDividerTabWidth,
	getArkhamIndexSideText,
	showArkhamIndexDividerTabIcon,
	showArkhamIndexDividerTabTitle,
	showArkhamIndexSideTextSx,
	useArkhamIndexIndent,
} from "../../../lib";
import { useArkhamIndexContext } from "../../ArkhamIndexContext";
import { ArkhamIndexDividerTabTitle as TabTitle } from "../ArkhamIndexDividerTabTitle";
// import * as C from "./ArkhamIndexDividerTab.components";
import * as S from "./ArkhamIndexDividerTab.styles";

const backgroundImage = `${arkhamIndexDividerBaseUrl}/icon-background.avif`;

const leftPosition = { position: "left" } as const;
const rightPosition = { position: "right" } as const;

const tabSizes = [1, 2, 3, "full"];

export function ArkhamIndexDividerTab() {
	const { t } = useTranslation();
	const { layout, tabSize, tabIndex, divider, sxOptions } =
		useArkhamIndexContext();

	const dispatch = useAppDispatch();

	const tabWidths = sxOptions.objects.tab.width;
	const tabSideWidth = sxOptions.objects.tab.sideWidth;
	const iconWidth = sxOptions.objects.icon.width;

	const { cornerRadius } = sxOptions.objects;
	const tabHeight = sxOptions.objects.tab.height;
	const { width } = layout.size;
	const tabWidth = getArkhamIndexDividerTabWidth({
		tabWidths,
		tabSize,
		width,
	});

	const getDividerIcon = useDividerIcon({
		dividerId: divider.id,
	});

	const [icon, selectIcon] = getDividerIcon({
		param: "icon",
		defaultIcon: divider.icon,
	});

	const tabLeft = getArkhamIndexDividerTabLeft({
		tabSize,
		tabIndex,
		tabWidths,
		width,
		cornerRadius,
	});
	const left = getArkhamIndexDividerIconLeft({
		tabSize,
		tabLeft,
		tabWidth,
		tabSideWidth,
		iconWidth,
		indentSize: sxOptions.indentSize,
	});

	const showGlyph = showArkhamIndexDividerTabIcon(divider);
	const showIcon = !isEmptyIcon(icon);

	const tabSxOptions = useMemo(
		() => ({
			...sxOptions,
			iconLeft: left,
			showIcon,
			tabWidth,
			tabLeft,
		}),
		[left, sxOptions, tabWidth, tabLeft, showIcon],
	);

	const getPrintSx = usePrintSx(tabSxOptions);

	const sideOptions = useMemo(() => {
		const sideObject = getArkhamIndexDividerSideObject({
			objects: sxOptions.objects,
			divider,
		});
		return {
			sideObject,
		};
	}, [sxOptions.objects, divider]);

	const showSideText = showArkhamIndexSideTextSx(divider);

	const iconSx = getPrintSx(S.getIconSx);
	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const sideBackgroundSx = getPrintSx(S.getSideBackgroundSx);
	const sideTextSx = getPrintSx(S.getSideTextSx, sideOptions);
	const titleSx = getPrintSx(S.getTitleSx, { showSideText });
	const shiftLeftSx = getPrintSx(S.getShiftSx, leftPosition);
	const shiftRightSx = getPrintSx(S.getShiftSx, rightPosition);
	const enlargeSx = getPrintSx(S.getEnlargeSx);
	const shrinkSx = getPrintSx(S.getShrinkSx, { isFull: tabSize === "full" });
	const increaseIndentSx = getPrintSx(S.getIncreaseIndentSx);
	const decreaseIndentSx = getPrintSx(S.getDecreaseIndentSx);
	const fullSizeSx = getPrintSx(S.getFullSizeSx);

	const faction = getDividerFaction(divider) ?? "neutral";

	const factionOptions = useMemo(() => {
		return {
			faction,
		};
	}, [faction]);

	const factionImageSx = getPrintSx(S.getFactionImageSx, factionOptions);

	const {
		canIncreaseIndent,
		canDecreaseIndent,
		increaseIndent,
		decreaseIndent,
	} = useArkhamIndexIndent();

	const showTitle = showArkhamIndexDividerTabTitle({
		divider,
		tabSize,
		showIcon,
	});

	const { shiftLeft, shiftRight } = useTabPosition({
		dividerId: divider.id,
		tabIndex,
		tabsCount: 3,
	});

	const { enlarge, shrink, canEnlarge, canShrink } = useTabSize({
		dividerId: divider.id,
		sizes: tabSizes,
		tabSize,
	});

	const setFullSizeForAll = useCallback(() => {
		dispatch(setAllDividersParam({ key: "tabSize", value: "full" }));
	}, [dispatch]);

	const mm = usePrintUnitCallback();

	const sideText = getArkhamIndexSideText(divider);

	const isFullSize = tabSize === "full" || tabSize === 3;

	const showShiftLeft = tabIndex !== 0 && !isFullSize;
	const showShiftRight = tabIndex < 3 - (tabSize as number) && !isFullSize;

	return (
		<>
			<NotExportable visible={showIcon}>
				<Image src={backgroundImage} sx={backgroundSx} onClick={selectIcon} />
				<Box
					sx={{
						position: "absolute",
						top: 0,
						left: mm(tabLeft),
						width: mm(tabWidth),
						height: mm(tabHeight),
						display: divider.side === "front" ? "flex" : "none",
						displayPrint: "none",
					}}
				>
					{showShiftLeft && (
						<Box onClick={shiftLeft} sx={shiftLeftSx}>
							<Icon icon="action" />
						</Box>
					)}
					{showShiftRight && (
						<Box onClick={shiftRight} sx={shiftRightSx}>
							<Icon icon="action" />
						</Box>
					)}
					{canEnlarge && (
						<Box onClick={enlarge} sx={enlargeSx}>
							<Icon icon="enlarge2" />
						</Box>
					)}
					{canShrink && (
						<Box onClick={shrink} sx={shrinkSx}>
							<Icon icon="shrink2" />
						</Box>
					)}
					{canIncreaseIndent && (
						<Box onClick={increaseIndent} sx={increaseIndentSx}>
							<Icon icon="indent-increase" />
						</Box>
					)}
					{canDecreaseIndent && (
						<Box onClick={decreaseIndent} sx={decreaseIndentSx}>
							<Icon icon="indent-decrease" />
						</Box>
					)}
					{tabSize === "full" && (
						<Tooltip title={t("divider.arkham-index.setAllFull")} arrow>
							<Box onClick={setFullSizeForAll} sx={fullSizeSx}>
								<Icon icon="pushpin" />
							</Box>
						</Tooltip>
					)}
				</Box>
			</NotExportable>
			{showGlyph && (
				<Icon
					dividerId={divider.id}
					icon={icon}
					sx={iconSx}
					scaleType="circle"
					onClick={selectIcon}
				/>
			)}
			{showIcon && !showGlyph && divider.layoutType !== "scenario" && (
				<Image
					src={`/images/faction/${divider.faction}.png`}
					sx={factionImageSx}
				/>
			)}
			{showSideText && (
				<>
					<Image src={backgroundImage} sx={sideBackgroundSx} />
					<NotExportable>
						<Box sx={sideTextSx}>
							<FitInput
								value={sideText}
								contentEditable={false}
								fitTextOptions={{
									minFontSize: 8,
								}}
							/>
						</Box>
					</NotExportable>
				</>
			)}
			{showTitle && <TabTitle sx={titleSx} />}
		</>
	);
}
