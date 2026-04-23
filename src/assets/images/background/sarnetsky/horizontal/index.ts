import { lazy } from "react";

export const sarnetskyHorizontalFrames = {
	encounter: lazy(() => import("./encounter.svg?react")),
	scenario: lazy(() => import("./scenario.svg?react")),
};
