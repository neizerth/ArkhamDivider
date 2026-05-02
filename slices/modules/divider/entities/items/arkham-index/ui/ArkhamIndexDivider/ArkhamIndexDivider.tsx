// import * as C from "./ArkhamIndexDivider.components";

import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerBleedView as BleedView,
	DividerCardsInfo as CardsInfo,
	DividerColorPicker as ColorPicker,
	DividerContainer as Container,
	DividerCreaseLine as CreaseLine,
	DividerMenu as Menu,
} from "@/modules/divider/entities/ui";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon } from "@/modules/divider/features/ui";
import { selectDividerTabIndex } from "@/modules/divider/shared/lib";
import { selectLasercutEnabled, usePrintSx } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { absoluteFill } from "@/shared/config";
import { useAppSelector } from "@/shared/lib";
import { useBoolean } from "@/shared/lib/hooks/common";
import { Image } from "@/shared/ui";
import { arkhamIndexDividerBaseUrl } from "../../config";
import {
	getArkhamIndexDividerDefaultColor,
	getArkhamIndexDividerDefaultFilter,
	getArkhamIndexDividerTabSize,
	useArkhamIndexDividerSxOptions,
} from "../../lib";
import type {
	ArkhamIndexDividerLayout,
	ArkhamIndexDividerProps,
} from "../../model";
import { ArkhamIndexContext } from "../ArkhamIndexContext";
import { ArkhamIndexDividerBorder as BackgroundStroke } from "../ArkhamIndexDividerBorder";
import {
	ArkhamIndexDividerCardsCount as CardsCount,
	ArkhamIndexDividerMediaContent as MediaContent,
} from "../content";
import { ArkhamIndexDividerTab as Tab } from "../tab";
import * as C from "./ArkhamIndexDivider.components";
import * as S from "./ArkhamIndexDivider.styles";

export function ArkhamIndexDivider(props: ArkhamIndexDividerProps) {
	const { t } = useTranslation();
	const lasercutEnabled = useAppSelector(selectLasercutEnabled);
	const layout = useAppSelector(selectLayout) as ArkhamIndexDividerLayout;
	const [showCardsInfo, setShowCardsInfo] = useBoolean(false);

	const tabIndex = useAppSelector(
		selectDividerTabIndex({ id: props.id, tabsCount: 3, side: props.side }),
	);

	const defaultColor = getArkhamIndexDividerDefaultColor(props);

	const backgroundColor = props.params?.color ?? defaultColor;
	const backgroundFilter = backgroundColor
		? "none"
		: getArkhamIndexDividerDefaultFilter(props);

	const getDividerIcon = useDividerIcon({ dividerId: props.id });

	const [backgroundIcon, selectBackgroundIcon] = getDividerIcon({
		param: "icon",
		defaultIcon: props.icon,
	});

	const showBackgroundIcon = props.layoutType === "player";

	const tabSize = getArkhamIndexDividerTabSize({
		divider: props,
		layout,
	});

	const sxOptions = useArkhamIndexDividerSxOptions({
		divider: props,
		tabIndex,
		tabSize,
	});

	const getPrintSx = usePrintSx(sxOptions);
	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const backgroundStrokeSx = getPrintSx(S.getBackgroundStrokeSx);
	const bodySx = getPrintSx(S.getBodySx);
	const mediaContentSx = getPrintSx(S.getMediaContentSx);
	const colorPickerSx = getPrintSx(S.getColorPickerSx);
	const backgroundIconSx = getPrintSx(S.getBackgroundIconSx);
	const menuSx = getPrintSx(S.getMenuSx);
	const infoSx = getPrintSx(S.getInfoSx);
	const dividerCardsSx = getPrintSx(S.getDividerCardsSx);

	const { side } = props;

	const showMediaContent = props.layoutType !== "player";
	return (
		<ArkhamIndexContext.Provider
			value={{ layout, divider: props, tabSize, tabIndex, sxOptions }}
		>
			<Container>
				<BleedView>
					<Image
						src={`${arkhamIndexDividerBaseUrl}/background.avif`}
						sx={{
							...backgroundSx,
							filter: backgroundFilter,
							zIndex: 1,
						}}
					/>
					{showBackgroundIcon && (
						<C.Layer side={props.side}>
							<DividerIcon
								dividerId={props.id}
								icon={backgroundIcon}
								sx={backgroundIconSx}
								visible
							/>
						</C.Layer>
					)}
					{backgroundColor && (
						<Box
							sx={{
								...absoluteFill,
								zIndex: 3,
								backgroundColor,
								mixBlendMode: "color",
								pointerEvents: "none",
								printColorAdjust: "exact",
							}}
						/>
					)}
				</BleedView>
				<C.Layer side={props.side}>
					<CreaseLine offset={layout.creasingTop} />
					<Box sx={bodySx}>
						{showMediaContent && <MediaContent sx={mediaContentSx} />}
						<Menu dividerId={props.id} sx={menuSx} />
					</Box>
					<Tab />
					<NotExportable
						visible={!lasercutEnabled}
						visibleOn={["image", "zip"]}
					>
						{side === "front" && <BackgroundStroke sx={backgroundStrokeSx} />}
					</NotExportable>

					<NotExportable>
						<ColorPicker
							dividerId={props.id}
							param="color"
							defaultColor={backgroundColor}
							sx={colorPickerSx}
							title={t("divider.arkhamIndex.background.pickerTitle")}
						/>
					</NotExportable>
					<CardsCount sx={infoSx} onClick={setShowCardsInfo.toggle} />
					{showCardsInfo && <CardsInfo sx={dividerCardsSx} divider={props} />}

					{showBackgroundIcon && (
						<Box
							sx={{
								...backgroundIconSx,
								zIndex: 4,
								aspectRatio: 1,
								left: "50%",
								transform: "translate(-50%, -50%)",
								height: "1.2em",
								mixBlendMode: "color",
								borderRadius: "50%",
								blur: "2px",
								"@media screen": {
									":hover": {
										backgroundColor: "rgba(255, 255, 255, 0.01)",
									},
								},
							}}
							onClick={selectBackgroundIcon}
						/>
					)}
				</C.Layer>
			</Container>
		</ArkhamIndexContext.Provider>
	);
}

export default ArkhamIndexDivider;
