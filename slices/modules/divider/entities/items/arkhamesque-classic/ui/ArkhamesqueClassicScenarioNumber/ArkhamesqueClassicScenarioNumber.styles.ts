import type { PrintSxCallback } from "@/modules/print/shared/model";
import { arkhamesqueClassicObjects as O } from "../../config";

export const getInputSx: PrintSxCallback = () => ({
	fontFamily: "Arkhamic, Teutonic, serif",
	textAlign: "center",
	whiteSpace: "nowrap",
	transform: "translateY(0.05em)",
});

export const getContainerSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	fontSize: mm(O.scenarioNumber.fontSize),
	left: "50%",
	top: "50%",
	transform: "translate(-50%, -50%)",
	width: mm(O.scenarioNumber.innerWidth),
});
