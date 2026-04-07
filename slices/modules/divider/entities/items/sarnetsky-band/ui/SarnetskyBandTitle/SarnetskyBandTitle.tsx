import type { BoxProps } from "@mui/material";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useSarnetskyBandContext } from "../SarnetskyBandContext";
import * as S from "./SarnetskyBandTitle.styles";

type SarnetskyBandTitleProps = BoxProps;

export function SarnetskyBandTitle(props: SarnetskyBandTitleProps) {
	const { divider, sxOptions } = useSarnetskyBandContext();
	const {
		value: title,
		translatedValue: translatedTitle,
		onChange,
		onBlur,
		onFontSizeChange,
	} = useDividerText({
		divider,
		param: "customTitle",
	});

	const getLocaleSx = useLocaleSx(sxOptions);
	const getPrintSx = usePrintUnit(sxOptions);

	const inputSx = getLocaleSx(S.getInputSx);
	const outlineSx = getPrintSx(S.getOutlineSx);
	const titleClearSx = getPrintSx(S.getTitleClearSx);

	return (
		<DividerText
			{...props}
			dividerId={divider.id}
			value={title}
			inputSx={inputSx}
			outlineSx={outlineSx}
			clearProps={{ sx: titleClearSx }}
			defaultValue={translatedTitle}
			fitTextOptions={{ minFontSize: 8, onFontSizeChange }}
			onValueChange={onChange}
			onBlur={onBlur}
		/>
	);
}
