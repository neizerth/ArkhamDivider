import type { Faction } from "@/modules/faction/shared/model";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { ArkhamIndexDividerSxCallback } from "../../model";

export const getBackgroundSx: PrintSxCallback = () => ({
	position: "absolute",
	inset: 0,
	objectFit: "cover",
});

export const getBackgroundStrokeSx: PrintSxCallback = () => ({
	position: "absolute",
	inset: 0,
	objectFit: "cover",
	pointerEvents: "none",
});

export const getBodySx: ArkhamIndexDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: mm(O.tab.height),
	left: 0,
	right: 0,
	bottom: 0,
});

export const getMediaContentSx: PrintSxCallback = () => ({
	position: "absolute",
	inset: 0,
});

export const getColorPickerSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 3,
	bottom: mm(13),
	left: mm(2.5),
	width: mm(4),
	height: mm(4),
	outline: `${mm(0.2)} solid rgba(255, 255, 255, 0.5)`,
	borderRadius: "50%",
});

export const getBackgroundIconSx: ArkhamIndexDividerSxCallback = ({
	mm,
	objects: O,
	faction,
}) => {
	interface Config {
		y: number;
		scale: number;
	}
	const config: Record<Faction, Config> = {
		neutral: {
			y: 2,
			scale: 1.3,
		},
		guardian: {
			y: 4,
			scale: 1,
		},
		seeker: {
			y: 0,
			scale: 1.2,
		},
		rogue: {
			y: 3,
			scale: 1.4,
		},
		mystic: {
			y: 5,
			scale: 1.4,
		},
		survivor: {
			y: 4,
			scale: 1.3,
		},
		multiclass: {
			y: 2,
			scale: 1.1,
		},
	};
	const F = config[faction];
	return {
		position: "absolute",
		fontSize: mm(O.backgroundIcon.fontSize * F.scale),
		top: `${50 + F.y}%`,
		transform: "translateY(-50%)",
		left: 0,
		right: 0,
		color: "rgba(255, 255, 255, 0.12)",
		cursor: "pointer",
	};
};

export const getMenuSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 5,
	top: `calc(50% - ${mm(3)})`,
	transform: "translateY(-50%)",
	left: mm(2.5),
	color: "#ffffff",
	filter: "drop-shadow(2px 2px 5px #000)",
});

export const getInfoSx: ArkhamIndexDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	fontSize: mm(3),
	bottom: mm(1.5),
	right: mm(1.5),
	gap: mm(0.5),
	alignItems: "center",
	color: "white",
	cursor: "pointer",
});

export const getDividerCardsSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	zIndex: 6,
	backgroundColor: "#ffffffb0",
	boxShadow: `inset 0 0 ${mm(2)} rgba(0, 0, 0, 0.5), 0 0 ${mm(1)} rgba(255, 255, 255, 0.2)`,
	left: mm(15),
	top: mm(20.5),
	bottom: mm(11),
	right: mm(1.5),
});
