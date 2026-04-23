import type { BoxProps } from "@mui/material/Box";
import { omit } from "ramda";
import { useAppSelector } from "@/shared/lib";
import { getIconChar, getIconScale, isEmptyIcon } from "../../lib/logic";
import { selectIconById } from "../../lib/store/selectors/selectIconById";
import type { BaseIconProps } from "../../model";
import * as C from "./FontIcon.components";

export type FontIconProps = BoxProps &
	BaseIconProps & {
		icon: string;
	};
export function FontIcon(props: FontIconProps) {
	const { scaleType, scaleFactor, resizeDisabled = false } = props;
	const icon = useAppSelector((state) => selectIconById(state, props.icon));

	const iconProps = omit(["icon", "scaleType", "scaleFactor"], props);

	if (isEmptyIcon(props.icon)) {
		const sx = { ...props.sx, width: "100%", height: "100%" };
		return <C.Container sx={sx} {...iconProps} />;
	}

	if (!icon) {
		return null;
	}
	const size = resizeDisabled
		? 100
		: getIconScale({
				scaleType,
				scaleFactor,
				ratio: icon?.ratio,
				circled: icon?.circled,
			});
	const fontSize = `${size}%`;

	const char = getIconChar(icon.code);

	const sx = { fontSize, ...props.sx };

	return (
		<C.Container
			data-icon={props.icon}
			className={props.className}
			sx={sx}
			{...iconProps}
		>
			{char}
		</C.Container>
	);
}
