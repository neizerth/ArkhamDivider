import { Box, type BoxProps, type SxProps } from "@mui/material";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import { usePrintSx } from "@/modules/print/shared/lib";
import { useStoryTranslation } from "@/modules/story/shared/lib";
import { getArkhamIndexDefaultDividerTitle } from "../../../lib";
import { useArkhamIndexContext } from "../../ArkhamIndexContext";
import * as S from "./ArkhamIndexDividerTitle.styles";

type ArkhamIndexDividerTitleProps = BoxProps;

export function ArkhamIndexDividerTitle(props: ArkhamIndexDividerTitleProps) {
	const { divider, sxOptions, tabSize } = useArkhamIndexContext();

	const { showIcon } = sxOptions;

	const { t } = useStoryTranslation(divider.story);

	const getPrintSx = usePrintSx(sxOptions);
	const getLocaleSx = useLocaleSx(sxOptions);
	const titleSx = getLocaleSx(S.getTitleSx);
	const titleClearSx = getPrintSx(S.getTitleClearSx);
	const titleOutlineSx = getPrintSx(S.getTitleOutlineSx);
	const strokeSx = getPrintSx(S.getStrokeSx);
	const textSx = getPrintSx(S.getTextSx);

	const defaultTitle = getArkhamIndexDefaultDividerTitle({
		divider,
		tabSize,
		showIcon,
	});

	const defaultTranslatedTitle = t(defaultTitle ?? "").toUpperCase();

	const {
		value: title,
		translatedValue: defaultValue,
		onFontSizeChange,
		onChange,
		onBlur,
	} = useDividerText({
		divider,
		param: "customTitle",
		fontSizeScaleParam: "custonFontSizeScale",
		defaultValue: defaultTranslatedTitle,
	});

	const sx = {
		...props.sx,
		...titleSx,
	} as SxProps;

	if (!defaultTitle) {
		return null;
	}

	return (
		<Box {...props} sx={sx}>
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
				visible
			/>
		</Box>
	);
}
