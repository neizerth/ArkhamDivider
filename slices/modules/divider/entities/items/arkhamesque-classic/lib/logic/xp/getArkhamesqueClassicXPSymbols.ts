import { getXPLevel, getXPMax } from "@/modules/divider/shared/lib";
import type { XPCost } from "@/modules/divider/shared/model";
import { withIf } from "@/shared/util";
import { arkhamesqueClassicObjects as O } from "../../../config";
import type { ArkhamesqueClassicXPSymbol } from "../../../model";

type XPVariant = "single" | "plus" | "range";

const MAX_XP = 5;

export function getArkhamesqueClassicXPSymbols(xpCost: XPCost) {
	const em = (em: number, baseMm: number) => em * baseMm;

	const base = O.xp.baseFontSize;
	const level = getXPLevel(xpCost) ?? 0;
	const max = xpCost.type === "range" ? (getXPMax(xpCost) ?? 0) : null;

	const variant: XPVariant =
		max == null ? "single" : max === MAX_XP ? "plus" : "range";

	const v = O.xp.variant[variant];
	const fontSize = base * v.scale;
	const letterSpacing = "letterSpacing" in v ? v.letterSpacing : null;
	const letterSpacingMm =
		letterSpacing != null ? em(letterSpacing, fontSize) : undefined;

	const container = {
		fontSize,
		...withIf(v.top != null, { top: em(v.top, fontSize) }),
		...withIf(letterSpacingMm != null, { letterSpacing: letterSpacingMm }),
	};

	const numberTop = O.xp.number.downshiftValues.includes(level)
		? O.xp.number.downshiftTop
		: 0;

	const symbols: ArkhamesqueClassicXPSymbol[] = [
		{
			char: String(level),
			fontSize,
			...withIf(Boolean(numberTop), { top: em(numberTop, fontSize) }),
			...withIf(letterSpacingMm != null, { letterSpacing: letterSpacingMm }),
		},
	];

	if (max == null) {
		return {
			variant,
			container,
			symbols,
		};
	}

	if (variant === "plus") {
		const marginLeftByLevel = O.xp.plus.marginLeftByLevel as Partial<
			Record<number, number>
		>;
		const plusFontSize = fontSize * O.xp.plus.fontSize;
		const plusMarginLeft = marginLeftByLevel[level];
		symbols.push({
			char: "+",
			fontSize: plusFontSize,
			top: em(O.xp.plus.top, plusFontSize),
			...withIf(plusMarginLeft != null, {
				marginLeft: em(plusMarginLeft ?? 0, plusFontSize),
			}),
		});
	} else {
		const minusFontSize = fontSize * O.xp.minus.fontSize;
		symbols.push({
			char: "-",
			fontSize: minusFontSize,
			top: em(O.xp.minus.top, minusFontSize),
			marginRight: em(O.xp.minus.marginRight, minusFontSize),
			marginLeft: em(O.xp.minus.marginLeft, minusFontSize),
		});

		const maxTop = O.xp.number.downshiftValues.includes(max)
			? O.xp.number.downshiftTop
			: 0;

		symbols.push({
			char: String(max),
			fontSize,
			...withIf(Boolean(maxTop), { top: em(maxTop, fontSize) }),
			...withIf(letterSpacingMm != null, { letterSpacing: letterSpacingMm }),
		});
	}

	return {
		variant,
		container,
		symbols,
	};
}
