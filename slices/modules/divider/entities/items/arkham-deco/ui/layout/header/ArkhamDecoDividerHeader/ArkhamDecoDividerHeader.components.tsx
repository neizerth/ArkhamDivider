import { Box } from "@mui/material";
import { Icon } from "@/modules/core/icon/shared/ui";
import { usePrintUnit } from "@/modules/print/shared/lib";
import type { StoryScenario } from "@/modules/story/shared/model";
import { Image } from "@/shared/ui";
import { prefix } from "@/shared/util";
import { arkhamDecoAssetUrl } from "../../../../config";
import { isArkhamDecoCompactLayout } from "../../../../lib";
import type { ArkhamDecoPosition } from "../../../../model";
import { useArkhamDecoDividerContext } from "../../../ArkhamDecoDividerContext";
import * as S from "./ArkhamDecoDividerHeader.styles";

const asset = prefix(arkhamDecoAssetUrl);

export const LeftScenarioCorner = () => {
	const { layout, sxOptions } = useArkhamDecoDividerContext();
	const getPrintSx = usePrintUnit(sxOptions);

	const isCompact = isArkhamDecoCompactLayout(layout);

	if (isCompact) {
		const sx = getPrintSx(S.getLeftTabCornerSx);
		return <Image src={asset("/top-corner.png")} sx={sx} />;
	}

	const sx = getPrintSx(S.getLeftHorizontalCornerSx);
	return <Image src={asset("/top-left-corner.png")} sx={sx} />;
};

export const RightScenarioCorner = () => {
	const { layout, sxOptions } = useArkhamDecoDividerContext();
	const getPrintSx = usePrintUnit(sxOptions);

	const isCompact = isArkhamDecoCompactLayout(layout);

	if (isCompact) {
		const sx = getPrintSx(S.getRightTabCornerSx);
		return <Image src={asset("/top-corner.png")} sx={sx} />;
	}

	const sx = getPrintSx(S.getRightHorizontalScenarioCornerSx);
	return <Image src={asset("/top-right-corner.png")} sx={sx} />;
};

export const StoryLine = ({ position }: { position: ArkhamDecoPosition }) => {
	const { sxOptions } = useArkhamDecoDividerContext();
	const getPrintSx = usePrintUnit(sxOptions);
	const sx = getPrintSx(S.getStoryLineSx, { position });

	return <Image src={asset("/tab-top-line.png")} sx={sx} />;
};

export const StoryLineTentacle = ({
	position,
}: {
	position: ArkhamDecoPosition;
}) => {
	const { sxOptions } = useArkhamDecoDividerContext();
	const getPrintSx = usePrintUnit(sxOptions);
	const sx = getPrintSx(S.getStoryLineTentacleSx, { position });
	return <Image src={asset("/tab-tentacles.png")} sx={sx} />;
};

export const NoIconLine = () => {
	const { sxOptions } = useArkhamDecoDividerContext();
	const getPrintSx = usePrintUnit(sxOptions);
	const sx = getPrintSx(S.getNoIconLineSx);
	return <Image src={asset("/top-line.png")} sx={sx} />;
};

export const ScenarioCorner = ({ scenario }: { scenario: StoryScenario }) => {
	const { sxOptions, layout } = useArkhamDecoDividerContext();

	const isCompact = isArkhamDecoCompactLayout(layout);

	const getPrintSx = usePrintUnit(sxOptions);
	const sx = getPrintSx(S.getScenarioCornerSx);
	const backgroundSx = getPrintSx(S.getScenarioBackgroundSx);
	const numberSx = getPrintSx(S.getScenarioNumberSx);

	const scenarioNumber = scenario.number_text;

	return (
		<Box sx={sx}>
			<Box sx={numberSx}>{scenarioNumber || <Icon icon="typejournal" />}</Box>

			{!isCompact && (
				<Image src={asset("/scenario-tentacles.png")} sx={backgroundSx} />
			)}
		</Box>
	);
};
