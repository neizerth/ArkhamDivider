import { Box, type BoxProps } from "@mui/material";
import { useCallback } from "react";
import { ColorPicker } from "@/entities/common/ui";
import {
	selectDividerById,
	setAllDividersParam,
	setDividerParam,
} from "@/modules/divider/shared/lib";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppDispatch, useAppSelector } from "@/shared/lib";

type DividerColorPickerProps = BoxProps & {
	dividerId: string;
	defaultColor?: string;
	param: string;
};

export function DividerColorPicker({
	dividerId,
	defaultColor,
	param,
	title,
	...props
}: DividerColorPickerProps) {
	const dispatch = useAppDispatch();
	const divider = useAppSelector((state) =>
		selectDividerById(state, dividerId),
	);

	const params = divider?.params as Record<string, unknown> | undefined;
	const value = params?.[param] as string | undefined;

	const onColorSelect = useCallback(
		(color?: string) => {
			dispatch(setDividerParam({ id: divider.id, key: param, value: color }));
		},
		[divider.id, param, dispatch],
	);

	const onSelectAll = useCallback(
		(color?: string) => {
			dispatch(setAllDividersParam({ key: param, value: color }));
		},
		[param, dispatch],
	);

	return (
		<NotExportable>
			<Box {...props} displayPrint="none">
				<ColorPicker
					width="100%"
					height="100%"
					position="relative"
					value={value}
					defaultValue={defaultColor}
					onColorSelect={onColorSelect}
					onSelectAll={onSelectAll}
					title={title}
				/>
			</Box>
		</NotExportable>
	);
}
