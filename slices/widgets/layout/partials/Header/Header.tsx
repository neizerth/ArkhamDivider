import type { JSX } from "react";
import * as C from "./Header.components";

type HeaderProps = JSX.IntrinsicElements["header"];

export function Header(props: HeaderProps) {
	return (
		<C.Container {...props}>
			<C.Content>
				<C.Logo />
				<C.Language />
			</C.Content>
		</C.Container>
	);
}
