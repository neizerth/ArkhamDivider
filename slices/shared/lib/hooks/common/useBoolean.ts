import { useMemo, useState } from "react";

export function useBoolean(initialValue: boolean = false) {
	const [value, setValue] = useState(initialValue);

	const control = useMemo(
		() => ({
			set: (value: boolean) => setValue(value),
			on: () => setValue(true),
			off: () => setValue(false),
			toggle: () => setValue((value) => !value),
		}),
		[],
	);

	return [value, control] as const;
}
