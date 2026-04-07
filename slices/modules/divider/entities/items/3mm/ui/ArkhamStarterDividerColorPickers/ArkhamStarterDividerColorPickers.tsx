import { useTranslation } from "react-i18next";
import { rgba256 } from "@/modules/core/color/shared/lib";
import { DividerColorPicker as Picker } from "@/modules/divider/entities/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { Row, type RowProps } from "@/shared/ui";
import {
	get3mmDividerDefaultPlayerCornerColor as getDefaultPlayerCornerColor,
	get3mmDividerDefaultStripColor as getDefaultStripColor,
	show3mmDividerPlayerCorner,
} from "../../lib";
import { useArkhamStarterDividerContext } from "../ArkhamStarterDividerContext";
import * as S from "./ArkhamStarterDividerColorPickers.styles";

type ArkhamStarterDividerColorPickersProps = RowProps;

export function ArkhamStarterDividerColorPickers(
	props: ArkhamStarterDividerColorPickersProps,
) {
	const { t } = useTranslation();
	const { divider } = useArkhamStarterDividerContext();
	const { id, params } = divider;
	const getPrintSx = usePrintUnit();
	const colorPickerSx = getPrintSx(S.getColorPickerSx);

	const defaultStripColorObject = getDefaultStripColor(divider);
	const defaultStripColor = rgba256(defaultStripColorObject);

	const stripColor = params?.stripColor ?? defaultStripColor;

	const defaultPlayerCornerColorObject = getDefaultPlayerCornerColor(divider);
	const defaultPlayerCornerColor = rgba256(defaultPlayerCornerColorObject);

	const playerCornerColor =
		params?.playerCornerColor ?? defaultPlayerCornerColor;

	const showPlayerCorner = show3mmDividerPlayerCorner(divider);

	return (
		<Row {...props}>
			{divider.story && (
				<Picker
					dividerId={id}
					param="stripColor"
					sx={colorPickerSx}
					defaultColor={stripColor}
					title={t("divider.3mm.stripColor")}
				/>
			)}
			{showPlayerCorner && (
				<Picker
					dividerId={id}
					param="playerCornerColor"
					sx={colorPickerSx}
					defaultColor={playerCornerColor}
					title={t("divider.3mm.playerCornerColor")}
				/>
			)}
		</Row>
	);
}
