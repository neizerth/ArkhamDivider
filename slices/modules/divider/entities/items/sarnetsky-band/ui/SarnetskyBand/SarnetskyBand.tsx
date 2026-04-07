import { useTranslation } from "react-i18next";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerContainer as Container,
	DividerColorPicker,
	DividerContent,
	DividerMenu,
} from "@/modules/divider/entities/ui";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon } from "@/modules/divider/features/ui";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import {
	getSarnetskyBandDefaultColor,
	getSarnetskyBandDefaultIcon,
	getSarnetskyBandTitleOffset,
	useSarnetskyBandSxOptions,
} from "../../lib";
import type { SarnetskyBandProps } from "../../model";
import { SarnetskyBandBackground as Background } from "../SarnetskyBandBackground/SarnetskyBandBackground";
import { SarnetskyBandContext } from "../SarnetskyBandContext";
import { SarnetskyBandTitle as Title } from "../SarnetskyBandTitle";
import * as S from "./SarnetskyBand.styles";

export function SarnetskyBand(props: SarnetskyBandProps) {
	const { t } = useTranslation();
	const sxOptions = useSarnetskyBandSxOptions(props);
	const layout = useAppSelector(selectLayout) as DividerLayout;
	const getPrintSx = usePrintUnit(sxOptions);

	const { type } = sxOptions;

	const iconSx = getPrintSx(S.getIconSx);
	const menuSx = getPrintSx(S.getMenuSx);
	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const colorPickerSx = getPrintSx(S.getColorPickerSx);

	const titleOffset = getSarnetskyBandTitleOffset(props);

	const titleSx = getPrintSx(S.getTitleSx, { offset: titleOffset });

	const getDividerIcon = useDividerIcon({ dividerId: props.id });
	const defaultIcon = getSarnetskyBandDefaultIcon(props);
	const [icon, selectIcon] = getDividerIcon({ param: "icon", defaultIcon });

	const defaultColor = getSarnetskyBandDefaultColor(props);

	return (
		<SarnetskyBandContext.Provider
			value={{ divider: props, sxOptions, layout }}
		>
			<Container>
				<Background sx={backgroundSx} defaultColor={defaultColor} />
				<DividerContent>
					{type !== "concealed" && (
						<DividerIcon
							icon={icon}
							scaleType="circle"
							sx={iconSx}
							onClick={selectIcon}
						/>
					)}
					{type !== "concealed" && (
						<DividerColorPicker
							sx={colorPickerSx}
							dividerId={props.id}
							param="color"
							defaultColor={defaultColor}
							title={t("divider.sarnetsky.frameColor.pickerTitle")}
						/>
					)}
					<Title sx={titleSx} />
					<DividerMenu dividerId={props.id} sx={menuSx} inline />
				</DividerContent>
			</Container>
		</SarnetskyBandContext.Provider>
	);
}
