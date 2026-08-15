import type { JSX } from "react";
import * as C from "./AppLoader.components";

export function AppLoader(props: JSX.IntrinsicElements["div"]) {
	return (
		<C.Container {...props}>
			{/*
			  No <picture> fallback here, unlike index.html: this renders only once the app
			  has booted, and anything running it already supports WebP.
			*/}
			<C.Image src="/images/loader.webp" alt="" />
		</C.Container>
	);
}
