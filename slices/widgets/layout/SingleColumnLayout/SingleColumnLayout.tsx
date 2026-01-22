import type { SxProps, Theme } from "@mui/material/styles";
import type { JSX } from "react";
import { Footer, Header } from "../partials";
import * as C from "./SingleColumnLayout.components";

type SingleColumnLayoutProps = JSX.IntrinsicElements["main"] & {
	sx?: SxProps<Theme>;
};

export function SingleColumnLayout(props: SingleColumnLayoutProps) {
	return (
		<C.Container>
			<Header />
			<C.Main {...props} />
			<Footer />
		</C.Container>
	);
}
