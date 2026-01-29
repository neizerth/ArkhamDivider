import type { SxProps } from "@mui/material/styles";
import { useEffect } from "react";
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

export function FitInput({ fitTextOptions, ...props }: FitInputProps) {
	const { ref, fontSize } = useFitText(fitTextOptions);

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

	return <BoxInput {...props} sx={sx} ref={ref} />;
}
