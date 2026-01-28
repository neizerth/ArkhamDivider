import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { defaultIconPositionManifest } from "../../../shared/config";
import { getIconCorrectionSx } from "../../../shared/lib";
import type { IconPositionManifest } from "../../../shared/model";
import { Icon, type IconProps } from "../../../shared/ui";

export type IconCorrectionProps = Omit<IconProps, "fontSize"> & {
	manifest?: IconPositionManifest;
	fontSize: number;
	/** left offset in px */
	left?: number;
	/** right offset in px */
	right?: number;
	/** top offset in px */
	top?: number;
	/** bottom offset in px */
	bottom?: number;
};

export function IconCorrection({
	icon,
	manifest = defaultIconPositionManifest,
	fontSize,
	left,
	right,
	top,
	bottom,
	sx: sxProp,
	...props
}: IconCorrectionProps) {
	const correctionSx = getIconCorrectionSx({
		icon,
		manifest,
		fontSize,
	});

	const baseSx: SxProps = {
		position: "relative",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		lineHeight: 1,
		fontSize: `${correctionSx.fontSize}px`,
		...(left && { left: `${left + correctionSx.left}px` }),
		...(right && { right: `${right - correctionSx.left}px` }),
		...(top && { top: `${top + correctionSx.top}px` }),
		...(bottom && { bottom: `${bottom - correctionSx.top}px` }),
	};

	const sx = {
		...baseSx,
		...sxProp,
	} as SxProps;

	return (
		<Box sx={sx}>
			<Icon icon={icon} {...props} />
		</Box>
	);
}
