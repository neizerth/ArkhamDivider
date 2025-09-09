import type { JSX } from "react";
import * as C from "./AppLoader.components";

export function AppLoader(props: JSX.IntrinsicElements["div"]) {
	return (
		<C.Container {...props}>
			<C.Image src="/images/loader.gif" />
		</C.Container>
	);
}
