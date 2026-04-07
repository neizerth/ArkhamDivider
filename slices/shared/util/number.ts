export const percent = (value: number) => value / 100;
export const divideBy = (divisor: number) => (value: number) => value / divisor;

export const round = (value: number, precision = 2) => {
	return Number(value.toFixed(precision));
};
