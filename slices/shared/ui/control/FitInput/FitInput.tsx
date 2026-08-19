import type { SxProps } from "@mui/material/styles";
import { useCallback, useEffect, useRef, useState } from "react";
import useFitText from "use-fit-text";
import { BoxInput, type BoxInputProps } from "../BoxInput";
import { useRemeasureOnFontsLoaded } from "./useRemeasureOnFontsLoaded";

type UseFitTextOptions = Parameters<typeof useFitText>[0] & {
	onFontSizeChange?: (fontSize: number) => void;
};

export type FitInputProps = BoxInputProps & {
	fitTextOptions?: UseFitTextOptions;
	stroke?: boolean;
	strokeSx?: SxProps;
};

export function FitInput({
	fitTextOptions,
	onFocus: onFocusProp,
	onBlur: onBlurProp,
	...props
}: FitInputProps) {
	const { ref, fontSize } = useFitText(fitTextOptions);
	useRemeasureOnFontsLoaded(ref as React.MutableRefObject<HTMLElement | null>);
	const [isFocused, setIsFocused] = useState(false);
	const frozenFontSizeRef = useRef(fontSize);

	useEffect(() => {
		if (!isFocused) {
			frozenFontSizeRef.current = fontSize;
		}
	}, [fontSize, isFocused]);

	useEffect(() => {
		const value = Number(fontSize.replace("%", ""));
		fitTextOptions?.onFontSizeChange?.(value);
	}, [fontSize, fitTextOptions?.onFontSizeChange]);

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

	const appliedFontSize = isFocused ? frozenFontSizeRef.current : fontSize;

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
