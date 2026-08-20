import { Box, type BoxProps } from "@mui/material";
import { useCallback, useMemo, useRef } from "react";
import { useDividerParam } from "@/modules/divider/shared/lib";
import { usePrintSx } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppSelector } from "@/shared/lib";
import { FitInput } from "@/shared/ui/control";
import { getArkhamesqueClassicScenarioNumberText } from "../../lib";
import { selectArkhamesqueClassicData } from "../../lib/store/arkhamesqueClassic";
import { useArkhamesqueClassicContext } from "../ArkhamesqueClassicContext";
import * as S from "./ArkhamesqueClassicScenarioNumber.styles";

type Props = BoxProps;

export function ArkhamesqueClassicScenarioNumber(props: Props) {
	const { sx, ...rest } = props;
	const { divider } = useArkhamesqueClassicContext();
	const data = useAppSelector(selectArkhamesqueClassicData);
	const getPrintSx = usePrintSx();
	const inputSx = getPrintSx(S.getInputSx);
	const innerContainerSx = getPrintSx(S.getContainerSx);

	const text = useMemo(() => {
		if (!data) {
			return;
		}
		return getArkhamesqueClassicScenarioNumberText({ data, divider });
	}, [data, divider]);

	const defaultScale =
		typeof divider.params?.scenarioNumberScale === "number"
			? divider.params.scenarioNumberScale
			: null;

	const scaleRef = useRef<number | null>(defaultScale);

	const setScenarioNumberScale = useDividerParam<number>({
		dividerId: divider.id,
		key: "scenarioNumberScale",
	});

	const onFontSizeChange = useCallback(
		(scale: number) => {
			scaleRef.current = scale;
			setScenarioNumberScale(scale);
		},
		[setScenarioNumberScale],
	);

	return (
		<Box sx={sx}>
			<NotExportable>
				<FitInput
					{...rest}
					sx={inputSx}
					defaultValue={text}
					clearable={false}
					// Keep it non-editable: the value comes from build data.
					contentEditable={false}
					containerSx={innerContainerSx}
					fitTextOptions={{
						minFontSize: 8,
						onFontSizeChange,
					}}
				/>
			</NotExportable>
		</Box>
	);
}
