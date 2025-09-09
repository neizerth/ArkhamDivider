import type { JSX } from "react";
import * as C from "./Header.components";

type HeaderProps = JSX.IntrinsicElements["header"];

export function Header(props: HeaderProps) {
	return (
		<C.Container {...props}>
			<h1>Header.tsx</h1>
		</C.Container>
	);
}
