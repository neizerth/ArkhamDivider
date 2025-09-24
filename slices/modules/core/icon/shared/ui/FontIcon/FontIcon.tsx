import type { JSX } from "react";
import { useAppSelector } from "@/shared/lib";
import { selectIconById } from "../../lib/store/selectors/selectIconById";
import type { BaseIconProps } from "../../model";
import * as C from "./FontIcon.components";

export type FontIconProps = JSX.IntrinsicElements["span"] & BaseIconProps;
export function FontIcon(props: FontIconProps) {
	const icon = useAppSelector((state) => selectIconById(state, props.icon));

	if (!icon) {
		return null;
	}

	const char = String.fromCharCode(icon.code);

	return <C.Container className={props.className}>{char}</C.Container>;
}
