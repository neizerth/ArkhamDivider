import { Box, type BoxProps, type SxProps, Tooltip } from "@mui/material";
import { useCallback } from "react";
import { usePrintUnit } from "@/modules/print/shared/lib";
import { useBoolean } from "@/shared/lib/hooks/common";
import { ColorPickerModal } from "../ColorPickerModal";
import * as S from "./ColorPicker.styles";

type ColorPickerProps = BoxProps & {
	onColorSelect: (color?: string) => void;
	onSelectAll?: (color?: string) => void;
	value?: string;
	defaultValue?: string;
};

const transparentIcon = "/images/assets/transparent.png";

export function ColorPicker({
	title,
	onColorSelect: onColorSelectProp,
	onSelectAll: onSelectAllProp,
	defaultValue,
	value,
	...props
}: ColorPickerProps) {
	const color = value ?? defaultValue;

	const getPrintSx = usePrintUnit();
	const sxProp = getPrintSx(S.getSx);
	const [open, setOpen] = useBoolean(false);

	const onColorSelect = useCallback(
		(color?: string) => {
			onColorSelectProp(color);
			setOpen.off();
		},
		[onColorSelectProp, setOpen.off],
	);

	const onSelectAllCallback = useCallback(
		(color?: string) => {
			onSelectAllProp?.(color);
			setOpen.off();
		},
		[onSelectAllProp, setOpen.off],
	);

	const onSelectAll = onSelectAllProp ? onSelectAllCallback : null;

	const isTransparent = !color || color === "transparent";
	const colorProps: SxProps = isTransparent
		? {
				backgroundImage: `url(${transparentIcon})`,
				backgroundSize: "250%",
			}
		: {
				backgroundColor: color,
			};

	const sx = {
		...sxProp,
		...colorProps,
	};

	return (
		<Box {...props} displayPrint="none">
			<Tooltip title={title} arrow placement="right">
				<Box sx={sx} bgcolor={color} onClick={setOpen.toggle} />
			</Tooltip>
			<ColorPickerModal
				open={open}
				value={color}
				onClose={setOpen.off}
				onCancel={setOpen.off}
				onColorSelect={onColorSelect}
				onSelectAll={onSelectAll}
			/>
		</Box>
	);
}
