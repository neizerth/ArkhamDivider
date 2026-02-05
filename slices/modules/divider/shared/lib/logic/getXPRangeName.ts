export function getXPRangeName(min: number, max: number) {
	if (min === max) {
		return min.toString();
	}
	if (max === 5) {
		return `${min}+`;
	}
	return `${min} – ${max}`;
}
