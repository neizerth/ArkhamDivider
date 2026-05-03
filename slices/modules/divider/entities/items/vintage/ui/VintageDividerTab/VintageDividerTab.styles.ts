import { percent } from "@/shared/util";
import type { VintageDividerSxCallback } from "../../model";

export const getSx: VintageDividerSxCallback = ({ mm }) => ({
	height: mm(13),
});

export const getCircleSx: VintageDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 1,
	top: mm(1.5),
	left: "50%",
	transform: "translateX(-50%)",
	width: mm(7.5),
	height: mm(7.5),
	borderRadius: "50%",
	backgroundColor: "white",
});

export const getShiftSx: VintageDividerSxCallback<{
	position: "left" | "right";
}> = ({ mm, position, objects: O }) => ({
	position: "absolute",
	top: mm(4),
	[position]: mm(O.tabShift.offset),
	fontSize: mm(3),
	color: "white",
	WebkitTextStroke: `${mm(0.15)} #151616`,
	transform: position === "left" ? "rotate(180deg)" : "none",
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(70),
		},
	},
});

export const getTabCornerRadiusSx: VintageDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(-0.25),
	left: mm(-0.25),
	right: mm(-0.25),
	bottom: mm(0.25),
	borderRadius: `${mm(3)} ${mm(3)} 0 0`,
	border: `${mm(0.25)} dashed red`,
	borderBottom: "none",
});

export const getRadialXPSx: VintageDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 2,
	bottom: mm(1.8),
	left: "50%",
	transform: "translateX(-50%)",
	fontSize: mm(1.5),
});

export const getScenarioNumberSx: VintageDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 4,
	fontFamily: "Arkhamic, Teutonic, serif",
	bottom: mm(0.5),
	left: "50%",
	transform: "translate(-50%)",
	color: "black",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	width: mm(1.8),
	height: mm(1.8),
	borderRadius: "50%",
	backgroundColor: "white",
	border: `1px solid #151616`,
});

export const getScenarioNumberTextSx: VintageDividerSxCallback = ({ mm }) => ({
	fontSize: mm(1.3),
	position: "relative",
	transform: "translateY(12%)",
	whiteSpace: "nowrap",
});
