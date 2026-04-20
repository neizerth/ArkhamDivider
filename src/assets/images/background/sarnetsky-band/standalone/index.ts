import { lazy } from "react";

export const sarnetskyBandStandaloneAssets = {
	frame: lazy(() => import("./frame.svg?react")),
	variable: lazy(() => import("./variable.svg?react")),
};
