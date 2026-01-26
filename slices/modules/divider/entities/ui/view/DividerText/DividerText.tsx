import Box from "@mui/material/Box";
import type { SxProps } from "@mui/material/styles";
import { BoxInput, FitInput, type FitInputProps } from "@/shared/ui/control";

type DividerTextProps = FitInputProps & {
	inputSx?: SxProps;
	fit?: boolean;
	stroke?: boolean;
	strokeSx?: SxProps;
};

export function DividerText({
	fitTextOptions,
	inputSx,
	value,
	defaultValue,
	fit,
	stroke,
	strokeSx,
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
					stroke={stroke}
					strokeSx={strokeSx}
				/>
			) : (
				<BoxInput sx={inputSx} value={value} defaultValue={defaultValue} />
			)}
		</Box>
	);
}
