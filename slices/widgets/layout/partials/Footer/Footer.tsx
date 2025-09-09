import type { JSX } from "react";
import * as C from "./Footer.components";

type FooterProps = JSX.IntrinsicElements["footer"];

export function Footer(props: FooterProps) {
	return (
		<C.Container {...props}>
			<h1>Footer.tsx</h1>
		</C.Container>
	);
}
