import type { JSX } from "react";
import { Footer, Header } from "../partials";
import * as C from "./SingleColumnLayout.components";

type SingleColumnLayoutProps = JSX.IntrinsicElements["main"];

export function SingleColumnLayout(props: SingleColumnLayoutProps) {
	return (
		<C.Container>
			<Header />
			<C.Main {...props} />
			<Footer />
		</C.Container>
	);
}
