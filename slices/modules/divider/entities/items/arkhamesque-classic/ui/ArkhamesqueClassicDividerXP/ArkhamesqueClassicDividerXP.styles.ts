import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { ArkhamesqueClassicXPSymbol } from "../../model";

export const getContainerSx: PrintSxCallback<{
	fontSize: number;
	top?: number;
	left?: number;
	letterSpacing?: number;
}> = ({ mm, fontSize, top, left, letterSpacing }) => ({
	position: "relative",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
	fontFamily: "Arno Pro, serif",
	fontSize: mm(fontSize),
	lineHeight: 1,
	...(top != null ? { top: mm(top) } : {}),
	...(left != null ? { left: mm(left) } : {}),
	...(letterSpacing != null ? { letterSpacing: mm(letterSpacing) } : {}),
});

export const getSymbolSx: PrintSxCallback<ArkhamesqueClassicXPSymbol> = ({
	mm,
	fontSize,
	top,
	left,
	marginLeft,
	marginRight,
	letterSpacing,
}) => ({
	position: "relative",
	fontSize: mm(fontSize),
	...(top != null ? { top: mm(top) } : {}),
	...(left != null ? { left: mm(left) } : {}),
	...(marginLeft != null ? { marginLeft: mm(marginLeft) } : {}),
	...(marginRight != null ? { marginRight: mm(marginRight) } : {}),
	...(letterSpacing != null ? { letterSpacing: mm(letterSpacing) } : {}),
});
