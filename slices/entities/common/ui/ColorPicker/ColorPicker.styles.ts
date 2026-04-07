import type { PrintSxCallback } from "@/modules/print/shared/model";
import { percent } from "@/shared/util";

export const getSx: PrintSxCallback = ({ mm }) => ({
	position: "absolute",
	bottom: 0,
	right: 0,
	aspectRatio: 1,
	width: "100%",
	height: "100%",
	border: `${mm(0.2)} solid #000`,
	borderRadius: "50%",
	cursor: "pointer",
	"@media screen": {
		":hover": {
			opacity: percent(50),
		},
	},
});
