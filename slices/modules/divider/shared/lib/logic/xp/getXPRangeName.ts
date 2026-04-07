type Options = {
	min: number;
	max: number;
	absolute?: boolean;
};
export function getXPRangeName({ min, max, absolute = false }: Options) {
	if (min === max) {
		return min.toString();
	}
	if (max === 5 && !absolute) {
		return `${min}+`;
	}
	return `${min} – ${max}`;
}
