import type { SarnetskyBandSxCallback } from "../../model";

export const getFrameSx: SarnetskyBandSxCallback = () => ({
	position: "absolute",
	top: "50%",
	left: 0,
	transform: "translateY(-50%)",
	zIndex: 3,
});

export const getVariableSx: SarnetskyBandSxCallback = () => ({
	position: "absolute",
	top: "50%",
	left: 0,
	transform: "translateY(-50%)",
	width: "100%",
	mixBlendMode: "multiply",
	zIndex: 2,
});

export const getBackgroundSx: SarnetskyBandSxCallback = () => ({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	zIndex: 1,
});

export const getLineSx: SarnetskyBandSxCallback = () => ({
	position: "absolute",
	inset: 0,
	width: "100%",
	zIndex: 1,
});
