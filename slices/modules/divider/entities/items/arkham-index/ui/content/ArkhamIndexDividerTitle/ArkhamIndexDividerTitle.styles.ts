import { getArkhamIndexTitleAlign } from "../../../lib";
import type {
	ArkhamIndexDividerIconLocaleSxCallback,
	ArkhamIndexDividerSxCallback,
} from "../../../model";

export const getTitleSx: ArkhamIndexDividerIconLocaleSxCallback = ({
	mm,
	objects: O,
	fontFamily = "Teutonic",
}) => {
	const fontSizeScale = O.fontSizeScale[fontFamily];
	const fontSize = mm(O.title.fontSize * fontSizeScale);

	return {
		default: {
			color: "white",
			fontFamily: "Arkhamic, Teutonic, serif",
			fontSize,
		},
		ru: {
			fontFamily: `${fontFamily}, serif`,
		},
		cn: {
			fontFamily: "FZLiBian, Arkhamic, Teutonic, serif",
		},
		ko: {
			fontFamily: "SanCn, Arkhamic, Teutonic, serif",
		},
	};
};

export const getTextSx: ArkhamIndexDividerSxCallback = (options) => {
	const textAlign = getArkhamIndexTitleAlign(options);

	return {
		height: "100%",
		width: "100%",
		textAlign,
		whiteSpace: "nowrap",
	};
};

export const getStrokeSx: ArkhamIndexDividerSxCallback = ({ mm }) => ({
	textShadow: `0 0 ${mm(1)} black`,
	WebkitTextStroke: `${mm(0.3)} rgba(0, 0, 0, 0.5)`,
});

export const getTitleClearSx: ArkhamIndexDividerSxCallback = ({ mm }) => {
	return {
		color: "white",
		top: `calc(100% + ${mm(1)})`,
	};
};

export const getTitleOutlineSx: ArkhamIndexDividerSxCallback = ({ mm }) => {
	return {
		borderWidth: mm(0.3),
		borderRadius: mm(1),
		borderColor: "white",
		top: mm(0.5),
		bottom: mm(1),
		left: mm(-1),
		right: mm(-0.5),
	};
};

export const getCenterTextSx: ArkhamIndexDividerSxCallback = ({
	mm,
	tabIndex,
	tabsCount,
	tabSize,
	centerTextByTab,
}) => {
	const base = {
		position: "absolute",
		zIndex: 2,
		top: mm(2),
	} as const;

	if (centerTextByTab && tabSize !== tabsCount) {
		const offset = mm(-2);
		return {
			...base,
			...(tabIndex === 0
				? { transform: `translateX(100%)`, right: offset }
				: { transform: `translateX(-100%)`, left: offset }),
		};
	}

	return {
		...base,
		right: mm(0.5),
	};
};
