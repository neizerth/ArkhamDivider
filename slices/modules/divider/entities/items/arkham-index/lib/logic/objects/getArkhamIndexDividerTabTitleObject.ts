import type {
	ArkhamIndexDividerLayoutObjects,
	ArkhamIndexDividerTabSize,
} from "../../../model";

type Options = {
	objects: ArkhamIndexDividerLayoutObjects;
	showIcon: boolean;
	showSideText: boolean;
	tabSize: ArkhamIndexDividerTabSize;
	indentSize: number;
};

export const getArkhamIndexDividerTabTitleObject = (options: Options) => {
	const { objects: O, showSideText, tabSize, indentSize } = options;
	const base = getBaseObject(options);

	const sideObject = {
		...base,
		...(showSideText ? O.tabTitle.withSideText : {}),
	};

	if (tabSize !== "full") {
		return {
			...sideObject,
			left: sideObject.left + indentSize,
			right: sideObject.right + indentSize,
		};
	}

	const left = showSideText
		? O.tabTitle.fullOffset.withSideText
		: O.tabTitle.fullOffset.default;

	return {
		...sideObject,
		left: left + indentSize,
	};
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
