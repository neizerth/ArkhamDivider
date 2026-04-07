import { Box, type BoxProps } from "@mui/material";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useStoryTranslation } from "@/modules/story/shared/lib";
import { getSarnetskyDefaultScenarioSubtitle as getDefaultScenarioSubtitle } from "../../../lib";
import type { SarnetskyDividerProps } from "../../../model";
import { useSarnetskyDividerContext } from "../../SarnetskyDividerContext";
import * as S from "./SarnetskyDividerScenarioSubtitle.styles";

type SarnetskyDividerScenarioSubtitleProps = BoxProps & {
	divider: SarnetskyDividerProps & { type: "scenario"; layoutType: "scenario" };
};

export function SarnetskyDividerScenarioSubtitle({
	divider,
	...props
}: SarnetskyDividerScenarioSubtitleProps) {
	const { t } = useStoryTranslation(divider.story);
	const { sxOptions } = useSarnetskyDividerContext();
	const getPrintSx = usePrintUnit(sxOptions);
	const sx = getPrintSx(S.getSx);
	const outlineSx = getPrintSx(S.getOutlineSx);
	const clearSx = getPrintSx(S.getClearSx);

	const defaultValue = getDefaultScenarioSubtitle({
		story: divider.story,
		scenario: divider.scenario,
		t,
	});

	const { value, translatedValue, onChange, onBlur } = useDividerText({
		divider,
		param: "scenarioSubtitle",
		defaultValue,
	});

	const { story, scenario } = divider;
	if (!scenario || !story) {
		return;
	}

	return (
		<Box {...props}>
			<DividerText
				dividerId={divider.id}
				sx={sx}
				outlineSx={outlineSx}
				clearProps={{
					sx: clearSx,
				}}
				value={value}
				defaultValue={translatedValue}
				onValueChange={onChange}
				onBlur={onBlur}
			/>
		</Box>
	);
}
