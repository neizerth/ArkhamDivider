import { FontIcon, type FontIconProps } from "../FontIcon";

export type IconProps = FontIconProps;

export function Icon(props: IconProps) {
	return <FontIcon {...props} />;
}
