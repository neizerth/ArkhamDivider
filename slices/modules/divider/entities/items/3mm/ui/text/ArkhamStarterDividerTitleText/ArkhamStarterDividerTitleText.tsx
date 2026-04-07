import type { SxProps } from "@mui/material";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useArkhamStarterDividerContext } from "../../ArkhamStarterDividerContext";
import * as S from "./ArkhamStarterDividerTitleText.styles";

type ArkhamStarterDividerTitleTextProps = {
	sx?: SxProps;
};

export function ArkhamStarterDividerTitleText({
	sx: sxProp,
}: ArkhamStarterDividerTitleTextProps) {
	const { divider, titleObject } = useArkhamStarterDividerContext();
	const getLocaleSx = useLocaleSx();
	const getPrintSx = usePrintUnit();

	const titleClearSx = getPrintSx(S.getTitleClearSx);
	const outlineSx = getPrintSx(S.getOutlineSx);
	const sxStyle = getLocaleSx(S.getSx, { title: titleObject });

	const inputSx = getLocaleSx(S.getInputSx);

	const {
		value,
		translatedValue: defaultValue,
		onChange: onValueChange,
		onBlur,
		onFontSizeChange,
	} = useDividerText({
		divider,
		param: "customTitle",
	});

	const sx = {
		...sxStyle,
		...sxProp,
	} as SxProps;

	return (
		<DividerText
			dividerId={divider.id}
			sx={sx}
			inputSx={inputSx}
			value={value}
			defaultValue={defaultValue}
			fitTextOptions={{
				minFontSize: 8,
				onFontSizeChange,
			}}
			onValueChange={onValueChange}
			onBlur={onBlur}
			clearProps={{ sx: titleClearSx }}
			outlineSx={outlineSx}
		/>
	);
}
