import { Box, type BoxProps } from "@mui/material";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useArkhamesqueClassicContext } from "../ArkhamesqueClassicContext";
import * as S from "./ArkhamesqueClassicTitle.styles";

type ArkhamesqueClassicTitleProps = BoxProps;

export function ArkhamesqueClassicTitle(props: ArkhamesqueClassicTitleProps) {
	const { divider } = useArkhamesqueClassicContext();

	const getLocaleSx = useLocaleSx();
	const titleTextSx = getLocaleSx(S.getTitleTextSx);

	const getPrintSx = usePrintUnit();
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
				sx={titleTextSx}
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
