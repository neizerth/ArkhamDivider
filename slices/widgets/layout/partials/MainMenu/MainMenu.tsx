import type { JSX } from "react";
import * as C from "./MainMenu.components";

type MainMenuProps = JSX.IntrinsicElements["div"];

export function MainMenu(props: MainMenuProps) {
	return <C.Container {...props}></C.Container>;
}
