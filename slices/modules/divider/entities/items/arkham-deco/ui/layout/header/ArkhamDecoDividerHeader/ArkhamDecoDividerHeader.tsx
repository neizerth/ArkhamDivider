import { Box, type BoxProps } from "@mui/material";
import { useDividerRender } from "@/modules/divider/entities/lib";
import { useDividerIcon } from "@/modules/divider/features/lib";
import { DividerIcon } from "@/modules/divider/features/ui";
import { selectPlayerParams } from "@/modules/divider/shared/lib";
import { getDividerXPCost } from "@/modules/divider/shared/lib/logic";
import { selectLasercutEnabled, usePrintSx } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { getArkhamDecoIcons, showArkhamDecoRightIcon } from "../../../../lib";
import { useArkhamDecoDividerContext } from "../../../ArkhamDecoDividerContext";
import { ArkhamDecoDividerSideXP as XP } from "../ArkhamDecoDividerSideXP";
import * as C from "./ArkhamDecoDividerHeader.components";
import * as S from "./ArkhamDecoDividerHeader.styles";

type ArkhamDecoDividerHeaderProps = BoxProps;

export function ArkhamDecoDividerHeader(props: ArkhamDecoDividerHeaderProps) {
	const { layout, divider, sxOptions } = useArkhamDecoDividerContext();
	const lasercutEnabled = useAppSelector(selectLasercutEnabled);

	const isPDFRendering = useDividerRender({
		dividerId: divider.id,
		renderType: "pdf",
	});

	const { tab } = layout.params ?? {};
	const { numericXP = false, sideXP = false } =
		useAppSelector(selectPlayerParams);
	const getPrintSx = usePrintSx(sxOptions);

	const I = getArkhamDecoIcons({ divider, layout });

	const leftIconSx = getPrintSx(S.getLeftIconSx);
	const rightIconSx = getPrintSx(S.getRightIconSx);
	const centerIconSx = getPrintSx(S.getCenterIconSx);

	const xpCostSx = getPrintSx(S.getXpCostSx);
	const sideXPSx = getPrintSx(S.getSideXPSx, { numericXP });
	const tabLineSx = getPrintSx(S.getTabLineSx);

	const showTabLine =
		tab &&
		layout.orientation !== "vertical" &&
		(!isPDFRendering || !lasercutEnabled);

	const showRightIcon = showArkhamDecoRightIcon({ divider, numericXP, layout });
	const xpCost = getDividerXPCost(divider);

	const getDividerIcon = useDividerIcon({
		dividerId: divider.id,
		defaultIcon: I.left?.defaultIcon,
	});

	const [leftIcon, startLeftIcon] = getDividerIcon({
		param: I.left?.param ?? "none",
		defaultIcon: I.left?.defaultIcon,
	});
	const [rightIcon, startRightIcon] = getDividerIcon({
		param: I.right?.param ?? "none",
		defaultIcon: I.right?.defaultIcon,
	});
	const [centerIcon, startCenterIcon] = getDividerIcon({
		param: I.center?.param ?? "none",
		defaultIcon: I.center?.defaultIcon,
	});

	return (
		<>
			<Box {...props}>
				<C.LeftScenarioCorner />
				<C.RightScenarioCorner />
				{!I.center?.icon ? (
					<C.NoIconLine />
				) : (
					<>
						<C.StoryLine position="left" />
						<C.StoryLineTentacle position="left" />
						<C.StoryLine position="right" />
						<C.StoryLineTentacle position="right" />
					</>
				)}
				{showTabLine && <Box sx={tabLineSx} />}
				{divider.type === "scenario" && (
					<C.ScenarioCorner scenario={divider.scenario} />
				)}
			</Box>

			{numericXP && !showRightIcon && xpCost && (
				<Box sx={xpCostSx}>{xpCost.name}</Box>
			)}
			{sideXP && xpCost && <XP xpCost={xpCost} sx={sideXPSx} />}

			<DividerIcon
				dividerId={divider.id}
				icon={leftIcon}
				sx={leftIconSx}
				onClick={startLeftIcon}
			/>
			{showRightIcon && (
				<DividerIcon
					dividerId={divider.id}
					icon={rightIcon}
					sx={rightIconSx}
					onClick={startRightIcon}
				/>
			)}

			{I.center?.icon && (
				<DividerIcon
					dividerId={divider.id}
					icon={centerIcon}
					sx={centerIconSx}
					onClick={startCenterIcon}
				/>
			)}
		</>
	);
}
