import type { BoxProps } from "@mui/material";
import { isBlobUrl } from "@/modules/core/media/shared/lib";
import type { BaseIconProps } from "../../model";
import { CustomIcon } from "../CustomIcon";
import { FontIcon } from "../FontIcon";

export type IconProps = BoxProps & BaseIconProps;

export function Icon(props: IconProps) {
	const Component = isBlobUrl(props.icon) ? CustomIcon : FontIcon;
	return <Component {...props} />;
}
