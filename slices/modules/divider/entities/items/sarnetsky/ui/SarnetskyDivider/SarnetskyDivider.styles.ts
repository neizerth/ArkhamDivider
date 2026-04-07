import {
	getIsSarnetskyLightTitleColor,
	getSarnetskyScenarioContentObject,
	getSarnetskyTitleObject as getTitleObject,
} from "../../lib";
import type { SarnetskyDividerSxCallback } from "../../model";

export const getTitleSx: SarnetskyDividerSxCallback = (params) => {
	const { mm } = params;
	const O = getTitleObject(params);

	return {
		position: "absolute",
		top: mm(O.top),
		height: mm(O.height),
		left: mm(O.left),
		right: mm(O.right),
		zIndex: 4,
	};
};

export const getSx: SarnetskyDividerSxCallback = (params) => {
	const isLight = getIsSarnetskyLightTitleColor(params);
	const color = isLight ? "#fff" : "#000";

	return {
		color,
	};
};

export const getRadialXPSx: SarnetskyDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(5.8),
	right: mm(5.3),
	fontSize: mm(6.4),
	zIndex: 3,
});

export const getInlineXPSx: SarnetskyDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(8),
	right: mm(16.5),
	fontSize: mm(2),
	zIndex: 3,
});

export const getScenarioSubtitleSx: SarnetskyDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: mm(O.subtitle.top),
	right: mm(O.subtitle.right),
	left: mm(O.subtitle.left),
	zIndex: 4,
});

export const getPlayerSubtitleSx: SarnetskyDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: mm(O.playerSubtitle.top),
	right: mm(O.playerSubtitle.right),
	left: mm(O.playerSubtitle.left),
	zIndex: 4,
});

export const getScenarioContentSx: SarnetskyDividerSxCallback = ({
	mm,
	objects: O,
	type,
}) => {
	const S = getSarnetskyScenarioContentObject({ type, objects: O });
	return {
		position: "absolute",
		top: mm(S.top),
		left: mm(S.left),
		right: mm(S.right),
		bottom: mm(S.bottom),
		zIndex: 3,
	};
};

export const getMenuSx: SarnetskyDividerSxCallback = ({ mm, orientation }) => ({
	position: "absolute",
	top: orientation === "horizontal" ? mm(23) : mm(38),
	left: mm(5.3),
	fontSize: mm(6.4),
	zIndex: 3,
	opacity: 0.4,
});
