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
}> = ({ mm, position }) => ({
	position: "absolute",
	top: mm(4),
	[position]: mm(5),
	fontSize: mm(3),
	color: "white",
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
