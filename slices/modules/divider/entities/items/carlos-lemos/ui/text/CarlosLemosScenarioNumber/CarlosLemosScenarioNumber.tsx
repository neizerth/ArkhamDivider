import { Box, type BoxProps } from "@mui/material";
import { useCallback } from "react";
import { useDividerContext } from "@/modules/divider/entities/ui";
import { useDividerParam } from "@/modules/divider/shared/lib";
import { usePrintSx } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { FitInput } from "@/shared/ui/control";
import type { CarlosLemosDividerParams } from "../../../model";
import * as S from "./CarlosLemosScenarioNumber.styles";

type CarlosLemosScenarioNumberProps = BoxProps;

export function CarlosLemosScenarioNumber({
	sx,
	...props
}: CarlosLemosScenarioNumberProps) {
	const divider = useDividerContext<CarlosLemosDividerParams>();

	const getPrintSx = usePrintSx();
	const inputSx = getPrintSx(S.getInputSx);

	const setScenarioNumberFontSizeScale = useDividerParam<number>({
		dividerId: divider.id,
		key: "scenarioNumberFontSizeScale",
	});

	const onFontSizeChange = useCallback(
		(fontSize: number) => {
			setScenarioNumberFontSizeScale(fontSize);
		},
		[setScenarioNumberFontSizeScale],
	);

	if (divider.type !== "scenario") {
		return null;
	}

	const value = divider.scenario.number_text;
	if (!value) {
		return null;
	}

	return (
		<Box sx={sx}>
			<NotExportable>
				<FitInput
					{...props}
					sx={inputSx}
					defaultValue={value}
					clearable={false}
					contentEditable={false}
					fitTextOptions={{
						minFontSize: 8,
						onFontSizeChange,
					}}
				/>
			</NotExportable>
		</Box>
	);
}
