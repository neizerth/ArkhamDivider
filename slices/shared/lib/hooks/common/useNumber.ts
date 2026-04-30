import { useMemo, useState } from "react";

type Options = {
	initialValue?: number;
	min?: number;
	max?: number;
	step?: number;
	loop?: boolean;
};

export function useNumber({
	initialValue = 0,
	min = 0,
	max = Infinity,
	step = 1,
	loop = false,
}: Options = {}) {
	const [value, setValue] = useState(initialValue);

	const control = useMemo(() => {
		const increment = () =>
			setValue((value) => {
				const newValue = value + step;
				if (loop) {
					return newValue > max ? min : newValue;
				}
				return Math.min(newValue, max);
			});

		const decrement = () =>
			setValue((value) => {
				const newValue = value - step;
				if (loop) {
					return newValue < min ? max : newValue;
				}
				return Math.max(newValue, min);
			});

		return {
			setValue,
			increment,
			decrement,
		};
	}, [min, max, step, loop]);

	return [value, control] as const;
}
