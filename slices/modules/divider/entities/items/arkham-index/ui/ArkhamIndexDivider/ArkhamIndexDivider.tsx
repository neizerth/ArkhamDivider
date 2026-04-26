// import * as C from "./ArkhamIndexDivider.components";

import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerBleedView as BleedView,
	DividerContainer as Container,
	DividerColorPicker,
} from "@/modules/divider/entities/ui";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon } from "@/modules/divider/features/ui";
import { selectDividerTabIndex } from "@/modules/divider/shared/lib";
import { usePrintSx } from "@/modules/print/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppSelector } from "@/shared/lib";
import { Image } from "@/shared/ui";
import { arkhamIndexDividerBaseUrl } from "../../config";
import { useArkhamIndexDividerSxOptions } from "../../lib/hooks";
import { getArkhamIndexDividerTabSize } from "../../lib/logic";
import type {
	ArkhamIndexDividerLayout,
	ArkhamIndexDividerProps,
} from "../../model";
import { ArkhamIndexContext } from "../ArkhamIndexContext";
import { ArkhamIndexDividerBorder as BackgroundStroke } from "../ArkhamIndexDividerBorder";
import { ArkhamIndexDividerMediaContent as MediaContent } from "../content/ArkhamIndexDividerMediaContent";
import { ArkhamIndexDividerTab as Tab } from "../tab";
import * as C from "./ArkhamIndexDivider.components";
import * as S from "./ArkhamIndexDivider.styles";

export function ArkhamIndexDivider(props: ArkhamIndexDividerProps) {
	const { t } = useTranslation();
	const layout = useAppSelector(selectLayout) as ArkhamIndexDividerLayout;

	const tabIndex = useAppSelector(
		selectDividerTabIndex({ id: props.id, tabsCount: 3, side: props.side }),
	);

	const getDividerIcon = useDividerIcon({ dividerId: props.id });
	const [campaignIcon, startCampaignIcon] = getDividerIcon({
		param: "campaignIcon",
		defaultIcon: props.story?.icon,
	});

	const tabSize = getArkhamIndexDividerTabSize(props);

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
	const campaignIconSx = getPrintSx(S.getCampaignIconSx);

	const showMediaContent = props.layoutType !== "player";
	return (
		<ArkhamIndexContext.Provider
			value={{ layout, divider: props, tabSize, tabIndex, sxOptions }}
		>
			<Container>
				<BleedView>
					<Image
						src={`${arkhamIndexDividerBaseUrl}/background.avif`}
						sx={backgroundSx}
					/>
				</BleedView>
				<C.Layer>
					<Box sx={bodySx}>
						{showMediaContent && <MediaContent sx={mediaContentSx} />}
					</Box>
					<Tab />
					<NotExportable>
						<BackgroundStroke sx={backgroundStrokeSx} />
						<DividerColorPicker
							dividerId={props.id}
							param="color"
							// defaultColor={props.color}
							title={t("divider.arkhamIndex.background.pickerTitle")}
						/>
					</NotExportable>
					<DividerIcon
						dividerId={props.id}
						icon={campaignIcon}
						sx={campaignIconSx}
						visible
						onClick={startCampaignIcon}
					/>
				</C.Layer>
			</Container>
		</ArkhamIndexContext.Provider>
	);
}

export default ArkhamIndexDivider;
