import type { SxProps } from "@mui/material/styles";
import { useCallback, useEffect, useRef, useState } from "react";
import { BoxInput, type BoxInputProps } from "../BoxInput";
import { type UseFitFontSizeOptions, useFitFontSize } from "./useFitFontSize";

type UseFitTextOptions = UseFitFontSizeOptions & {
	onFontSizeChange?: (fontSize: number) => void;
};

export type FitInputProps = BoxInputProps & {
	fitTextOptions?: UseFitTextOptions;
	stroke?: boolean;
	strokeSx?: SxProps;
};

const toPercent = (fontSize: string) => Number(fontSize.replace("%", ""));

export function FitInput({
	fitTextOptions,
	onFocus: onFocusProp,
	onBlur: onBlurProp,
	...props
}: FitInputProps) {
	const { ref, fontSize } = useFitFontSize<HTMLDivElement>(fitTextOptions);
	const [isFocused, setIsFocused] = useState(false);
	const frozenFontSizeRef = useRef(fontSize);

	useEffect(() => {
		if (!isFocused) {
			frozenFontSizeRef.current = fontSize;
		}
	}, [fontSize, isFocused]);

	const onFontSizeChangeRef = useRef(fitTextOptions?.onFontSizeChange);
	onFontSizeChangeRef.current = fitTextOptions?.onFontSizeChange;

	const reportedFontSizeRef = useRef<number | null>(null);

	useEffect(() => {
		// Only the measured size matters here. Keying the effect on the callback
		// identity too re-reported the same size after every store update the
		// callback itself caused, which is one half of a render/dispatch loop.
		const value = toPercent(fontSize);

		if (reportedFontSizeRef.current === value) {
			return;
		}

		reportedFontSizeRef.current = value;
		onFontSizeChangeRef.current?.(value);
	}, [fontSize]);

	const onFocus = useCallback<NonNullable<BoxInputProps["onFocus"]>>(
		(event) => {
			frozenFontSizeRef.current = fontSize;
			setIsFocused(true);
			onFocusProp?.(event);
		},
		[fontSize, onFocusProp],
	);

	const onBlur = useCallback<NonNullable<BoxInputProps["onBlur"]>>(
		(event) => {
			setIsFocused(false);
			onBlurProp?.(event);
		},
		[onBlurProp],
	);

	// Freezing the size outright kept the caret steady but let the text grow past
	// its slot and wrap while typing — a line break the single-line export never
	// produces. Shrinking is allowed during input; only growing waits for blur.
	const appliedFontSize = isFocused
		? `${Math.min(toPercent(frozenFontSizeRef.current), toPercent(fontSize))}%`
		: fontSize;

	const sx = {
		...props.sx,
		fontSize: appliedFontSize,
		width: "100%",
		height: "100%",
	} as SxProps;

	const strokeSx = {
		...props.strokeSx,
		fontSize: appliedFontSize,
	} as SxProps;

	return (
		<BoxInput
			{...props}
			sx={sx}
			strokeSx={strokeSx}
			ref={ref}
			onFocus={onFocus}
			onBlur={onBlur}
		/>
	);
}
