import Box from "@mui/material/Box";
import type { IconButtonProps } from "@mui/material/IconButton";
import type { SxProps } from "@mui/material/styles";
import { useCallback, useState } from "react";
import { NotExportable } from "@/modules/render/shared/ui";
import { BoxInput, FitInput, type FitInputProps } from "@/shared/ui/control";

type DividerTextProps = FitInputProps & {
	inputSx?: SxProps;
	fit?: boolean;
	stroke?: boolean;
	outline?: boolean;
	strokeSx?: SxProps;
	outlineSx?: SxProps;
	clearProps?: IconButtonProps;
};

export function DividerText({
	fitTextOptions,
	inputSx,
	outlineSx: outlineSxProp,
	value,
	defaultValue,
	fit,
	stroke,
	strokeSx,
	outline,
	clearProps,
	...props
}: DividerTextProps) {
	const [isFocused, setIsFocused] = useState(false);
	const outlineSx = {
		position: "absolute",
		width: "100%",
		top: 0,
		left: 0,
		zIndex: -1,
		border: "1px solid black",
		...outlineSxProp,
	} as SxProps;

	const onFocus = useCallback(() => {
		setIsFocused(true);
	}, []);

	const onBlur = useCallback(() => {
		setIsFocused(false);
	}, []);

	const baseProps = {
		onFocus,
		onBlur,
		value,
		defaultValue,
		clearProps,
	};

	return (
		<Box position="relative" {...props}>
			{fit ? (
				<FitInput
					sx={inputSx}
					fitTextOptions={fitTextOptions}
					stroke={stroke}
					strokeSx={strokeSx}
					{...baseProps}
				/>
			) : (
				<BoxInput sx={inputSx} {...baseProps} />
			)}
			{outline && isFocused && (
				<NotExportable>
					<Box sx={outlineSx} displayPrint="none" />
				</NotExportable>
			)}
		</Box>
	);
}
