import { Box } from "@mui/material";
import { useMemo } from "react";
import { selectCurrentLanguage } from "@/modules/core/i18n/shared/lib";
import { selectLayout } from "@/modules/divider/entities/lib";
import {
	DividerBleedView as BleedView,
	DividerContainer as Container,
	DividerContent as Content,
	DividerMenu,
} from "@/modules/divider/entities/ui";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon as Icon } from "@/modules/divider/features/ui";
import {
	getDividerFaction,
	getDividerXPCost,
} from "@/modules/divider/shared/lib";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { usePrintSx } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { Image } from "@/shared/ui";
import { prefix } from "@/shared/util";
import { binderBookmarkBaseUrl } from "../../config";
import {
	getBinderBookmarkDefaultIcon,
	getBinderBookmarkTitleObject,
	showBinderBookmarkIcon,
} from "../../lib";
import type { BinderBookmarkProps } from "../../model";
import { BinderBookmarkTitle as Title } from "../BinderBookmarkTitle";
import { BinderBookmarkXP as XP } from "../BinderBookmarkXP";
import * as S from "./BinderBookmark.styles";

const asset = prefix(binderBookmarkBaseUrl);

export function BinderBookmark(props: BinderBookmarkProps) {
	const layout = useAppSelector(selectLayout) as DividerLayout;
	const faction = getDividerFaction(props) ?? "neutral";
	const xpCost = getDividerXPCost(props);

	const language = useAppSelector(selectCurrentLanguage);

	const sxOptions = useMemo(
		() => ({
			faction,
			layout,
			titleObject: getBinderBookmarkTitleObject(language),
		}),
		[faction, layout, language],
	);

	const showBackgroundIcon = !["neutral", "multiclass"].includes(faction);

	const getPrintSx = usePrintSx(sxOptions);
	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const backgroundIconSx = getPrintSx(S.getBackgroundIconSx);
	const headerSx = getPrintSx(S.getHeaderSx);
	const titleBackgroundSx = getPrintSx(S.getTitleBackgroundSx);
	const titleSx = getPrintSx(S.getTitleSx);
	const topIconBackgroundSx = getPrintSx(S.getTopIconBackgroundSx);
	const imageIconSx = getPrintSx(S.getImageIconSx);
	const iconSx = getPrintSx(S.getIconSx);
	const xpCostBackgroundSx = getPrintSx(S.getXpCostBackgroundSx);
	const xpCostSx = getPrintSx(S.getXpCostSx);
	const menuSx = getPrintSx(S.getMenuSx);

	const titleType = xpCost ? "xp" : "default";
	const titleBackgroundUrl = asset(`/title/${titleType}.avif`);

	const getDividerIcon = useDividerIcon({
		dividerId: props.id,
	});

	const defaultIcon = getBinderBookmarkDefaultIcon(props);

	const [icon, selectIcon] = getDividerIcon({
		param: "icon",
		defaultIcon,
	});

	const iconBackgroundType = icon === "neutral" ? "neutral" : "default";
	const iconBackgroundUrl = asset(`/top-icon/${iconBackgroundType}.avif`);
	const iconUrl = `/images/faction/${faction}.png`;

	const showIcon = showBinderBookmarkIcon(props);

	return (
		<Container>
			<BleedView>
				<Image src={asset(`/${faction}.avif`)} sx={backgroundSx} />
				{showBackgroundIcon && (
					<Image
						src={asset(`/background-icon/${faction}.avif`)}
						sx={backgroundIconSx}
					/>
				)}
			</BleedView>
			<Content>
				<Box sx={headerSx}>
					<Image src={titleBackgroundUrl} sx={titleBackgroundSx} />
					<Image
						src={iconBackgroundUrl}
						sx={topIconBackgroundSx}
						onClick={selectIcon}
					/>
					{showIcon && (
						<Icon
							dividerId={props.id}
							icon={icon}
							sx={iconSx}
							onClick={selectIcon}
						/>
					)}
					{icon === faction && icon !== "neutral" && showBackgroundIcon && (
						<Image src={iconUrl} sx={imageIconSx} onClick={selectIcon} />
					)}
					{xpCost && (
						<>
							<Image src={asset(`/top-icon/xp.avif`)} sx={xpCostBackgroundSx} />
							<XP xpCost={xpCost} sx={xpCostSx} />
						</>
					)}
				</Box>

				<Title divider={props} sx={titleSx} />
				<DividerMenu dividerId={props.id} sx={menuSx} />
			</Content>
		</Container>
	);
}

export default BinderBookmark;
