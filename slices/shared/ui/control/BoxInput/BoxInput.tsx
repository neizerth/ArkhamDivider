import Box, { type BoxProps } from "@mui/material/Box";
import { useCallback, useEffect, useRef } from "react";
import { sanitizeHTML } from "@/shared/util";

export type BoxInputProps = BoxProps & {
	onValueChange?: (value: string) => void;
	defaultValue?: string;
	value?: string;
};

export function BoxInput({
	defaultValue,
	value,
	onValueChange: onValueChangeProp,
	onChange: onChangeProp,
	...props
}: BoxInputProps) {
	const defaultRef = useRef<HTMLDivElement>(null);
	const ref = (props.ref as React.RefObject<HTMLDivElement>) ?? defaultRef;

	const defaultContent = defaultValue ?? value ?? "";

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

	const onChange = useCallback(
		(event: React.FormEvent<HTMLDivElement>) => {
			const value = sanitizeHTML(event.currentTarget.innerText);
			onValueChangeProp?.(value);
			onChangeProp?.(event);
		},
		[onChangeProp, onValueChangeProp],
	);

	return (
		<Box
			contentEditable
			spellCheck={false}
			onInput={onChange}
			{...props}
			ref={ref}
		/>
	);
}
