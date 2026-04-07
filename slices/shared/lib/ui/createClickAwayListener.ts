type Options = {
	ignore?: Node | null;
	callback: () => void;
};

export function createClickAwayListener({ callback, ignore }: Options) {
	return (event: MouseEvent | TouchEvent) => {
		if (ignore?.contains(event.target as Node)) {
			return;
		}

		callback();
	};
}
