import { keyframes } from "@emotion/react";
import type { SxProps } from "@mui/material/styles";

const glowColor = "rgba(213, 186, 14, 1)";
const glowOpacity = {
	min: 0.2,
	max: 0.8,
};

const getGlowShadow = (opacity: number, sizes: number[]) => {
	return sizes
		.map((size) => `0 0 ${size}px ${glowColor.replace("1)", `${opacity})`)}`)
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

const glowOffset = 5;

export const outlineSx: SxProps = {
	position: "absolute",
	top: glowOffset,
	left: glowOffset,
	right: 5,
	bottom: 5,
	borderRadius: 1,
	zIndex: 2,
	animation: `${glow} 2s ease-in-out infinite`,
};
