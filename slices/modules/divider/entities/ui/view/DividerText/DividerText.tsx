import Box from "@mui/material/Box";
import type { IconButtonProps } from "@mui/material/IconButton";
import type { SxProps } from "@mui/material/styles";
import { BoxInput, FitInput, type FitInputProps } from "@/shared/ui/control";

type DividerTextProps = FitInputProps & {
	inputSx?: SxProps;
	fit?: boolean;
	stroke?: boolean;
	strokeSx?: SxProps;
	clearProps?: IconButtonProps;
};

export function DividerText({
	fitTextOptions,
	inputSx,
	value,
	defaultValue,
	fit,
	stroke,
	strokeSx,
	clearProps,
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
					clearProps={clearProps}
				/>
			) : (
				<BoxInput
					sx={inputSx}
					value={value}
					defaultValue={defaultValue}
					clearProps={clearProps}
				/>
			)}
		</Box>
	);
}
