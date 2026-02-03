export const nullableCollection = <T>(array: T[]): (T | null)[] => {
	return array.length === 0 ? [null] : array;
};
