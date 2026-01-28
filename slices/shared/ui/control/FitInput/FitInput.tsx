import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { useCallback, useEffect, useState } from "react";
import useFitText from "use-fit-text";
import { BoxInput, type BoxInputProps } from "../BoxInput";

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
	onValueChange: onValueChangeProp,
	stroke,
	strokeSx: strokeSxProp,
	...props
}: FitInputProps) {
	const { ref, fontSize } = useFitText(fitTextOptions);
	const defaultValue = props.defaultValue ?? props.value ?? "";
	const [value, setValue] = useState(props.defaultValue ?? props.value ?? "");

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	useEffect(() => {
		const value = Number(fontSize.replace("%", ""));
		fitTextOptions?.onFontSizeChange?.(value);
	}, [fontSize, fitTextOptions?.onFontSizeChange]);

	const sx = {
		...props.sx,
		fontSize,
		width: "100%",
		height: "100%",
	} as SxProps;

	const onValueChange = useCallback(
		(value: string) => {
			onValueChangeProp?.(value);
			setValue(value);
		},
		[onValueChangeProp],
	);

	const strokeSx = {
		...strokeSxProp,
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		fontSize,
		lineHeight: 1,
		zIndex: -1,
	} as SxProps;

	return (
		<Box position="relative" width="100%" height="100%">
			<BoxInput {...props} sx={sx} ref={ref} onValueChange={onValueChange} />
			{stroke && <Box sx={strokeSx}>{value}</Box>}
		</Box>
	);
}
