import { isNumber, isString } from "ramda-adjunct";
import { useCallback, useEffect, useRef } from "react";
import { setDividerParam, updateDivider } from "@/modules/divider/shared/lib";
import { useAppDispatch } from "@/shared/lib";
import type { UseDividerTextOptions } from "./useDividerText.types";
import { useDividerTextSeedValue } from "./useDividerTextSeedValue";
import { useDividerTextValue } from "./useDividerTextValue";
import { useFontSizeScaleRef } from "./useFontSizeScaleRef";

/**
 * High-level hook that wires together:
 * - default/persisted text resolution + translations
 * - reactive local editing value (updates immediately, not only on blur)
 * - persisting edited value + font size scale on blur
 *
 * Contract:
 * - If `params[param]` exists, it always wins as the displayed value.
 * - Otherwise the value follows the translated default until the user edits it.
 */
export const useDividerText = <T>({
	divider,
	param,
	defaultValue: defaultValueProp,
	fontSizeScaleParam,
	custom = false,
	persistFontSizeScaleOnChange = false,
}: UseDividerTextOptions<T>) => {
	const dispatch = useAppDispatch();
	const { id } = divider;

	const defaultFontSizeScale = fontSizeScaleParam
		? (divider.params as Record<string, string> | undefined)?.[
				fontSizeScaleParam
			]
		: divider.fontSizeScale;

	const {
		seedValue,
		defaultCurrentValue,
		isControlledByParams,
		persistedValue,
	} = useDividerTextSeedValue({
		divider,
		param,
		defaultValue: defaultValueProp,
		custom,
	});

	const { value, onChange } = useDividerTextValue({
		dividerId: id,
		seedValue,
		persistedValue,
		isControlledByParams,
	});

	const prevDefaultCurrentValueRef = useRef(defaultCurrentValue);
	useEffect(() => {
		const prevDefault = prevDefaultCurrentValueRef.current;
		prevDefaultCurrentValueRef.current = defaultCurrentValue;

		// If params contain a previously translated default, drop it so the field
		// can follow the newly translated default (e.g. after language switch).
		const shouldResetToDefault =
			typeof persistedValue === "string" &&
			typeof defaultCurrentValue === "string" &&
			typeof prevDefault === "string" &&
			persistedValue === prevDefault &&
			value === persistedValue;

		if (!shouldResetToDefault) {
			return;
		}

		dispatch(setDividerParam({ id, key: param, value: null }));
		if (fontSizeScaleParam) {
			dispatch(setDividerParam({ id, key: fontSizeScaleParam, value: 100 }));
		}
	}, [
		defaultCurrentValue,
		persistedValue,
		value,
		dispatch,
		id,
		param,
		fontSizeScaleParam,
	]);

	const { fontSizeScaleRef, onFontSizeChange } = useFontSizeScaleRef(
		divider.fontSizeScale,
	);

	const persistFontSizeScale = useCallback(
		(
			nextFontSizeScale: number,
			options?: { ignoreClearParamForFontSizeScale?: boolean },
		) => {
			const isValueEmpty = value === "";
			const isDefaultCurrentValueEmpty =
				isString(defaultCurrentValue) && value === defaultCurrentValue;

			const shouldClearParamRaw = isValueEmpty || isDefaultCurrentValueEmpty;
			const shouldClearParam =
				options?.ignoreClearParamForFontSizeScale === true
					? false
					: shouldClearParamRaw;

			const shouldUpdateFontSizeScale =
				isNumber(nextFontSizeScale) &&
				nextFontSizeScale !== defaultFontSizeScale;

			if (!shouldUpdateFontSizeScale) {
				return;
			}

			if (fontSizeScaleParam) {
				dispatch(
					setDividerParam({
						id,
						key: fontSizeScaleParam,
						value: shouldClearParam ? 100 : nextFontSizeScale,
					}),
				);
			}

			dispatch(
				updateDivider({
					id,
					changes: {
						fontSizeScale: nextFontSizeScale,
					},
				}),
			);
		},
		[
			defaultCurrentValue,
			defaultFontSizeScale,
			dispatch,
			fontSizeScaleParam,
			id,
			value,
		],
	);

	const onFontSizeChangeWithPersist = useCallback(
		(nextFontSizeScale: number) => {
			onFontSizeChange(nextFontSizeScale);
			if (!persistFontSizeScaleOnChange) {
				return;
			}
			persistFontSizeScale(nextFontSizeScale, {
				ignoreClearParamForFontSizeScale: true,
			});
		},
		[onFontSizeChange, persistFontSizeScale, persistFontSizeScaleOnChange],
	);

	const onBlur = useCallback(() => {
		const isValueEmpty = value === "";
		const isDefaultCurrentValueEmpty =
			isString(defaultCurrentValue) && value === defaultCurrentValue;

		const shouldClearParam = isValueEmpty || isDefaultCurrentValueEmpty;

		dispatch(
			setDividerParam({
				id,
				key: param,
				value: shouldClearParam ? null : value,
			}),
		);

		const nextFontSizeScale = fontSizeScaleRef.current;

		if (isNumber(nextFontSizeScale)) {
			persistFontSizeScale(nextFontSizeScale);
		}
	}, [
		id,
		dispatch,
		param,
		value,
		fontSizeScaleRef,
		defaultCurrentValue,
		persistFontSizeScale,
	]);

	return {
		value,
		translatedValue: defaultCurrentValue,
		onChange,
		onBlur,
		onFontSizeChange: onFontSizeChangeWithPersist,
	};
};
