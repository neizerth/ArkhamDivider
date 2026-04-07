import { useCallback, useEffect, useRef, useState } from "react";

type Options = {
	dividerId: string;
	seedValue: string;
	persistedValue?: string;
	isControlledByParams: boolean;
};

/**
 * Holds the live, editable text value for a divider field.
 *
 * Responsibility:
 * - Keep `value` in state so UI updates immediately on change.
 * - Sync `value` from `seedValue` when:
 *   - the value is controlled by persisted params, OR
 *   - a new divider instance is generated (`dividerId` changed), OR
 *   - user hasn't typed yet (or the field is empty) and the default changes.
 *
 * This avoids the common "useRef doesn't re-render" pitfall and prevents
 * stale defaults after divider regeneration.
 */
export function useDividerTextValue({
	dividerId,
	seedValue,
	persistedValue,
	isControlledByParams,
}: Options) {
	const isDirtyRef = useRef(false);
	const prevDividerIdRef = useRef(dividerId);
	const prevPersistedRef = useRef<string | undefined>(persistedValue);
	const prevSeedRef = useRef(seedValue);

	const [value, setValue] = useState<string>(seedValue);

	const onChange = useCallback((next: string) => {
		isDirtyRef.current = true;
		setValue(next);
	}, []);

	useEffect(() => {
		const dividerChanged = prevDividerIdRef.current !== dividerId;
		prevDividerIdRef.current = dividerId;

		const persistedChanged = prevPersistedRef.current !== persistedValue;
		prevPersistedRef.current = persistedValue;

		const prevSeed = prevSeedRef.current;
		const seedChanged = prevSeed !== seedValue;
		prevSeedRef.current = seedValue;

		if (dividerChanged) {
			isDirtyRef.current = false;
			setValue(seedValue);
			return;
		}

		// Language change typically changes seedValue. If the user ended up keeping the
		// previous default (value === prevSeed), then we should follow the new default
		// even if `isDirtyRef` was set earlier.
		if (seedChanged && value === prevSeed) {
			isDirtyRef.current = false;
			setValue(seedValue);
			return;
		}

		// If store-controlled value changed externally, sync it unless user is editing.
		if (isControlledByParams && persistedChanged && !isDirtyRef.current) {
			setValue(seedValue);
			return;
		}

		// If the user hasn't typed yet (or the field is empty), follow default changes.
		const shouldFollowDefault =
			(!isDirtyRef.current || value === "") && !isControlledByParams;
		if (shouldFollowDefault) {
			isDirtyRef.current = false;
			setValue(seedValue);
		}
	}, [dividerId, isControlledByParams, seedValue, value, persistedValue]);

	return { value, onChange };
}
