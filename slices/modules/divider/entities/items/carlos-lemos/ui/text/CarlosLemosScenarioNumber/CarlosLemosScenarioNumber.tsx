import { Box, type BoxProps } from "@mui/material";
import { useCallback } from "react";
import { useDividerParam } from "@/modules/divider/shared/lib";
import { usePrintSx } from "@/modules/print/shared/lib";
import { FitInput } from "@/shared/ui/control";
import type { CarlosLemosDividerProps } from "../../../model";
import * as S from "./CarlosLemosScenarioNumber.styles";

type CarlosLemosScenarioNumberProps = BoxProps & {
	divider: CarlosLemosDividerProps;
};

export function CarlosLemosScenarioNumber({
	divider,
	sx,
	...rest
}: CarlosLemosScenarioNumberProps) {
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
			<FitInput
				{...rest}
				sx={inputSx}
				defaultValue={value}
				clearable={false}
				contentEditable={false}
				fitTextOptions={{
					minFontSize: 8,
					onFontSizeChange,
				}}
			/>
		</Box>
	);
}
