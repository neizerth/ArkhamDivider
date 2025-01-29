import { CustomIcon } from "@/components";
import type {
	IconScaleFactor,
	IconScaleType,
} from "@/shared/model/types/icons";
import type { PropsWithClassName } from "@/shared/model/types/util";
import { FontIcon } from "../FontIcon/FontIcon";

export type IconProps = PropsWithClassName & {
	icon: string;
	scaleType?: IconScaleType;
	scaleFactor?: IconScaleFactor;
};

export const Icon = ({ icon, ...props }: IconProps) => {
	const isURL = icon.startsWith("blob:");
	const Component = isURL ? CustomIcon : FontIcon;

	return <Component {...props} icon={icon} />;
};
