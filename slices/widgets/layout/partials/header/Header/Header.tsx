import type { JSX } from "react";
import { PrintButton } from "@/modules/print/widgets/PrintButton";
import { PrintSettings } from "@/modules/print/widgets/PrintSettings";
import * as C from "./Header.components";

type HeaderProps = JSX.IntrinsicElements["header"];

export function Header(props: HeaderProps) {
	return (
		<C.Container {...props}>
			<C.Content>
				<C.Section>
					<C.Logo />
				</C.Section>
				<C.Section>
					<PrintSettings />
					<PrintButton />
				</C.Section>
			</C.Content>
		</C.Container>
	);
}
