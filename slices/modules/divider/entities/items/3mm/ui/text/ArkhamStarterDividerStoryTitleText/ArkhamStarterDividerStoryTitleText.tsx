import type { SxProps } from "@mui/material";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useArkhamStarterDividerContext } from "../../ArkhamStarterDividerContext";
import * as S from "./ArkhamStarterDividerStoryTitleText.styles";

type ArkhamStarterDividerStoryTitleTextProps = {
	sx?: SxProps;
};

export function ArkhamStarterDividerStoryTitleText({
	sx: sxProp,
}: ArkhamStarterDividerStoryTitleTextProps) {
	const { divider } = useArkhamStarterDividerContext();
	const getLocaleSx = useLocaleSx();
	const getPrintSx = usePrintUnit();

	const sxStyle = getLocaleSx(S.getSx);
	const titleClearSx = getPrintSx(S.getTitleClearSx);
	const outlineSx = getPrintSx(S.getOutlineSx);
	const storyStrokeSx = getPrintSx(S.getStoryStrokeSx);

	const sx = {
		...sxStyle,
		...sxProp,
	} as SxProps;

	const {
		value,
		translatedValue: defaultValue,
		onChange: onValueChange,
		onBlur,
		onFontSizeChange,
	} = useDividerText({
		divider,
		param: "customStoryTitle",
		fontSizeScaleParam: "customStoryTitleFontSizeScale",
		custom: true,
		defaultValue: divider.story?.name,
	});

	return (
		<DividerText
			dividerId={divider.id}
			sx={sx}
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
			strokeSx={storyStrokeSx}
		/>
	);
}
