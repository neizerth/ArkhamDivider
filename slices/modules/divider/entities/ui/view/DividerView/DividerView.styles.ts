import { keyframes } from "@emotion/react";
import type { SxProps } from "@mui/material/styles";
import color from "color";
import { absoluteFill, theme } from "@/shared/config";

const glowColor = color(theme.palette.primary.dark).alpha(1);
const glowOpacity = {
	min: 0.2,
	max: 0.8,
};

const getGlowShadow = (opacity: number, sizes: number[]) => {
	return sizes
		.map((size) => `0 0 ${size}px ${glowColor.alpha(opacity).toString()}`)
		.join(", ");
};

const glow = keyframes({
	"0%": {
		boxShadow: getGlowShadow(glowOpacity.min, [3, 6, 9, 12]),
	},
	"50%": {
		boxShadow: getGlowShadow(glowOpacity.max, [4, 8, 12, 16]),
	},
	"100%": {
		boxShadow: getGlowShadow(glowOpacity.min, [3, 6, 9, 12]),
	},
});

const glowOffset = 3;

export const outlineSx: SxProps = {
	position: "absolute",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	top: glowOffset,
	left: glowOffset,
	right: glowOffset,
	bottom: glowOffset,
	borderRadius: 1,
	zIndex: 1,
	animation: `${glow} 2s ease-in-out infinite`,
};

export const renderContainerSx: SxProps = {
	...absoluteFill,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	background: "#f9f9f9",
	zIndex: 2,
};

const spinner = keyframes({
	"0%": {
		transform: "rotate(0deg)",
	},
	"100%": {
		transform: "rotate(360deg)",
	},
});

export const iconSx: SxProps = {
	position: "relative",
	zIndex: 2,
	fontSize: 40,
	color: theme.palette.primary.dark,
	opacity: 0.4,
	animation: `${spinner} 2s ease-in-out infinite`,
};
