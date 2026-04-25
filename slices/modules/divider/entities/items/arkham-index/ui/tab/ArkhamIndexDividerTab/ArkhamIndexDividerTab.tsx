import { Box } from "@mui/material";
import { useMemo } from "react";
import { isEmptyIcon } from "@/modules/core/icon/shared/lib";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import { usePrintSx } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { FitInput, Image } from "@/shared/ui";
import { arkhamIndexDividerBaseUrl } from "../../../config";
import {
	getArkhamIndexDividerIconLeft,
	getArkhamIndexDividerTabLeft,
	getArkhamIndexDividerTabWidth,
	showArkhamIndexDividerTabTitle,
} from "../../../lib";
import { useArkhamIndexContext } from "../../ArkhamIndexContext";
import { ArkhamIndexDividerTabTitle as TabTitle } from "../ArkhamIndexDividerTabTitle";
// import * as C from "./ArkhamIndexDividerTab.components";
import * as S from "./ArkhamIndexDividerTab.styles";

const backgroundImage = `${arkhamIndexDividerBaseUrl}/icon-background.avif`;

export function ArkhamIndexDividerTab() {
	const { layout, tabSize, tabIndex, divider, sxOptions } =
		useArkhamIndexContext();

	const tabWidths = sxOptions.objects.tab.width;
	const tabSideWidth = sxOptions.objects.tab.sideWidth;
	const iconWidth = sxOptions.objects.icon.width;

	const { cornerRadius } = sxOptions.objects;
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
	});

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

	const iconSx = getPrintSx(S.getIconSx);
	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const scenarioBackgroundSx = getPrintSx(S.getScenarioBackgroundSx);
	const scenarioNumberSx = getPrintSx(S.getScenarioNumberSx);
	const titleSx = getPrintSx(S.getTitleSx);

	const showTitle = showArkhamIndexDividerTabTitle({
		divider,
		tabSize,
		showIcon,
	});

	return (
		<>
			<NotExportable visible={showIcon}>
				<Image src={backgroundImage} sx={backgroundSx} onClick={selectIcon} />
			</NotExportable>
			{showIcon && (
				<Icon
					dividerId={divider.id}
					icon={icon}
					sx={iconSx}
					scaleType="circle"
					onClick={selectIcon}
				/>
			)}
			{divider.type === "scenario" && divider.scenario?.number_text && (
				<>
					<Image src={backgroundImage} sx={scenarioBackgroundSx} />
					<NotExportable>
						<Box sx={scenarioNumberSx}>
							<FitInput
								value={divider.scenario.number_text}
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
