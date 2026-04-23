import type { BoxProps, SxProps } from "@mui/material";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import { usePrintSx } from "@/modules/print/shared/lib";
import type { BinderBookmarkProps } from "../../model";
import * as S from "./BinderBookmarkTitle.styles";

type BinderBookmarkTitleProps = BoxProps & {
	divider: BinderBookmarkProps;
};

export function BinderBookmarkTitle({
	divider,
	...props
}: BinderBookmarkTitleProps) {
	const getLocaleSx = useLocaleSx();
	const getPrintSx = usePrintSx();

	const titleSx = getLocaleSx(S.getTextSx);
	const titleClearSx = getPrintSx(S.getTitleClearSx);
	const outlineSx = getPrintSx(S.getOutlineSx);
	const strokeSx = getPrintSx(S.getStrokeSx);

	const sx = {
		...props.sx,
		...titleSx,
	} as SxProps;

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
		<DividerText
			{...props}
			dividerId={divider.id}
			sx={sx}
			value={title}
			defaultValue={translatedTitle}
			fitTextOptions={{
				minFontSize: 8,
				onFontSizeChange,
			}}
			onValueChange={onTitleChange}
			onBlur={onTitleBlur}
			strokeSx={strokeSx}
			clearProps={{ sx: titleClearSx }}
			outlineSx={outlineSx}
		/>
	);
}
