import Box from "@mui/material/Box";
import type { IconButtonProps } from "@mui/material/IconButton";
import type { SxProps } from "@mui/material/styles";
import { useCallback, useState } from "react";
import {
	selectDividerRenderId,
	selectHideTextNodes,
} from "@/modules/render/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppSelector } from "@/shared/lib";
import { BoxInput, FitInput, type FitInputProps } from "@/shared/ui/control";

type DividerTextProps = FitInputProps & {
	dividerId: string;
	inputSx?: SxProps;
	fit?: boolean;
	stroke?: boolean;
	outline?: boolean;
	strokeSx?: SxProps;
	outlineSx?: SxProps;
	clearProps?: IconButtonProps;
};

export function DividerText({
	dividerId,
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
	const renderId = useAppSelector(selectDividerRenderId);
	const hide = useAppSelector(selectHideTextNodes);

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
		stroke: Boolean(stroke || strokeSx),
		strokeSx,
	};

	const fitText = Boolean(fit || fitTextOptions || inputSx);

	if (hide && dividerId === renderId) {
		return null;
	}

	return (
		<Box position="relative" {...props}>
			{fitText ? (
				<FitInput sx={inputSx} fitTextOptions={fitTextOptions} {...baseProps} />
			) : (
				<BoxInput sx={inputSx} {...baseProps} />
			)}
			{(outline || outlineSx) && isFocused && (
				<NotExportable>
					<Box sx={outlineSx} displayPrint="none" />
				</NotExportable>
			)}
		</Box>
	);
}
