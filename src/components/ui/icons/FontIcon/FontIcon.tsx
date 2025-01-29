import classNames from "classnames";
import S from "./FontIcon.module.scss";
import { propEq } from "ramda";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectIcons } from "@/shared/store/features/icons/icons";
import { getIconScale } from "./getIconScale";
import { IconProps } from "../Icon/Icon";

export type FontIconProps = IconProps;

export const FontIcon = ({
	icon,
	className,
	scaleType,
	scaleFactor,
}: FontIconProps) => {
	const icons = useAppSelector(selectIcons);
	const entry = icons.find(propEq(icon, "icon"));

	const char = entry && String.fromCharCode(entry.code);
	// const fontSize = entry?.ratio && `${entry.ratio}em`;
	const size = getIconScale({
		scaleType,
		scaleFactor,
		ratio: entry?.ratio,
		circled: entry?.circled,
	});
	const style = {
		fontSize: `${size}%`,
	};

	return (
		<span
			className={classNames(S.icon, S[icon], className)}
			style={style}
			data-icon={icon}
		>
			{char}
		</span>
	);
};
