import { groupBy, prop, propEq } from "ramda";
import type { DividerLayout, LayoutGroup } from "../../model";

export const createLayoutGroups = (layouts: DividerLayout[]): LayoutGroup[] => {
	const groups = groupBy(prop("groupId"), layouts);
	return Object.entries(groups)
		.filter((entry): entry is [string, DividerLayout[]] => {
			const [, layouts] = entry;
			return Boolean(layouts && layouts.length > 0);
		})
		.map(([id, layouts]): LayoutGroup => {
			const [firstLayout] = layouts;
			const { name, size } = firstLayout;

			const hasGrayscale = layouts.some(propEq(false, "color"));
			const hasColor = layouts.some(propEq(true, "color"));
			const canBeSleeved = layouts.some(({ sleeves }) => sleeves.length > 0);

			return {
				id,
				name,
				size,
				layouts,
				hasGrayscale,
				hasColor,
				canBeSleeved,
			};
		});
};
