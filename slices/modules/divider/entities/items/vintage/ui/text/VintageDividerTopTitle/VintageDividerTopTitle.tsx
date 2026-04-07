import type { BoxProps, SxProps } from "@mui/material";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useVintageDividerContext } from "../../VintageDividerContext/VintageDividerContext";
import * as S from "./VintageDividerTopTitle.styles";

type VintageDividerTopTitleProps = BoxProps;

export function VintageDividerTopTitle({
	sx: sxProp,
	...props
}: VintageDividerTopTitleProps) {
	const { divider, sxOptions } = useVintageDividerContext();

	const getPrintSx = usePrintUnit(sxOptions);
	const getLocaleSx = useLocaleSx(sxOptions);
	const sxStyles = getLocaleSx(S.getSx);
	const outlineSx = getPrintSx(S.getOutlineSx);

	const sx = {
		...sxStyles,
		...sxProp,
	} as SxProps;

	// Reuse the same editable title for now; separate param can be introduced later if needed.
	const {
		value: title,
		translatedValue: translatedTitle,
		onChange: onTitleChange,
		onBlur: onTitleBlur,
		onFontSizeChange,
	} = useDividerText({
		divider,
		param: "customTopTitle",
		fontSizeScaleParam: "topTitleFontSizeScale",
	});

	return (
		<DividerText
			{...props}
			dividerId={divider.id}
			sx={sx}
			value={title}
			defaultValue={translatedTitle}
			outlineSx={outlineSx}
			fitTextOptions={{
				minFontSize: 8,
				onFontSizeChange,
			}}
			onValueChange={onTitleChange}
			onBlur={onTitleBlur}
		/>
	);
}
