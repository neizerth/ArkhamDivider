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
