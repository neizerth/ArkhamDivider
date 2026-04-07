import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerBleedView as BleedView,
	DividerColorPicker as ColorPicker,
	DividerContainer as Container,
	DividerContent as Content,
	DividerMenu as Menu,
} from "@/modules/divider/entities/ui";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import { selectDividerTabIndex } from "@/modules/divider/shared/lib";
import {
	selectBleedEnabled,
	selectShowCornerRadius,
	usePrintUnit,
} from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppSelector } from "@/shared/lib";
import {
	getVintageDividerDefaultTabColor as getDefaultTabColor,
	getVintageDividerDefaultIcon,
} from "../../lib";
import { useVintageDividerSxOptions } from "../../lib/hooks";
import type { VintageDividerLayout, VintageDividerProps } from "../../model";
import {
	VintageDividerTitle as Title,
	VintageDividerTopTitle as TopTitle,
} from "../text";
import { VintageDividerContext } from "../VintageDividerContext";
import { VintageDividerTab as Tab } from "../VintageDividerTab";
import * as C from "./VintageDivider.components";
import * as S from "./VintageDivider.styles";

export function VintageDivider(props: VintageDividerProps) {
	const { t } = useTranslation();
	const layout = useAppSelector(selectLayout) as VintageDividerLayout;
	const bleedEnabled = useAppSelector(selectBleedEnabled);
	const cornerRadiusEnabled = useAppSelector(selectShowCornerRadius);

	const tabIndex = useAppSelector(
		selectDividerTabIndex({ id: props.id, tabsCount: 3, side: props.side }),
	);

	const sxOptions = useVintageDividerSxOptions();

	const tabWidth = sxOptions.objects.tab.width;

	const defaultTabColor = getDefaultTabColor(props);
	const tabColor = props.params?.tabColor ?? defaultTabColor;

	const getPrintSx = usePrintUnit(sxOptions);
	const getLocaleSx = useLocaleSx(sxOptions);

	const menuSx = getPrintSx(S.getMenuSx);
	const tabSx = getPrintSx(S.getTabSx, { tabIndex });
	const bleedViewSx = getPrintSx(S.getBleedViewSx, { bleedEnabled });
	const colorPickerSx = getPrintSx(S.getColorPickerSx);
	const titleSx = getLocaleSx(S.getTitleSx);
	const topTitleSx = getLocaleSx(S.getTopTitleSx);
	const iconSx = getPrintSx(S.getIconSx, { tabIndex });
	const bodyCornerRadiusSx = getPrintSx(S.getBodyCornerRadiusSx);

	const getDividerIcon = useDividerIcon({
		dividerId: props.id,
	});

	const defaultIcon = getVintageDividerDefaultIcon(props);

	const [icon, setIcon] = getDividerIcon({
		defaultIcon,
		param: "icon",
	});

	return (
		<VintageDividerContext.Provider
			value={{ divider: props, layout, sxOptions, tabIndex }}
		>
			<Container>
				<BleedView sx={bleedViewSx}>
					<C.Body />
					<C.Tab tabWidth={tabWidth} color={tabColor} />
				</BleedView>
				<Content hideBorderRadius>
					<TopTitle sx={topTitleSx} />
					<Title sx={titleSx} />
					<Tab sx={tabSx} />
					<ColorPicker
						sx={colorPickerSx}
						dividerId={props.id}
						defaultColor={defaultTabColor}
						param="tabColor"
						title={t("divider.vintage.tabColor")}
					/>
					<Icon
						dividerId={props.id}
						sx={iconSx}
						icon={icon}
						onClick={setIcon}
						scaleType="circle"
						scaleFactor={{
							circled: 1.1,
						}}
					/>
					<NotExportable>
						{cornerRadiusEnabled && <Box sx={bodyCornerRadiusSx} />}
					</NotExportable>
					<Menu dividerId={props.id} sx={menuSx} />
				</Content>
			</Container>
		</VintageDividerContext.Provider>
	);
}
