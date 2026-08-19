import type { PrintSxCallback } from "@/modules/print/shared/model";
import { investigatorTokenObjects as O } from "../../config";

const F = O.frame;

export const circleFrameSx: PrintSxCallback = ({ mm }) => {
	const offset = (F.width - F.borderWidth) / 2;
	return {
		position: "absolute",
		zIndex: 1,
		width: `calc(100% - ${mm(offset * 2)})`,
		height: `calc(100% - ${mm(offset * 2)})`,
		left: `${mm(offset)}`,
		top: `${mm(offset)}`,
		borderRadius: "50%",
	};
};
