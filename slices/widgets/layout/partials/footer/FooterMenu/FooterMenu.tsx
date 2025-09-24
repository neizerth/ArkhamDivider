import type { JSX } from "react";
import { Separator } from "@/shared/ui";
import * as C from "./FooterMenu.components";

type FooterMenuProps = JSX.IntrinsicElements["nav"];

export function FooterMenu(props: FooterMenuProps) {
	return (
		<C.Container {...props}>
			<C.Item to="/about">About</C.Item>
			<Separator />
			<C.Item to="/contact">How to print</C.Item>
		</C.Container>
	);
}
