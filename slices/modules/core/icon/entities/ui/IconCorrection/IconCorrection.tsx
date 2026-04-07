import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { isNumber, isString } from "ramda-adjunct";
import { getNumericStyleProps } from "@/shared/lib/ui";
import { defaultIconPositionManifest } from "../../../shared/config";
import { getIconCorrection } from "../../../shared/lib";
import type { IconPositionManifest } from "../../../shared/model";
import { Icon, type IconProps } from "../../../shared/ui";

export type IconCorrectionProps = IconProps & {
	manifest?: IconPositionManifest;
	disableCorrection?: boolean;
};

export function IconCorrection(props: IconCorrectionProps) {
	const {
		icon,
		manifest = defaultIconPositionManifest,
		disableCorrection = false,
		sx: sxProp,
		...restProps
	} = props;

	const position = getNumericStyleProps({
		props,
		properties: ["fontSize", "left", "right", "top", "bottom"],
	});

	const { fontSize, left, right, top, bottom } = position;

	const correction =
		fontSize && isString(icon)
			? getIconCorrection({
					icon,
					manifest,
					fontSize,
				})
			: {
					fontSize,
					top: 0,
					left: 0,
				};
	const baseSx: SxProps = {
		position: "relative",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		lineHeight: 1,
	};

	const correctionSx = disableCorrection
		? {
				...(isNumber(left) && { left: `${left}px` }),
				...(isNumber(right) && { right: `${right}px` }),
				...(isNumber(top) && { top: `${top}px` }),
				...(isNumber(bottom) && { bottom: `${bottom}px` }),
			}
		: ({
				...(isNumber(left) && { left: `${left + correction.left}px` }),
				...(isNumber(right) && { right: `${right - correction.left}px` }),
				...(isNumber(top) && { top: `${top + correction.top}px` }),
				...(isNumber(bottom) && {
					bottom: `${bottom - correction.top}px`,
				}),
			} as SxProps);

	const sx = {
		...baseSx,
		...sxProp,
		...(correction.fontSize && { fontSize: `${correction.fontSize}px` }),
		...correctionSx,
	} as SxProps;
	return (
		<Box sx={sx}>
			<Icon icon={icon} {...restProps} />
		</Box>
	);
}
