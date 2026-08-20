import { Box, type BoxProps } from "@mui/material";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import { usePrintSx } from "@/modules/print/shared/lib";
import type { CarlosLemosDividerParams } from "../../../model";
import * as S from "./CarlosLemosDividerTitle.styles";

type CarlosLemosDividerTitleProps = BoxProps & {
	divider: CarlosLemosDividerParams;
};

export function CarlosLemosDividerTitle({
	divider,
	...props
}: CarlosLemosDividerTitleProps) {
	const getPrintSx = usePrintSx();
	const getLocaleSx = useLocaleSx();

	const textSx = getLocaleSx(S.getInputSx);
	const titleClearSx = getPrintSx(S.getTitleClearSx);
	const titleOutlineSx = getPrintSx(S.getOutlineSx);
	const strokeSx = getPrintSx(S.getStrokeSx);

	const {
		value: title,
		translatedValue: defaultValue,
		onChange,
		onBlur,
		onFontSizeChange,
	} = useDividerText({
		divider,
		param: "customTitle",
		fontSizeScaleParam: "custonFontSizeScale",
	});

	return (
		<Box {...props}>
			<DividerText
				dividerId={divider.id}
				sx={textSx}
				value={title}
				defaultValue={defaultValue}
				fitTextOptions={{
					minFontSize: 5,
					onFontSizeChange,
				}}
				onValueChange={onChange}
				onBlur={onBlur}
				clearProps={{ sx: titleClearSx }}
				outlineSx={titleOutlineSx}
				strokeSx={strokeSx}
			/>
		</Box>
	);
}
