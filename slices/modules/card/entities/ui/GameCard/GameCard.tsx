import { Box, type BoxProps } from "@mui/material";
import {
	cardBorderRadius,
	cardSizeMap,
	cardSizeWithSleeveMap,
} from "@/modules/card/shared/config";
import type { CardSize, CardSleeveType } from "@/modules/card/shared/model";
import { usePrintPxCallback } from "@/modules/print/shared/lib";
import type { Orientation } from "@/shared/model";
import { rotateBoxSize } from "@/shared/util";

export type SampleCardProps = BoxProps & {
	sleeveType?: CardSleeveType;
	size: CardSize;
	orientation: Orientation;
	rounded?: boolean;
};

export function GameCard(props: SampleCardProps) {
	const { sleeveType, size, orientation, sx: sxProps, ...rest } = props;
	const mm = usePrintPxCallback();
	const initialBox = sleeveType
		? cardSizeWithSleeveMap[sleeveType]
		: cardSizeMap[size];

	const box =
		orientation === "portrait" ? initialBox : rotateBoxSize(initialBox);

	const sx = {
		width: mm(box.width),
		height: mm(box.height),
		borderRadius: props.rounded ? mm(cardBorderRadius) : 0,
		...sxProps,
	};

	console.log(sx);

	return <Box sx={sx} {...rest} />;
}
