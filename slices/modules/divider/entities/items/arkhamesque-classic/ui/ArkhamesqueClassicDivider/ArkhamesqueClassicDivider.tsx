import { Box } from "@mui/material";
import { useEffect } from "react";
import {
	DividerBleedView as BleedView,
	DividerContainer as Container,
	DividerContent as Content,
	DividerMenu,
} from "@/modules/divider/entities/ui";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon } from "@/modules/divider/features/ui";
import { deleteDivider } from "@/modules/divider/shared/lib";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { Image } from "@/shared/ui";
import {
	arkhamesqueClassicBottomManifest as bottomManifest,
	arkhamesqueClassicManifest as positionManifest,
} from "../../config";
import {
	getDefaultArkhamesqueClassicBottomIcon as getDefaultBottomIcon,
	getArkhamesqueClassicImage as getImage,
	selectArkhamesqueClassicData,
	showArkhamesqueClassicBottomIcon as showBottomIcon,
	showArkhamesqueClassicIcon as showIcon,
} from "../../lib";
import type { ArkhamesqueClassicDividerProps } from "../../model";
import { ArkhamesqueClassicContext as Context } from "../ArkhamesqueClassicContext";
import { ArkhamesqueClassicDividerXP as XP } from "../ArkhamesqueClassicDividerXP/ArkhamesqueClassicDividerXP";
import { ArkhamesqueClassicScenarioNumber as ScenarioNumber } from "../ArkhamesqueClassicScenarioNumber/ArkhamesqueClassicScenarioNumber";
import { ArkhamesqueClassicTitle as Title } from "../ArkhamesqueClassicTitle/ArkhamesqueClassicTitle";
import * as S from "./ArkhamesqueClassicDivider.styles";

export function ArkhamesqueClassicDivider(
	props: ArkhamesqueClassicDividerProps,
) {
	const dispatch = useAppDispatch();
	const getPrintSx = usePrintUnit();
	const backgroundSx = getPrintSx(S.getBackgroundSx);
	const leftIconSx = getPrintSx(S.getLeftIconSx);
	const bottomIconSx = getPrintSx(S.getBottomIconSx);
	const titleSx = getPrintSx(S.getTitleSx);
	const xpSx = getPrintSx(S.getXPSx);
	const scenarioNumberSx = getPrintSx(S.getScenarioNumberSx);
	const bottomIconContainerSx = getPrintSx(S.getBottomIconContainerSx);
	const menuSx = getPrintSx(S.getMenuSx);

	const data = useAppSelector(selectArkhamesqueClassicData);
	const background = getImage({
		divider: props,
		data,
	});

	const showLeftIcon = showIcon(props);

	const dividerId = props.id;

	const getDividerIcon = useDividerIcon({
		dividerId,
	});

	const [leftIcon, selectLeftIcon] = getDividerIcon({
		param: "icon",
		defaultIcon: props.icon,
	});

	const defaultBottomIcon = getDefaultBottomIcon(props);

	const [bottomIcon, selectBottomIcon] = getDividerIcon({
		param: "bottomIcon",
		defaultIcon: defaultBottomIcon,
	});

	const showSecondaryIcon = showBottomIcon(props);

	useEffect(() => {
		if (background) {
			return;
		}
		dispatch(deleteDivider(dividerId));
	}, [background, dispatch, dividerId]);

	return (
		<Context.Provider value={{ divider: props }}>
			<Container>
				{background && (
					<BleedView>
						<Image
							src={background}
							alt={props.id}
							sx={backgroundSx}
							crossOrigin="anonymous"
						/>
					</BleedView>
				)}
				<Content>
					<Title sx={titleSx} />
					{props.layoutType === "scenario" && (
						<ScenarioNumber sx={scenarioNumberSx} />
					)}
					{props.layoutType === "player" && props.xpCost && (
						<XP sx={xpSx} xpCost={props.xpCost} />
					)}
					{showLeftIcon && (
						<DividerIcon
							icon={leftIcon}
							sx={leftIconSx}
							scaleType="circle"
							onClick={selectLeftIcon}
							manifest={positionManifest}
						/>
					)}
					{showSecondaryIcon && (
						<Box sx={bottomIconContainerSx}>
							<DividerIcon
								icon={bottomIcon}
								sx={bottomIconSx}
								scaleType="circle"
								onClick={selectBottomIcon}
								manifest={bottomManifest}
							/>
						</Box>
					)}
					<DividerMenu dividerId={props.id} sx={menuSx} />
				</Content>
			</Container>
		</Context.Provider>
	);
}
