import type { PrintSxCallback } from "@/modules/print/shared/model";
import type { ArkhamDecoDividerSxCallback } from "../../model";

export const getBackgroundSx: ArkhamDecoDividerSxCallback = ({
	objects: O,
}) => {
	const patterRatio = 3698 / 2570;
	const { rotated } = O.background;

	if (rotated) {
		return {
			objectFit: "contain",
			width: "100cqh",
			aspectRatio: patterRatio,
			transform: "rotate(90deg)",
		};
	}
	return {
		objectFit: "contain",
		width: "100%",
		height: "100%",
	};
};

export const getSx: PrintSxCallback = ({ mm }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	boxSizing: "border-box",
	paddingBlock: mm(5),
});

export const getIconSx: ArkhamDecoDividerSxCallback = ({ objects: O, mm }) => ({
	fontSize: mm(O.background.fontSize),
	opacity: 0.3,
	top: "1px",
	left: "1px",
});

export const getIconSelectionSx: ArkhamDecoDividerSxCallback = () => ({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: `50%`,
	aspectRatio: 1,
	borderRadius: "50%",
	zIndex: 5,
	cursor: "pointer",
	"@media screen": {
		":hover": {
			background: "rgba(255, 255, 255, 0.5)",
		},
	},
});

export const getIconContainerSx: ArkhamDecoDividerSxCallback = () => ({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
});
