import { useState } from "react";

export function useBoolean(initialValue: boolean = false) {
	const [value, setValue] = useState(initialValue);

	return {
		set: (value: boolean) => setValue(value),
		on: () => setValue(true),
		off: () => setValue(false),
		toggle: () => setValue((value) => !value),
		value,
	};
}
