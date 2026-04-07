import type { BoxProps, SxProps } from "@mui/material";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useVintageDividerContext } from "../../VintageDividerContext/VintageDividerContext";
import * as S from "./VintageDividerTitle.styles";

type VintageDividerTitleProps = BoxProps;

export function VintageDividerTitle({
	sx: sxProp,
	...props
}: VintageDividerTitleProps) {
	const { divider, sxOptions } = useVintageDividerContext();

	const getPrintSx = usePrintUnit(sxOptions);
	const getLocaleSx = useLocaleSx(sxOptions);
	const sxStyles = getLocaleSx(S.getSx);
	const outlineSx = getPrintSx(S.getOutlineSx);
	const {
		value: title,
		translatedValue: translatedTitle,
		onChange: onTitleChange,
		onBlur: onTitleBlur,
		onFontSizeChange,
	} = useDividerText({
		divider,
		param: "customTitle",
	});

	const sx = {
		...sxStyles,
		...sxProp,
	} as SxProps;

	return (
		<DividerText
			{...props}
			sx={sx}
			dividerId={divider.id}
			value={title}
			defaultValue={translatedTitle}
			fitTextOptions={{
				minFontSize: 8,
				onFontSizeChange,
			}}
			outlineSx={outlineSx}
			onValueChange={onTitleChange}
			onBlur={onTitleBlur}
		/>
	);
}
