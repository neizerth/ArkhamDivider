import type { SarnetskyDividerSxCallback } from "../../../model";

export const getBackgroundIconSx: SarnetskyDividerSxCallback = ({
	objects: O,
}) => ({
	mixBlendMode: "multiply",
	fontSize: "100cqh",
	opacity: O.background.opacity,
	color: "#000",
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: O.background.opacity * 0.5,
		},
	},
});

export const getBackgroundSx: SarnetskyDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	display: "flex",
	containerType: "size",
	maxHeight: mm(O.background.fontSize),
	flex: 1,
	justifyContent: "center",
	alignItems: "center",
});

export const getBackgroundContainerSx: SarnetskyDividerSxCallback = ({
	orientation,
}) => ({
	flex: 1,
	justifyContent: orientation === "horizontal" ? "flex-start" : "center",
});

export const getFrameColorPickerSx: SarnetskyDividerSxCallback = ({ mm }) => ({
	position: "absolute",
	bottom: mm(1.5),
	right: 0,
	zIndex: 3,
	width: mm(4),
	height: mm(4),
});

export const getOverlayColorPickerSx: SarnetskyDividerSxCallback = ({
	mm,
}) => ({
	position: "absolute",
	bottom: mm(8),
	right: 0,
	zIndex: 3,
	width: mm(4),
	height: mm(4),
});
