import { lazy } from "react";

export const sarnetskyVerticalFrames = {
	encounter: lazy(() => import("./encounter.svg?react")),
	scenario: lazy(() => import("./scenario.svg?react")),
};
