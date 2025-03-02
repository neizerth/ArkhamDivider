import frameHorizontal from "./encounter__frame_horizontal.png";
import frameVertical from "./encounter__frame_vertical.png";

import ColorHorizontal from "./encounter__color_horizontal.svg?react";
import ColorVertical from "./encounter__color_vertical.svg?react";

import { LayoutOrientation } from "@/shared/model/types/layouts";
import horizontal from "./encounter_horizontal.jpg";
import vertical from "./encounter_vertical.jpg";

export const encounterImages = [
	{
		id: "encounter_vertical",
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
