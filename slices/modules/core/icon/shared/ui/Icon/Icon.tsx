import type { BoxProps } from "@mui/material";
import { isCustomIcon } from "../../lib";
import type { BaseIconProps } from "../../model";
import { CustomIcon } from "../CustomIcon";
import { FontIcon } from "../FontIcon";

export type IconProps = BoxProps & BaseIconProps;

export function Icon(props: IconProps) {
	const Component = isCustomIcon(props.icon) ? CustomIcon : FontIcon;
	return <Component {...props} />;
}
