import { Box } from "@mui/material";
import { getDividerTabPosition } from "@/modules/divider/shared/lib/logic/tab";
import { selectBleedEnabled, usePrintUnit } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { Image } from "@/shared/ui";
import { prefix } from "@/shared/util";
import { vintageDividerBaseUrl as baseUrl } from "../../config/common";
import { useVintageDividerContext } from "../VintageDividerContext/VintageDividerContext";
import * as S from "./VintageDivider.styles";

const asset = prefix(baseUrl);

const bodyMap: Record<string, string> = {
	vintage: "/body.avif",
	"vintage-large": "/body_large.avif",
	"vintage-vertical": "/body_vertical.avif",
};

export const Body = () => {
	const { layout } = useVintageDividerContext();
	const id = bodyMap[layout.id];

	const getPrintSx = usePrintUnit();
	const sx = getPrintSx(S.getBodySx);

	return <Image src={asset(id)} sx={sx} />;
};

export const Tab = ({
	tabWidth,
	color: backgroundColor,
}: {
	tabWidth: number;
	color: string;
}) => {
	const { tabIndex } = useVintageDividerContext();
	const { sxOptions } = useVintageDividerContext();
	const bleedEnabled = useAppSelector(selectBleedEnabled);

	const position = getDividerTabPosition({
		tabIndex,
		bleed: 3,
		tabsCount: 3,
		tabWidth,
	});

	const tabPosition = {
		...position,
		top: -3,
	};

	const getPrintSx = usePrintUnit(sxOptions);
	const sx = getPrintSx(S.getTabImageSx, {
		position: tabPosition,
		bleedEnabled,
	});

	const colorSxBase = getPrintSx(S.getTabColorSx);
	const colorSx = {
		...colorSxBase,
		backgroundColor,
	};

	return (
		<Box sx={sx}>
			<Box sx={colorSx} />
			<Image src={asset("/tab.avif")} width="100%" />
		</Box>
	);
};
