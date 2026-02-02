import Box from "@mui/material/Box";
import type { IconButtonProps } from "@mui/material/IconButton";
import type { SxProps } from "@mui/material/styles";
import { type FocusEventHandler, useCallback, useState } from "react";
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
	sx,
	onBlur: onBlurProp,
	onFocus: onFocusProp,
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

	const onFocus: FocusEventHandler<HTMLDivElement> = useCallback(
		(e) => {
			onFocusProp?.(e);
			setIsFocused(true);
		},
		[onFocusProp],
	);

	const onBlur: FocusEventHandler<HTMLDivElement> = useCallback(
		(e) => {
			onBlurProp?.(e);
			setIsFocused(false);
		},
		[onBlurProp],
	);

	const hidden = hide && dividerId === renderId;

	const baseProps = {
		onFocus,
		onBlur,
		value,
		defaultValue,
		clearProps,
		stroke: Boolean(stroke || strokeSx),
		strokeSx,
		hidden,
		clearable: !renderId,
		...props,
	};

	const fitText = Boolean(fit || fitTextOptions || inputSx);

	return (
		<Box position="relative" sx={sx}>
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
