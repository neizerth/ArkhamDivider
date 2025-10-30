import type { JSX } from "react";
import { useAppSelector } from "@/shared/lib";
import { getIconScale } from "../../lib/logic";
import { selectIconById } from "../../lib/store/selectors/selectIconById";
import type { BaseIconProps } from "../../model";
import * as C from "./FontIcon.components";

export type FontIconProps = JSX.IntrinsicElements["span"] & BaseIconProps;
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

	return (
		<C.Container className={props.className} sx={{ fontSize }} {...props}>
			{char}
		</C.Container>
	);
}
