import { percent } from "@/shared/util";
import { getArkhamIndexDividerTabTitleObject } from "../../../lib";
import type { ArkhamIndexDividerSxCallback } from "../../../model";

type Options = {
	iconLeft: number;
	showIcon: boolean;
	tabWidth: number;
	tabLeft: number;
};

export const getIconSx: ArkhamIndexDividerSxCallback<Options> = ({
	mm,
	objects: O,
	iconLeft: left,
}) => ({
	position: "absolute",
	fontSize: mm(O.icon.fontSize),
	left: mm(left),
	top: mm(O.icon.top),
	width: mm(O.icon.width),
	height: mm(O.icon.height),
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(70),
		},
	},
});

export const getBackgroundSx: ArkhamIndexDividerSxCallback<Options> = ({
	mm,
	iconLeft: left,
	objects: O,
	showIcon,
}) => {
	const size = O.iconBackground.width;
	return {
		position: "absolute",
		width: mm(size),
		height: mm(size),
		top: mm(O.iconBackground.top),
		left: mm(left + O.iconBackground.left),
		cursor: "pointer",
		opacity: showIcon ? 1 : 0.3,
		"@media screen": {
			":hover": {
				opacity: percent(70),
			},
		},
	};
};

export const getScenarioBackgroundSx: ArkhamIndexDividerSxCallback<Options> = ({
	mm,
	iconLeft: left,
	objects: O,
}) => {
	const size = O.scenarioBackground.width;
	const offset = {
		x: O.scenarioBackground.left,
		y: O.scenarioBackground.top,
	};
	return {
		position: "absolute",
		width: mm(size),
		height: mm(size),
		top: mm(offset.y),
		left: mm(left + offset.x),
	};
};

export const getScenarioNumberSx: ArkhamIndexDividerSxCallback<Options> = ({
	mm,
	objects: O,
	iconLeft: left,
}) => {
	return {
		position: "absolute",
		fontFamily: "Arkhamic, Teutonic, serif",
		fontSize: mm(O.scenarioNumber.fontSize),
		top: mm(O.scenarioNumber.top),
		left: mm(left + O.scenarioNumber.left),
		width: mm(O.scenarioNumber.width),
		height: mm(O.scenarioNumber.height),
		textAlign: "center",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	};
};

export const getTitleSx: ArkhamIndexDividerSxCallback<Options> = (options) => {
	const { mm, tabWidth, tabLeft } = options;
	const T = getArkhamIndexDividerTabTitleObject(options);
	const width = tabWidth - T.right;
	const left = tabLeft + T.left;

	return {
		position: "absolute",
		fontSize: mm(T.fontSize),
		top: mm(T.top),
		left: mm(left),
		width: mm(width),
		height: mm(T.height),
	};
};
