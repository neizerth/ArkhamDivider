import type { BoxProps } from "@mui/material/Box";
import { omit } from "ramda";
import { useAppSelector } from "@/shared/lib";
import { getIconScale } from "../../lib/logic";
import { selectIconById } from "../../lib/store/selectors/selectIconById";
import type { BaseIconProps } from "../../model";
import * as C from "./FontIcon.components";

export type FontIconProps = BoxProps & BaseIconProps;
export function FontIcon(props: FontIconProps) {
	const { scaleType, scaleFactor } = props;
	const icon = useAppSelector((state) => selectIconById(state, props.icon));

	if (!icon) {
		return null;
	}

	const size = getIconScale({
		scaleType,
		scaleFactor,
		ratio: icon?.ratio,
		circled: icon?.circled,
	});
	const fontSize = `${size}%`;

	const char = String.fromCharCode(icon.code);

	const sx = { fontSize, ...props.sx };

	const iconProps = omit(["icon", "scaleType", "scaleFactor"], props);

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
