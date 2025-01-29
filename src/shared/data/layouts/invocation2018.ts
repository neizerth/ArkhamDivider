import {
	ILayoutCategory,
	LayoutOrientation,
	LayoutType,
} from "@/shared/model/types/layouts";
import {
	classicLayoutCategory,
	common,
	horizontal,
	vertical,
	verticalForSleeves,
	// verticalForSleeves
} from "./classic";

export const invocation2018Layouts = [
	{
		...common,
		...horizontal,
		id: "invocation2018-horizontal",
		categoryId: "invocation2018",
		title: "Invocation 2018",
		types: [LayoutType.PLAYER, LayoutType.INVESTIGATOR],
		orientation: LayoutOrientation.HORIZONTAL,
		color: true,
	},
	{
		...common,
		...vertical,
		id: "invocation2018-vertical",
		categoryId: "invocation2018",
		title: "63x100",
		types: [LayoutType.PLAYER, LayoutType.INVESTIGATOR],
		orientation: LayoutOrientation.VERTICAL,
		color: true,
		bleed: {
			...vertical.bleed,
			top: 3,
			left: 3.2,
			bottom: 4,
			right: 4.8,
		},
	},
	{
		...common,
		...verticalForSleeves,
		id: "invocation2018-vertical-sleeves",
		categoryId: "invocation2018",
		title: "65x100",
		types: [LayoutType.PLAYER, LayoutType.INVESTIGATOR],
		orientation: LayoutOrientation.VERTICAL,
		color: true,
		bleed: {
			...verticalForSleeves.bleed,
			top: 3,
			left: 3,
			bottom: 4,
			right: 5,
		},
	},
];

export const invocation2018LayoutCategory: ILayoutCategory = {
	...classicLayoutCategory,
	id: "invocation2018",
	name: "Invocation 2018",
	info: "Invocation 2018 Event Promo Dividers",
};
