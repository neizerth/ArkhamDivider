import type { JSX } from "react";
import { Icon } from "@/modules/core/icon/shared/ui";
import * as C from "./DividerVariantSelect.components";

type DividerVariantSelectProps = JSX.IntrinsicElements["div"];

export function DividerVariantSelect(props: DividerVariantSelectProps) {
	return (
		<C.Container {...props}>
			<C.Button variant="text">
				<Icon icon="paintbrush" />
			</C.Button>
		</C.Container>
	);
}
