import { Box } from "@mui/material";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { Image } from "@/shared/ui";
import { prefix } from "@/shared/util";
import { arkhamDecoAssetUrl } from "../../../config";
import type { ArkhamDecoPosition } from "../../../model";
import * as S from "./ArkhamDecoDividerFooter.styles";

const asset = prefix(arkhamDecoAssetUrl);

export const Corner = ({ position }: { position: ArkhamDecoPosition }) => {
	const getPrintSx = usePrintUnit();
	const sx = getPrintSx(S.getBottomCornerSx, { position });
	const imageSx = getPrintSx(S.getBottomCornerImageSx);
	const tentacleSx = getPrintSx(S.getBottomTentacleSx);

	return (
		<Box sx={sx}>
			<Image src={asset("/bottom-tentacle.svg")} sx={tentacleSx} />
			<Image src={asset("/bottom-corner.svg")} sx={imageSx} />
		</Box>
	);
};
