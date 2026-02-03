import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { defaultIconPositionManifest } from "../../../shared/config";
import { getIconCorrection } from "../../../shared/lib";
import type { IconPositionManifest } from "../../../shared/model";
import { Icon, type IconProps } from "../../../shared/ui";

export type IconCorrectionProps = Omit<
	IconProps,
	"fontSize" | "left" | "right" | "top" | "bottom"
> & {
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
	disableCorrection?: boolean;
};

export function IconCorrection({
	icon,
	manifest = defaultIconPositionManifest,
	fontSize,
	left,
	right,
	top,
	bottom,
	disableCorrection = false,
	sx: sxProp,
	...props
}: IconCorrectionProps) {
	const correction = getIconCorrection({
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
	};

	const correctionSx = disableCorrection
		? {
				fontSize: `${correction.fontSize}px`,
				...(left && { left: `${left}px` }),
				...(right && { right: `${right}px` }),
				...(top && { top: `${top}px` }),
				...(bottom && { bottom: `${bottom}px` }),
			}
		: {
				fontSize: `${correction.fontSize}px`,
				...(left && { left: `${left + correction.left}px` }),
				...(right && { right: `${right - correction.left}px` }),
				...(top && { top: `${top + correction.top}px` }),
				...(bottom && { bottom: `${bottom - correction.top}px` }),
			};

	const sx = {
		...baseSx,
		...correctionSx,
		...sxProp,
	} as SxProps;

	return (
		<Box sx={sx}>
			<Icon icon={icon} {...props} />
		</Box>
	);
}
