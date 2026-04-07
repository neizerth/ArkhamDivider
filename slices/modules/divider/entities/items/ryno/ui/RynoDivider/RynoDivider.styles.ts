import { alpha } from "@mui/material/styles";
import type { PrintSxCallback } from "@/modules/print/shared/model";
import { percent } from "@/shared/util";
import type { RynoDividerSxCallback } from "../../model";

export const getBodySx: PrintSxCallback = () => ({
	position: "absolute",
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 2,
});

export const getHeaderSx: PrintSxCallback = () => ({
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	zIndex: 1,
});

export const getCornerSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: 0,
	left: 0,
	height: mm(30),
	zIndex: 3,
});

export const getLeftIconSx: RynoDividerSxCallback = ({ mm, objects: O }) => ({
	position: "absolute",
	top: mm(O.icons.left.top),
	left: mm(O.icons.left.left),
	fontSize: mm(O.icons.left.fontSize),
	width: mm(O.icons.left.width),
	height: mm(O.icons.left.height),
	zIndex: 3,
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(30),
		},
	},
});

export const getRightIconSx: RynoDividerSxCallback = ({ mm, objects: O }) => ({
	position: "absolute",
	top: mm(O.icons.right.top),
	right: mm(O.icons.right.right),
	fontSize: mm(O.icons.right.fontSize),
	width: mm(O.icons.right.width),
	height: mm(O.icons.right.height),
	color: "white",
	zIndex: 3,
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(30),
		},
	},
});

export const getBackgroundIconSx: RynoDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	position: "absolute",
	top: mm(O.icons.background.top),
	left: mm(O.icons.background.left),
	right: mm(O.icons.background.right),
	fontSize: mm(O.icons.background.fontSize),
	color: alpha("#000000", O.icons.background.opacity),
	zIndex: 3,
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(30),
		},
	},
});

export const getContentSx: PrintSxCallback = () => ({
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 3,
});

export const getHeaderColorSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	bottom: mm(6),
	left: mm(6),
	width: mm(4),
	height: mm(4),
	zIndex: 4,
});

export const getMenuSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: `calc(50% + ${mm(2)})`,
	transform: `translateY(-50%)`,
	color: "rgb(0, 0, 0, 0.5)",
	left: mm(2.5),
	zIndex: 4,
});

export const getFactionImageSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	objectFit: "contain",
	top: mm(1.7),
	left: mm(2.7),
	height: mm(8),
	width: mm(8),
	zIndex: 3,
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(30),
		},
	},
});

export const getXPSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(1.7),
	right: mm(1.7),
	fontSize: mm(8),
	zIndex: 3,
});
