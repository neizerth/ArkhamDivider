import type { ArkhamIndexDividerLayoutObjects } from "../../../model";

type Options = {
	objects: ArkhamIndexDividerLayoutObjects;
	showIcon: boolean;
};

export const getArkhamIndexDividerTabTitleObject = ({
	objects: O,
	showIcon,
}: Options) => {
	if (showIcon) {
		return {
			...O.tabTitle.default,
			...O.tabTitle.withIcon,
		};
	}
	return O.tabTitle.default;
};
