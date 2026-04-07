import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getContainerSx: PrintSxCallback = () => ({
	position: "relative",
	display: "inline-flex",
	height: "1em",
	width: "1em",
});

export const getImageSx: PrintSxCallback = () => ({
	position: "absolute",
	inset: 0,
	width: "100%",
	height: "100%",
	objectFit: "contain",
});

export const getLabelSx: PrintSxCallback<{ small?: boolean }> = ({
	small,
}) => ({
	position: "absolute",
	display: "flex",
	width: "100%",
	alignItems: "center",
	justifyContent: "center",
	fontFamily: "Arkhamic, Teutonic, serif",
	fontWeight: 700,
	fontSize: small ? "0.3em" : "0.42em",
	top: "7%",
	height: "65%",
	lineHeight: 1,
	color: "#fff",
	textShadow: "0 0 0.15em rgba(0,0,0,0.9)",
	transform: "translateY(-0.02em)",
	pointerEvents: "none",
});

export const getLevelsSx: PrintSxCallback = () => ({
	position: "absolute",
	left: "50%",
	height: "100%",
	bottom: 0,
	width: "100%",
	display: "flex",
	gap: "0.02em",
	transform: "translateX(-50%)",
	pointerEvents: "none",
});

export const getLevelIconSx: PrintSxCallback = () => ({
	position: "absolute",
	top: 0,
	bottom: "11%",
	left: 0,
	display: "flex",
	alignItems: "flex-end",
	justifyContent: "center",
	width: "100%",
	fontSize: "0.75em",
});
