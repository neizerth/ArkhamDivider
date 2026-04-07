import { Button, type ButtonProps } from "@mui/material";
import type { ComponentProps } from "react";
import { VisuallyHiddenInput } from "../VisuallyHiddenInput";

type InputProps = ComponentProps<"input">;

type UploadProps = Omit<ButtonProps, "onChange"> &
	Pick<InputProps, "accept" | "multiple" | "onChange">;

export function Upload({
	multiple,
	accept,
	onChange,
	children,
	...props
}: UploadProps) {
	return (
		<Button component="label" {...props}>
			{children}
			<VisuallyHiddenInput
				type="file"
				multiple={multiple}
				accept={accept}
				onChange={onChange}
			/>
		</Button>
	);
}
