import type { PrintSxCallback } from "@/modules/print/shared/model";

const getPaddingBottom = (rows: number) => {
	const paddingMap: Record<number, number> = {
		1: 4,
		2: 1,
	};
	return paddingMap[rows] ?? 0;
};

export const getContainerSx: PrintSxCallback<{ rows: number }> = ({
	mm,
	rows,
}) => ({
	paddingTop: rows > 1 ? mm(1) : 0,
	paddingBottom: mm(getPaddingBottom(rows)),
	gap: mm(2),
});
