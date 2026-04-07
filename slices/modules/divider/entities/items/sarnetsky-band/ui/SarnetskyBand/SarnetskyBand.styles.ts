import { percent } from "@/shared/util";
import type { SarnetskyBandSxCallback, SarnetskyBandType } from "../../model";

export const getIconSx: SarnetskyBandSxCallback = ({
	mm,
	objects: O,
	type,
}) => {
	if (type === "concealed") {
		return {};
	}
	const I = O.icon[type];
	const position = O.inlinePosition[type];
	return {
		position: "absolute",
		top: mm(I.top),
		[position]: mm(I.inlineValue),
		width: mm(I.width),
		height: mm(I.height),
		fontSize: mm(I.fontSize),
		borderRadius: "50%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
		"@media screen": {
			":hover": {
				opacity: percent(30),
			},
		},
	};
};

export const getTitleSx: SarnetskyBandSxCallback<{ offset: number }> = ({
	mm,
	objects: O,
	type,
	offset,
}) => {
	const T = O.title[type];
	const position = O.inlinePosition[type];

	const inlineValue = T.inlineValue + offset;

	return {
		position: "absolute",
		top: mm(T.top),
		[position]: mm(inlineValue),
		height: mm(T.height),
		width: "width" in T ? mm(T.width) : "auto",
		fontSize: mm(T.fontSize),
		textAlign: T.textAlign,
		color: T.color,
	};
};

const menuPosition: Record<SarnetskyBandType, number> = {
	scenario: 125,
	encounter: 15,
	standalone: 15,
	concealed: 15,
};

export const getMenuSx: SarnetskyBandSxCallback = ({ mm, type }) => ({
	position: "absolute",
	top: "50%",
	right: mm(menuPosition[type]),
	transform: "translateY(-50%)",
	zIndex: 6,
	opacity: 0.4,
});

export const getBackgroundSx: SarnetskyBandSxCallback = ({ mm }) => ({
	position: "absolute",
	top: 0,
	left: mm(-5),
	width: `calc(100% + ${mm(10)})`,
	height: "100%",
	zIndex: 1,
});

export const getColorPickerSx: SarnetskyBandSxCallback = ({ mm }) => ({
	position: "absolute",
	top: "50%",
	transform: "translateY(-50%)",
	right: mm(7),
	width: mm(4),
	height: mm(4),
	zIndex: 6,
});
