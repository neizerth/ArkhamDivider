import { Box, type BoxProps } from "@mui/material";
import { useLocaleSx } from "@/modules/core/i18n/entities/lib";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic";
import { usePrintSx } from "@/modules/print/shared/lib";
import {
	get3mmDividerDefaultIcon,
	show3mmDividerIconCorner,
	show3mmDividerPlayerCorner,
	show3mmDividerPlayerIcon,
} from "../../../lib";
import { useArkhamStarterDividerContext } from "../../ArkhamStarterDividerContext";
import { ArkhamStarterDividerPlayerCorner as PlayerCorner } from "../../ArkhamStarterDividerPlayerCorner";
import { ArkhamStarterDividerStrip as Strip } from "../../ArkhamStarterDividerStrip";
import { ArkhamStarterDividerXP } from "../../ArkhamStarterDividerXP";
import {
	ArkhamStarterDividerStoryTitleText as StoryTitle,
	ArkhamStarterDividerTitleText as Title,
} from "../../text";
import * as S from "./ArkhamStarterDividerHeader.styles";

type ArkhamStarterDividerTopHeaderProps = BoxProps;

export function ArkhamStarterDividerHeader({
	...props
}: ArkhamStarterDividerTopHeaderProps) {
	const { divider, titleObject } = useArkhamStarterDividerContext();
	const getPrintSx = usePrintSx();
	const getLocaleSx = useLocaleSx();

	const titleClearSx = getPrintSx(S.getTitleClearSx);
	const outlineSx = getPrintSx(S.getOutlineSx);
	const cornerIconSx = getPrintSx(S.getCornerIconSx);
	const stripSx = getPrintSx(S.getStripSx);
	const playerCornerSx = getPrintSx(S.getPlayerCornerSx);
	const playerIconSx = getPrintSx(S.getPlayerIconSx, { title: titleObject });
	const xpSx = getPrintSx(S.getXPSx);
	const titleSx = getLocaleSx(S.getTitleSx, { title: titleObject });
	const storyTitleSx = getLocaleSx(S.getStoryTitleSx);

	const xpCost = getDividerXPCost(divider);

	const getDividerIcon = useDividerIcon({
		dividerId: divider.id,
	});

	const [icon, selectIcon] = getDividerIcon({
		param: "icon",
		defaultIcon: get3mmDividerDefaultIcon(divider),
	});

	const [playerIcon, selectPlayerIcon] = getDividerIcon({
		param: "playerIcon",
		defaultIcon: divider.story?.icon,
	});

	const showCornerIcon = show3mmDividerIconCorner(divider);
	const showPlayerIcon = show3mmDividerPlayerIcon(divider);

	const showPlayerCorner = show3mmDividerPlayerCorner(divider);

	return (
		<Box {...props}>
			{showCornerIcon && (
				<Icon icon={icon} sx={cornerIconSx} onClick={selectIcon} />
			)}
			{showPlayerIcon && (
				<Icon icon={playerIcon} sx={playerIconSx} onClick={selectPlayerIcon} />
			)}
			{showPlayerCorner && (
				<PlayerCorner sx={playerCornerSx} onClick={selectIcon} />
			)}

			<Title sx={titleSx} />
			{divider.story && (
				<>
					<StoryTitle sx={storyTitleSx} />
					<Strip sx={stripSx} />
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
