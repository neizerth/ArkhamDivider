import type { JSX } from "react";
import * as C from "./Logo.components";

type LogoProps = Omit<JSX.IntrinsicElements["img"], "src" | "alt">;

export function Logo(props: LogoProps) {
	return <C.Container {...props} src="/images/logo.svg" alt="Arkham Divider" />;
}
