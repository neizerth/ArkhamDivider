import { Box, type BoxProps } from "@mui/material";
import { getDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic";
import { usePrintSx } from "@/modules/print/shared/lib";
import {
	get3mmDividerDefaultIcon,
	get3mmSideStripPosition,
	show3mmDividerIconCorner,
	show3mmDividerPlayerIcon,
	show3mmDividerStrip,
} from "../../../lib";
import { useArkhamStarterDividerContext } from "../../ArkhamStarterDividerContext";
import { ArkhamStarterDividerStrip as Strip } from "../../ArkhamStarterDividerStrip";
import { ArkhamStarterDividerXP } from "../../ArkhamStarterDividerXP";
import {
	ArkhamStarterDividerStoryTitleText as StoryTitle,
	ArkhamStarterDividerTitleText as Title,
} from "../../text";
// import * as C from "./ArkhamStarterDividerSideHeader.components";
import * as S from "./ArkhamStarterDividerSideHeader.styles";

type ArkhamStarterDividerSideHeaderProps = BoxProps;

export function ArkhamStarterDividerSideHeader(
	props: ArkhamStarterDividerSideHeaderProps,
) {
	const { divider, titleObject } = useArkhamStarterDividerContext();
	const getPrintSx = usePrintSx();

	const side = get3mmSideStripPosition(divider);

	const stripSx = getPrintSx(S.getStripSx, { side });
	const cornerIconSx = getPrintSx(S.getCornerIconSx);
	const titleSx = getPrintSx(S.getTitleSx, { title: titleObject });
	const storyTitleSx = getPrintSx(S.getStoryTitleSx, { side });
	const playerIconSx = getPrintSx(S.getPlayerIconSx, { title: titleObject });
	const xpSx = getPrintSx(S.getXPSx, { side });
	const titleClearSx = getPrintSx(S.getTitleClearSx);
	const outlineSx = getPrintSx(S.getOutlineSx);

	const showCornerIcon = show3mmDividerIconCorner(divider);

	const defaultIcon = get3mmDividerDefaultIcon(divider);

	const icon = getDividerIcon({
		divider,
		param: "icon",
		defaultIcon,
	});

	const playerIcon = getDividerIcon({
		divider,
		param: "playerIcon",
		defaultIcon: divider.story?.icon,
	});

	const xpCost = getDividerXPCost(divider);

	const showStrip = show3mmDividerStrip(divider);
	const showPlayerIcon = show3mmDividerPlayerIcon(divider);

	return (
		<Box {...props}>
			{showCornerIcon && <Icon icon={icon} sx={cornerIconSx} />}

			{showPlayerIcon && <Icon icon={playerIcon} sx={playerIconSx} />}
			<Title sx={titleSx} />
			{showStrip && (
				<>
					<Strip sx={stripSx} />
					<StoryTitle sx={storyTitleSx} />
				</>
			)}
			{xpCost && (
				<ArkhamStarterDividerXP
					xpCost={xpCost}
					sx={xpSx}
					titleClearSx={titleClearSx}
					outlineSx={outlineSx}
				/>
			)}
		</Box>
	);
}
