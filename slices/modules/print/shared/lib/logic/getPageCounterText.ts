import type { Side } from "@/shared/model";

export type GetPageCounterTextOptions = {
	number: number;
	total: number;
	showSide?: boolean;
	side: Side;
};

const pageSideLetter = {
	front: "A",
	back: "B",
};

export const getPageCounterText = ({
	number,
	total,
	showSide,
	side,
}: GetPageCounterTextOptions) => {
	if (showSide) {
		return `${number}${pageSideLetter[side]} / ${total}`;
	}
	return `${number} / ${total}`;
};
