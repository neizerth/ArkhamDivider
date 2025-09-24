import type { JSX } from "react";
import { PrintButton } from "../PrintButton";
import { PrintSettings } from "../PrintSettings";
import * as C from "./Header.components";

type HeaderProps = JSX.IntrinsicElements["header"];

export function Header(props: HeaderProps) {
	return (
		<C.Container {...props}>
			<C.Content>
				<C.Section>
					<C.Logo />
					<C.Language sx={{ display: { xs: "none", md: "block" } }} />
				</C.Section>
				<C.Section>
					<PrintSettings />
					<PrintButton />
				</C.Section>
			</C.Content>
		</C.Container>
	);
}
