import type { PrintSxCallback } from "@/modules/print/shared/model";

export const getColorPickerSx: PrintSxCallback = ({ mm }) => ({
	width: mm(4),
	height: mm(4),
	aspectRatio: 1,
});
