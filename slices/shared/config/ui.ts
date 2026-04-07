export const absoluteFill = {
	position: "absolute",
	top: 0,
	left: 0,
	bottom: 0,
	right: 0,
} as const;

export const fullSize = {
	width: "100%",
	height: "100%",
} as const;

export const hiddenPrint = {
	"@media print": {
		display: "none",
	},
} as const;
