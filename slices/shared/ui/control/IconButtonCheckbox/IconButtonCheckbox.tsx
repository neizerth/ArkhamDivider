import Box from "@mui/material/Box";
import type { IconButtonProps } from "@mui/material/IconButton";
import IconButton from "@mui/material/IconButton";
import type { ComponentProps } from "react";
import type { BaseIconProps } from "@/modules/core/icon/shared/model";
import { Icon } from "@/modules/core/icon/shared/ui";
import { absoluteFill } from "@/shared/config";
import { useBoolean } from "@/shared/lib/hooks/common";
import { getIconButtonCheckboxStyles } from "./IconButtonCheckbox.styles";

type IconButtonCheckboxProps = ComponentProps<"input"> & {
	icon: string;
	iconProps?: Omit<BaseIconProps, "icon">;
	size?: number;
	buttonProps?: IconButtonProps;
};

export function IconButtonCheckbox({
	icon,
	iconProps,
	size,
	buttonProps,
	...props
}: IconButtonCheckboxProps) {
	const [hover, setHover] = useBoolean(false);
	const checked = props.checked ?? props.defaultChecked ?? false;

	const sx = {
		...buttonProps?.sx,
		width: size,
		height: size,
		...getIconButtonCheckboxStyles({ checked, hover }),
	};

	return (
		<Box position="relative">
			<label
				style={{
					...absoluteFill,
					zIndex: 1,
					cursor: "pointer",
				}}
				onMouseEnter={setHover.on}
				onMouseLeave={setHover.off}
			>
				<input {...props} type="checkbox" checked={checked} hidden />
			</label>
			<IconButton sx={sx}>
				<Icon {...iconProps} icon={icon} />
			</IconButton>
		</Box>
	);
}
