import { Box } from "@mui/material";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { arkhamStarterDividerBaseUrl as baseUrl } from "../../config";
import * as S from "./ArkhamStarterDivider.styles";

export const Corners = () => {
	return (
		<>
			<HorizontalCorner />
			<VerticalCorner />
		</>
	);
};

const CornerImage = () => {
	const getPrintSx = usePrintUnit();
	const sx = getPrintSx(S.getCornerImageSx);
	return <Image src={`${baseUrl}/iconCorner.avif`} sx={sx} />;
};

export const HorizontalCorner = () => {
	const getPrintSx = usePrintUnit();
	const iconCornerSx = getPrintSx(S.getHorizontalCornerSx);
	return (
		<Box sx={iconCornerSx}>
			<CornerImage />
		</Box>
	);
};

export const VerticalCorner = () => {
	const getPrintSx = usePrintUnit();
	const sx = getPrintSx(S.getVerticalCornerSx);
	return (
		<Box sx={sx}>
			<CornerImage />
		</Box>
	);
};
