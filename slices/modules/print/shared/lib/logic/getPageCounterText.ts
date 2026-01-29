import type { Side } from "@/shared/model";

type Options = {
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
}: Options) => {
	if (showSide) {
		return `${number}${pageSideLetter[side]} / ${total}`;
	}
	return `${number} / ${total}`;
};
