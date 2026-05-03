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
import {
	getDividerXPCost,
	selectDividerTabIndex,
	selectPlayerParams,
} from "@/modules/divider/shared/lib";
import { selectShowCornerRadius, usePrintSx } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppSelector } from "@/shared/lib";
import { Row } from "@/shared/ui";
import {
	getVintageDividerDefaultTabColor as getDefaultTabColor,
	getVintageDividerDefaultIcon,
	getVintageDividerTabsCount,
} from "../../lib";
import { useVintageDividerSxOptions } from "../../lib/hooks";
import type { VintageDividerLayout, VintageDividerProps } from "../../model";
import {
	VintageDividerTitle as Title,
	VintageDividerTopTitle as TopTitle,
} from "../text";
import { VintageDividerContext } from "../VintageDividerContext";
import { VintageDividerTab as Tab } from "../VintageDividerTab";
import { VintageDividerInlineXP as InlineXP } from "../xp";
import * as C from "./VintageDivider.components";
import * as S from "./VintageDivider.styles";

export function VintageDivider(props: VintageDividerProps) {
	const { t } = useTranslation();
	const layout = useAppSelector(selectLayout) as VintageDividerLayout;
	const cornerRadiusEnabled = useAppSelector(selectShowCornerRadius);

	const playerParams = useAppSelector(selectPlayerParams);
	const { sideXP, numericXP } = playerParams;
	const showXP = sideXP || numericXP;

	const xpCost = getDividerXPCost(props);

	const tabsCount = getVintageDividerTabsCount(layout);

	const tabIndex = useAppSelector(
		selectDividerTabIndex({ id: props.id, tabsCount, side: props.side }),
	);

	const sxOptions = useVintageDividerSxOptions({
		tabIndex,
		withXP: Boolean(xpCost),
	});

	const tabWidth = sxOptions.objects.tab.width;

	const defaultTabColor = getDefaultTabColor(props);
	const tabColor = props.params?.tabColor ?? defaultTabColor;

	const getPrintSx = usePrintSx(sxOptions);
	const getLocaleSx = useLocaleSx(sxOptions);

	const menuSx = getPrintSx(S.getMenuSx);
	const tabSx = getPrintSx(S.getTabSx);
	const bleedViewSx = getPrintSx(S.getBleedViewSx);
	const colorPickerSx = getPrintSx(S.getColorPickerSx);
	const titleSx = getLocaleSx(S.getTitleSx);
	const topTitleSx = getLocaleSx(S.getTopTitleSx);
	const iconSx = getPrintSx(S.getIconSx);
	const bodyCornerRadiusSx = getPrintSx(S.getBodyCornerRadiusSx);
	const xpSx = getPrintSx(S.getXPSx);
	const numericXPSx = getPrintSx(S.getNumericXPSx);
	const inlineXPSx = getPrintSx(S.getInlineXPSx);

	const getDividerIcon = useDividerIcon({
		dividerId: props.id,
	});

	const defaultIcon = getVintageDividerDefaultIcon(props);

	const [icon, setIcon] = getDividerIcon({
		defaultIcon,
		param: "icon",
	});

	const { side } = props;

	return (
		<VintageDividerContext.Provider
			value={{ divider: props, layout, sxOptions, tabIndex }}
		>
			<Container>
				<BleedView sx={bleedViewSx}>
					<C.Body />
					<C.Tab tabWidth={tabWidth} color={tabColor} />
				</BleedView>
				<Content hideBorderRadius side={props.side}>
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
					{showXP && xpCost && (
						<Row sx={xpSx}>
							{sideXP && <InlineXP xpCost={xpCost} sx={inlineXPSx} />}
							{numericXP && <Box sx={numericXPSx}>{xpCost.name}</Box>}
						</Row>
					)}
					<NotExportable>
						{cornerRadiusEnabled && side === "front" && (
							<Box sx={bodyCornerRadiusSx} />
						)}
					</NotExportable>
					<Menu dividerId={props.id} sx={menuSx} />
				</Content>
			</Container>
		</VintageDividerContext.Provider>
	);
}

export default VintageDivider;
