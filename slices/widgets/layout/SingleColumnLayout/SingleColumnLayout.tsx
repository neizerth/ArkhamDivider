import type { PropsWithChildren } from "react";
import { Footer, Header } from "../partials";
import * as C from "./SingleColumnLayout.components";

export function SingleColumnLayout({ children }: PropsWithChildren) {
	return (
		<C.Container>
			<Header />
			<C.Main>{children}</C.Main>
			<Footer />
		</C.Container>
	);
}
