import ClearIcon from "@mui/icons-material/Clear";
import Box, { type BoxProps } from "@mui/material/Box";
import IconButton, { type IconButtonProps } from "@mui/material/IconButton";
import type { SxProps } from "@mui/material/styles";
import { useCallback, useEffect, useRef, useState } from "react";
import { delay, sanitizeHTML } from "@/shared/util";

export type BoxInputProps = BoxProps & {
	containerSx?: SxProps;
	clearProps?: IconButtonProps;
	onValueChange?: (value: string) => void;
	defaultValue?: string;
	value?: string;
};

export function BoxInput({
	defaultValue,
	value,
	onValueChange: onValueChangeProp,
	onChange: onChangeProp,
	containerSx: containerSxProp,
	clearProps,
	...props
}: BoxInputProps) {
	const defaultRef = useRef<HTMLDivElement>(null);
	const ref = (props.ref as React.RefObject<HTMLDivElement>) ?? defaultRef;
	const [isFocused, setIsFocused] = useState(false);

	const defaultContent = value ?? defaultValue ?? "";
	const internalValueRef = useRef(defaultValue ?? "");

	const setValue = useCallback(
		(value: string) => {
			if (!ref.current) {
				return;
			}
			ref.current.textContent = value;
		},
		[ref],
	);

	useEffect(() => {
		setValue(defaultContent);
	}, [defaultContent, setValue]);

	useEffect(() => {
		internalValueRef.current = defaultValue ?? "";
	}, [defaultValue]);

	const onClear = useCallback(() => {
		setValue(internalValueRef.current);
		onValueChangeProp?.(internalValueRef.current);
	}, [onValueChangeProp, setValue]);

	const onChange = useCallback(
		(event: React.FormEvent<HTMLDivElement>) => {
			const value = sanitizeHTML(event.currentTarget.innerText);
			onValueChangeProp?.(value);
			onChangeProp?.(event);
		},
		[onChangeProp, onValueChangeProp],
	);

	const onFocus = useCallback(
		(event: React.FocusEvent<HTMLDivElement>) => {
			setIsFocused(true);
			props.onFocus?.(event);
		},
		[props.onFocus],
	);

	const onBlur = useCallback(
		(event: React.FocusEvent<HTMLDivElement>) => {
			// delay is used to prevent the icon button from being hidden immediately
			delay(300).then(() => setIsFocused(false));
			props.onBlur?.(event);
		},
		[props.onBlur],
	);

	const containerSx = {
		width: "100%",
		height: "100%",
		position: "relative",
		...containerSxProp,
		...props.sx,
	} as SxProps;

	const clearSx = {
		position: "absolute",
		left: "50%",
		transform: "translateX(-50%)",
		background: "black",
		color: "white",
		top: "100%",
		zIndex: 1,
		...clearProps?.sx,
	} as SxProps;

	return (
		<Box sx={containerSx}>
			<Box
				contentEditable
				spellCheck={false}
				{...props}
				onInput={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				ref={ref}
			/>
			{isFocused && defaultValue && (
				<IconButton {...clearProps} sx={clearSx} onClick={onClear}>
					<ClearIcon />
				</IconButton>
			)}
		</Box>
	);
}
