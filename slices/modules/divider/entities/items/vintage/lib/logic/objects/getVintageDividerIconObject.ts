import type { VintageDividerObjects } from "../../../model";

type Options = {
	withXP: boolean;
	objects: VintageDividerObjects;
};

export function getVintageDividerIconObject({ withXP, objects: O }: Options) {
	if (!withXP) {
		return O.icon;
	}

	return {
		...O.icon,
		...O.icon.withXP,
	};
}
