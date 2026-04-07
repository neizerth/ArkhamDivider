import type { BoxProps } from "@mui/material/Box";
import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import type { BoxSize } from "@/shared/model";
import type { Cropmark } from "../../../../model";
import { Cropmark as CropmarkComponent } from "../Cropmark/Cropmark";

type CropmarksViewProps = BoxProps & {
	cropmarks: Cropmark[];
	mmSize: number;
	bleed: number;
	bleedEnabled: boolean;
	/** unit size in mm */
	unitSize: BoxSize;
};

export function CropmarksView({
	sx: sxProp,
	cropmarks,
	mmSize,
	bleed,
	bleedEnabled,
	unitSize,
	...props
}: CropmarksViewProps) {
	const sx = {
		position: "relative",
		width: "100%",
		height: "100%",

		...sxProp,
	} as SxProps;

	const createProps = {
		bleed,
		mmSize,
		unitSize,
		bleedEnabled,
	};
	return (
		<Box {...props} sx={sx}>
			{cropmarks.map((cropmark) => {
				return (
					<CropmarkComponent
						key={cropmark.id}
						{...createProps}
						{...cropmark.position}
						type={cropmark.type}
					/>
				);
			})}
			{props.children}
		</Box>
	);
}
