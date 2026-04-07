import { Box, type BoxProps, Stack, type SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDividerObject } from "@/modules/divider/entities/lib";
import { DividerColorPicker as ColorPicker } from "@/modules/divider/entities/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
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

	const ref = useDividerObject({
		dividerId: divider.id,
		containerRef,
		param: "backgroundIconRect",
		containerWidth: layout.size.width,
	});

	const getPrintSx = usePrintUnit(sxOptions);

	if (divider.layoutType !== "scenario") {
		return null;
	}

	const backgroundIconSx = getPrintSx(S.getBackgroundIconSx);
	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const backgroundContainerSx = getPrintSx(S.getBackgroundContainerSx);
	const frameColorPickerSx = getPrintSx(S.getFrameColorPickerSx);
	const overlayColorPickerSx = getPrintSx(S.getOverlayColorPickerSx);

	const defaultFrameColor = getStoryColor(divider.story);
	const defaultOverlayColor = getDefaultOverlayColor(divider.icon);

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
