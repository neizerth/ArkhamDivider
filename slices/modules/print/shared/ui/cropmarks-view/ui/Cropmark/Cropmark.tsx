import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { getCropmarkPosition } from "@/modules/print/shared/lib/logic/cropmark/getCropmarkPosition";
import type {
	BaseCropmarkProps,
	CropmarkType,
} from "@/modules/print/shared/model";
import { divideBy, px } from "@/shared/util";

type CropmarkProps = BaseCropmarkProps & {
	type: CropmarkType;
};

export function Cropmark(props: CropmarkProps) {
	const { mmSize } = props;
	const cropmarkSx = getCropmarkPosition({
		...props,
		mmSize: mmSize,
	});

	const mm = divideBy(mmSize);

	const sx: SxProps = {
		...cropmarkSx,
		width: px(cropmarkSx.width),
		height: px(cropmarkSx.height),
		backgroundColor: "black",
		"@media print": {
			left: `${mm(cropmarkSx.left)}mm`,
			top: `${mm(cropmarkSx.top)}mm`,
			width: `${mm(cropmarkSx.width)}mm`,
			height: `${mm(cropmarkSx.height)}mm`,
		},
	};

	return <Box position="absolute" data-type={props.type} sx={sx} />;
}
