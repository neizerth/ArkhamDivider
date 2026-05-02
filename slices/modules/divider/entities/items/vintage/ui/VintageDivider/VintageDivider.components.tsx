import { Box } from "@mui/material";
import { getDividerTabPosition } from "@/modules/divider/shared/lib/logic/tab";
import { selectBleedEnabled, usePrintSx } from "@/modules/print/shared/lib";
import { useAppSelector } from "@/shared/lib";
import { Image } from "@/shared/ui";
import { prefix } from "@/shared/util";
import { vintageDividerBaseUrl as baseUrl } from "../../config/common";
import { getVintageDividerTabsCount } from "../../lib";
import { useVintageDividerContext } from "../VintageDividerContext/VintageDividerContext";
import * as S from "./VintageDivider.styles";

const asset = prefix(baseUrl);

const bodyMap: Record<string, string> = {
	horizontal: "/body.avif",
	"horizontal-large": "/body_large.avif",
	vertical: "/body_vertical.avif",
	"vertical-large": "/body_vertical-large.avif",
};

export const Body = () => {
	const { layout } = useVintageDividerContext();
	const id = bodyMap[layout.groupId] ?? bodyMap.vintage;

	const getPrintSx = usePrintSx();
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
	const { tabIndex, layout, sxOptions } = useVintageDividerContext();
	const bleedEnabled = useAppSelector(selectBleedEnabled);

	const tabsCount = getVintageDividerTabsCount(layout);

	const position = getDividerTabPosition({
		tabIndex,
		bleed: 3,
		tabsCount,
		tabWidth,
	});

	const tabPosition = {
		...position,
		top: -3,
	};

	const getPrintSx = usePrintSx(sxOptions);
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
			<Image
				src={asset("/tab.avif")}
				sx={{ width: "100%", height: "100%", objectFit: "cover" }}
			/>
		</Box>
	);
};
