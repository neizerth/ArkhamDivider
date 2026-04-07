import type { SxProps } from "@mui/material";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useDividerText } from "@/modules/divider/entities/lib";
import { DividerText } from "@/modules/divider/entities/ui";
import type { XPCost } from "@/modules/divider/shared/model";
import { get3mmDividerXPCostData } from "../../lib";
import { ArkhamStarterDividerContext } from "../ArkhamStarterDividerContext";

type ArkhamStarterDividerXPProps = {
	xpCost: XPCost;
	sx: SxProps;
	titleClearSx?: SxProps;
	outlineSx?: SxProps;
};

export function ArkhamStarterDividerXP({
	xpCost,
	sx,
	titleClearSx,
	outlineSx,
}: ArkhamStarterDividerXPProps) {
	const { divider } = useContext(ArkhamStarterDividerContext);

	const { t } = useTranslation();

	const xpCostData = get3mmDividerXPCostData(xpCost);
	const defaultValue = xpCostData && t(xpCostData.key, xpCostData.data);

	const {
		value: xp,
		translatedValue: translatedXP,
		onChange,
		onBlur,
		onFontSizeChange,
	} = useDividerText({
		divider: divider,
		param: "customXP",
		fontSizeScaleParam: "customXPFontSizeScale",
		defaultValue,
	});

	return (
		<DividerText
			dividerId={divider.id}
			sx={sx}
			value={xp}
			defaultValue={translatedXP}
			fitTextOptions={{ minFontSize: 8, onFontSizeChange }}
			onValueChange={onChange}
			onBlur={onBlur}
			clearProps={{ sx: titleClearSx }}
			outlineSx={outlineSx}
		/>
	);
}
