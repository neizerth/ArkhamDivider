import type { BoxProps } from "@mui/material";
import { isString } from "ramda-adjunct";
import type { BaseIconProps, Icon as IconType } from "../../model";
import { FontIcon } from "../FontIcon";
import { MediaIcon } from "../MediaIcon";

export type IconProps = BoxProps &
	BaseIconProps & {
		icon?: IconType | string | null;
	};

export function Icon({ icon, ...props }: IconProps) {
	if (!icon) {
		return null;
	}
	if (isString(icon)) {
		return <FontIcon icon={icon} {...props} />;
	}
	return (
		<MediaIcon mediaId={icon.mediaId} fallback={icon.fallback} {...props} />
	);
}
