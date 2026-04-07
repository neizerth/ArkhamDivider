import Box from "@mui/material/Box";
import type { ButtonProps } from "@mui/material/Button";
import Button from "@mui/material/Button";
import type { SxProps } from "@mui/material/styles";
import type { ComponentProps } from "react";
import { absoluteFill } from "@/shared/config";
import { useBoolean } from "@/shared/lib/hooks/common";
import { getCheckboxButtonStyles } from "./CheckboxButton.styles";

type CheckboxButtonProps = ComponentProps<"input"> & {
	sx?: SxProps;
	buttonProps?: ButtonProps;
};

export function CheckboxButton({
	buttonProps,
	children,
	sx,
	...props
}: CheckboxButtonProps) {
	const [hover, setHover] = useBoolean(false);

	const checked = props.checked ?? props.defaultChecked ?? false;

	const buttonSx = {
		...buttonProps?.sx,
		...getCheckboxButtonStyles({ checked, hover }),
		color: checked ? "default" : "gray",
		borderColor: checked ? "transparent" : "lightgray",
	};

	return (
		<Box position="relative" sx={sx}>
			<label
				style={{
					...absoluteFill,
					zIndex: 1,
					cursor: "pointer",
				}}
				onMouseEnter={setHover.on}
				onMouseLeave={setHover.off}
			>
				<input {...props} type="checkbox" hidden />
			</label>
			<Button
				{...buttonProps}
				sx={buttonSx}
				variant={checked ? "contained" : "outlined"}
			>
				{children}
			</Button>
		</Box>
	);
}
