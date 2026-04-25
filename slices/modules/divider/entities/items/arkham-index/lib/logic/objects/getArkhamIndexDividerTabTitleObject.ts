import type {
	ArkhamIndexDividerLayoutObjects,
	ArkhamIndexDividerTabSize,
} from "../../../model";

type Options = {
	objects: ArkhamIndexDividerLayoutObjects;
	showIcon: boolean;
	showSideText: boolean;
	tabSize: ArkhamIndexDividerTabSize;
};

export const getArkhamIndexDividerTabTitleObject = (options: Options) => {
	const { objects: O, showSideText, tabSize } = options;
	const base = getBaseObject(options);

	const sideObject = {
		...base,
		...(showSideText ? O.tabTitle.withSideText : {}),
	};

	if (tabSize !== "full") {
		return sideObject;
	}

	return {
		...sideObject,
		left: showSideText
			? O.tabTitle.fullOffset.withSideText
			: O.tabTitle.fullOffset.default,
	};

	// const fullOffset =

	// return {
	// ...sideObject,
	// ...(tabSize === "full" ? { left: O.tabTitle.fullOffset } : {}),
	// };
};

const getBaseObject = ({ objects: O, showIcon }: Options) => {
	if (showIcon) {
		return {
			...O.tabTitle.default,
			...O.tabTitle.withIcon,
		};
	}
	return O.tabTitle.default;
};
