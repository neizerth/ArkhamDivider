import { Box, type BoxProps, Stack, type SxProps } from "@mui/material";
import { mergeDeepRight } from "ramda";
import { useTranslation } from "react-i18next";
import { useDividerObject } from "@/modules/divider/entities/lib";
import { DividerColorPicker as ColorPicker } from "@/modules/divider/entities/ui";
import { selectDividerParam } from "@/modules/divider/shared/lib";
import { usePrintPxCallback, usePrintSx } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppSelector } from "@/shared/lib";
import type { BoxRect } from "@/shared/model";
import {
	getSarnetskyDefaultOverlayColor as getDefaultOverlayColor,
	getSarnetskyStoryColor as getStoryColor,
} from "../../../lib";
import { SarnetskyDividerBackgroundIcon as BackgroundIcon } from "../../icon";
import { SarnetskyDividerEncounters as Encounters } from "../../icon/encounters";
import { useSarnetskyDividerContext } from "../../SarnetskyDividerContext";
import { SarnetskyDividerScenarioSubtitle as ScenarioSubtitle } from "../../subtitle";
import * as S from "./SarnetskyDividerScenarioContent.styles";

type SarnetskyDividerScenarioContentProps = BoxProps & {
	subtitleSx?: SxProps;
};

export function SarnetskyDividerScenarioContent({
	subtitleSx,
	...props
}: SarnetskyDividerScenarioContentProps) {
	const { t } = useTranslation();
	const { sxOptions, containerRef, divider, layout } =
		useSarnetskyDividerContext();

	const backgroundRect = useAppSelector(
		selectDividerParam<BoxRect>({ id: divider.id, key: "backgroundIconRect" }),
	);

	const ref = useDividerObject({
		dividerId: divider.id,
		containerRef,
		param: "backgroundIconRect",
		containerWidth: layout.size.width,
	});

	const mm = usePrintPxCallback();
	const getPrintSx = usePrintSx(sxOptions);

	if (divider.layoutType !== "scenario") {
		return null;
	}

	const backgroundIconSxStyle = getPrintSx(S.getBackgroundIconSx);
	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const backgroundContainerSx = getPrintSx(S.getBackgroundContainerSx);
	const frameColorPickerSx = getPrintSx(S.getFrameColorPickerSx);
	const overlayColorPickerSx = getPrintSx(S.getOverlayColorPickerSx);

	const defaultFrameColor = getStoryColor(divider.story);
	const defaultOverlayColor = getDefaultOverlayColor(divider.icon);

	const printFontSize = mm(backgroundRect?.height ?? 0);

	const backgroundIconSx = mergeDeepRight(backgroundIconSxStyle ?? {}, {
		"@media print": {
			fontSize: printFontSize,
		},
	}) as SxProps;

	return (
		<>
			{divider.type === "scenario" && (
				<ScenarioSubtitle divider={divider} sx={subtitleSx} />
			)}
			<Box {...props}>
				<Stack sx={{ height: "100%", justifyContent: "space-between" }}>
					<Stack sx={backgroundContainerSx}>
						<Stack sx={backgroundSx}>
							<Box sx={{ display: "inline-flex", flex: 1 }} ref={ref}>
								<BackgroundIcon sx={backgroundIconSx} divider={divider} />
							</Box>
						</Stack>
					</Stack>

					{divider.type === "scenario" && (
						<Encounters scenario={divider.scenario} />
					)}
				</Stack>
				<NotExportable>
					<ColorPicker
						sx={frameColorPickerSx}
						defaultColor={defaultFrameColor}
						dividerId={divider.id}
						param="frameColor"
						title={t`divider.sarnetsky.frameColor.pickerTitle`}
					/>
					<ColorPicker
						sx={overlayColorPickerSx}
						defaultColor={defaultOverlayColor}
						dividerId={divider.id}
						param="overlayColor"
						title={t`divider.sarnetsky.overlayColor.pickerTitle`}
					/>
				</NotExportable>
			</Box>
		</>
	);
}
