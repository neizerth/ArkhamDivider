import frameHorizontal from "./scenario__frame_horizontal.png";
import frameVertical from "./scenario__frame_vertical.png";

import ColorHorizontal from "./scenario__color_horizontal.svg?react";
import ColorVertical from "./scenario__color_vertical.svg?react";

import horizontal from "./scenario_horizontal.jpg";
import vertical from "./scenario_vertical.jpg";

import { LayoutOrientation } from "@/shared/model/types/layouts";

export const scenarioImages = [
	{
		id: "scenario_vertical",
		orientation: LayoutOrientation.VERTICAL,
		frame: frameVertical,
		Color: ColorVertical,
		background: vertical,
	},
	{
		id: "scenario_horizontal",
		orientation: LayoutOrientation.HORIZONTAL,
		frame: frameHorizontal,
		Color: ColorHorizontal,
		background: horizontal,
	},
];
