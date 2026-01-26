import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { defaultIconPositionManifest } from "../../../shared/config";
import { getIconCorrectionSx } from "../../../shared/lib";
import type { IconPositionManifest } from "../../../shared/model";
import { Icon, type IconProps } from "../../../shared/ui";

type IconCorrectionProps = Omit<IconProps, "fontSize"> & {
	containerSx?: SxProps;
	manifest?: IconPositionManifest;
	fontSize: number;
};

export function IconCorrection({
	icon,
	manifest = defaultIconPositionManifest,
	fontSize,
	...props
}: IconCorrectionProps) {
	const correctionSx = getIconCorrectionSx({
		icon,
		manifest,
		fontSize,
	});

	const baseSx: SxProps = {
		position: "relative",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		lineHeight: 1,
	};

	const sx = {
		...baseSx,
		...(props.containerSx ?? {}),
		...correctionSx,
	} as SxProps;

	return (
		<Box sx={sx}>
			<Icon icon={icon} {...props} />
		</Box>
	);
}
