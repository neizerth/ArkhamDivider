import { groupBy, prop, propEq } from "ramda";
import type {
	DividerLayout,
	DividerLayoutCompatibility,
	DividerLayoutGroup,
} from "../../model";

export const createLayoutGroups = (
	layouts: DividerLayout[],
): DividerLayoutGroup[] => {
	const groups = groupBy(prop("groupId"), layouts);
	return Object.entries(groups)
		.filter((entry): entry is [string, DividerLayout[]] => {
			const [, layouts] = entry;
			return Boolean(layouts && layouts.length > 0);
		})
		.map(([id, layouts]): DividerLayoutGroup => {
			const [firstLayout] = layouts;
			const { name, size } = firstLayout;

			const hasGrayscale = layouts.some(propEq(false, "color"));
			const hasColor = layouts.some(propEq(true, "color"));
			const canBeSleeved = layouts.some(
				({ sleeves }) => sleeves && sleeves.length > 0,
			);

			const compatibility = layouts.reduce((acc, layout) => {
				const { compatibility } = layout ?? {};
				const {
					chapter1Box = false,
					chapter2Box = false,
					deckBox = false,
				} = compatibility ?? {};

				acc.chapter1Box = chapter1Box || acc.chapter1Box;
				acc.chapter2Box = chapter2Box || acc.chapter2Box;
				acc.deckBox = deckBox || acc.deckBox;

				return acc;
			}, {} as DividerLayoutCompatibility);

			return {
				id,
				name,
				size,
				layouts,
				hasGrayscale,
				hasColor,
				canBeSleeved,
				compatibility,
			};
		});
};
