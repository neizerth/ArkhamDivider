import type { GenericFunction } from "../model";

export const throttle = <T extends GenericFunction>(ms: number, fn: T) => {
	let timeout: ReturnType<typeof setTimeout> | null = null;
	let lastCall = 0;

	return (...args: Parameters<T>) => {
		const now = Date.now();
		const remaining = ms - (now - lastCall);
		if (remaining <= 0) {
			lastCall = now;
			return fn(...args);
		}
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			lastCall = Date.now();
			fn(...args);
		}, remaining);
	};
};
