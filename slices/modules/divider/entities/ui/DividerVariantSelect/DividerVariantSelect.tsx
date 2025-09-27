import type { JSX } from "react";
import * as C from "./DividerVariantSelect.components";

type DividerVariantSelectProps = JSX.IntrinsicElements["div"];
export function DividerVariantSelect(props: DividerVariantSelectProps) {
	return (
		<C.Container {...props}>
			<C.Button variant="text">
				<C.BrandingIcon />
			</C.Button>
		</C.Container>
	);
}
