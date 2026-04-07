import { Box, type BoxProps } from "@mui/material";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useSarnetskyDividerContext } from "../../SarnetskyDividerContext";
import * as S from "./SarnetskyDividerTitle.styles";

type SarnetskyDividerTitleProps = BoxProps;

export function SarnetskyDividerTitle(props: SarnetskyDividerTitleProps) {
	const { sxOptions, divider } = useSarnetskyDividerContext();
	const getLocaleSx = useLocaleSx(sxOptions);
	const titleSx = getLocaleSx(S.getTitleSx);

	const getPrintSx = usePrintUnit(sxOptions);
	const titleClearSx = getPrintSx(S.getTitleClearSx);
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

	return (
		<Box {...props}>
			<DividerText
				dividerId={divider.id}
				sx={titleSx}
				value={title}
				defaultValue={translatedTitle}
				fitTextOptions={{
					minFontSize: 8,
					onFontSizeChange,
				}}
				onValueChange={onTitleChange}
				onBlur={onTitleBlur}
				clearProps={{ sx: titleClearSx }}
				outlineSx={outlineSx}
			/>
		</Box>
	);
}
