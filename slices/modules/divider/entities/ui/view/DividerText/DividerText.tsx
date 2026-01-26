import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import type useFitText from "use-fit-text";
import { BoxInput, type BoxInputProps, FitInput } from "@/shared/ui/control";

type UseFitTextOptions = Parameters<typeof useFitText>[0];

type DividerTextProps = BoxInputProps & {
	fitTextOptions?: UseFitTextOptions;
	inputSx?: SxProps;
	fit?: boolean;
};

export function DividerText({
	fitTextOptions,
	inputSx,
	value,
	defaultValue,
	fit = false,
	...props
}: DividerTextProps) {
	return (
		<Box {...props}>
			{fit ? (
				<FitInput
					sx={inputSx}
					fitTextOptions={fitTextOptions}
					value={value}
					defaultValue={defaultValue}
				/>
			) : (
				<BoxInput sx={inputSx} value={value} defaultValue={defaultValue} />
			)}
		</Box>
	);
}
