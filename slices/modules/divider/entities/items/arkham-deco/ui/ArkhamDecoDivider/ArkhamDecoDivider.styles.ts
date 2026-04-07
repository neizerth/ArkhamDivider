import type { PrintSxCallback } from "@/modules/print/shared/model";
import { getArkhamDecoTitleObject } from "../../lib";
import type { ArkhamDecoDividerSxCallback } from "../../model";

const headerHeight = 6;

export const getContentSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: 0,
	left: mm(0.8),
	right: mm(0.8),
	bottom: mm(0.8),
});

export const getBodySx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: mm(headerHeight),
	left: 0,
	right: 0,
	bottom: 0,
});

export const getSideBorderSx: PrintSxCallback<{
	position: "left" | "right";
}> = ({ mm, position }) => ({
	position: "absolute",
	height: mm(15),
	top: "50%",
	[position]: 0,
	transform:
		position === "left" ? "translateY(-50%) scaleX(-1)" : "translateY(-50%)",
});
export const getBackgroundIconSx: PrintSxCallback = () => ({
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 3,
});

export const getHeaderSx: PrintSxCallback = () => ({
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	zIndex: 3,
});

export const getTitleSx: ArkhamDecoDividerSxCallback = (options) => {
	const { mm } = options;

	const T = getArkhamDecoTitleObject(options);
	return {
		position: "absolute",
		zIndex: 5,
		top: mm(T.top),
		height: mm(T.height),
		left: mm(T.left),
		right: mm(T.right),
	};
};

export const getCardsCountSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	bottom: mm(4),
	right: mm(4.8),
	zIndex: 6,
});

export const getDividerCardsSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	backgroundColor: "#fff",
	boxShadow: `0 0 ${mm(3)} rgba(255, 255, 255, 1)`,
	borderRadius: mm(1),
	zIndex: 6,
	left: mm(2),
	right: mm(2),
	top: mm(8),
	bottom: mm(10),
});

export const getTabCornerRadiusSx: ArkhamDecoDividerSxCallback = ({
	mm,
	objects: O,
}) => ({
	overflow: "hidden",
	position: "absolute",
	top: mm(O.header.height),
	left: 0,
	right: 0,
	bottom: 0,
	zIndex: 2,
});

export const getMenuSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	top: "50%",
	transform: "translateY(-50%)",
	left: mm(3.5),
	zIndex: 6,
	color: "#b3b3b3",
});
