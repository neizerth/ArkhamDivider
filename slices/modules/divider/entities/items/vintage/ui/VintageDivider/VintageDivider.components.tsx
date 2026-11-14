import { Box } from "@mui/material";
import { usePrintSx } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { prefix } from "@/shared/util";
import { vintageDividerBaseUrl as baseUrl } from "../../config/common";
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

export const Tab = ({ color: backgroundColor }: { color: string }) => {
	const { sxOptions } = useVintageDividerContext();

	const getPrintSx = usePrintSx(sxOptions);
	const sx = getPrintSx(S.getTabImageSx);

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
