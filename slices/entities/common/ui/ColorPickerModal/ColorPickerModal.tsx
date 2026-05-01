import { Button, Dialog, DialogActions, Stack } from "@mui/material";
import type { DialogProps } from "@mui/material/Dialog";
import type { ColorResult } from "@uiw/color-convert";
import Chrome from "@uiw/react-color-chrome";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

type ColorPickerModalProps = Omit<DialogProps, "children"> & {
	value?: string;
	defaultValue?: string;
	onSelectAll?: ((color?: string) => void) | null;
	onColorSelect?: (color?: string) => void;
	onCancel?: () => void;
};

const defaultColor = "#fff";

export function ColorPickerModal({
	value,
	defaultValue,
	onSelectAll,
	onColorSelect,
	onCancel,
	...dialogProps
}: ColorPickerModalProps) {
	const { t } = useTranslation();
	const [color, setColor] = useState(value ?? defaultColor);

	const close = useCallback(() => {
		onCancel?.();
	}, [onCancel]);

	const select = useCallback(() => {
		onColorSelect?.(color);
	}, [onColorSelect, color]);

	const reset = useCallback(() => {
		onColorSelect?.(defaultValue);
	}, [defaultValue, onColorSelect]);

	const onColorChange = useCallback((color: ColorResult) => {
		setColor(color.hexa);
	}, []);

	const selectToAll = useCallback(() => {
		onSelectAll?.(color);
	}, [onSelectAll, color]);

	return (
		<Dialog {...dialogProps}>
			<Stack
				p={2}
				justifyContent="center"
				alignItems="center"
				sx={{ zoom: { xs: 1, sm: 1.5 } }}
			>
				<Chrome color={color} onChange={onColorChange} />
			</Stack>
			<DialogActions
				sx={{
					flexShrink: 0,
					flexWrap: "wrap",
					gap: {
						xs: `0.5em 0em`,
					},
				}}
			>
				<Button
					variant="contained"
					color="secondary"
					onClick={close}
					sx={{
						marginLeft: { xs: 1, md: 0 },
					}}
				>{t`Cancel`}</Button>

				<Button
					variant="contained"
					color="secondary"
					onClick={reset}
					sx={{ order: { xs: -1, sm: 0 } }}
				>
					{t`Default`}
				</Button>
				{onSelectAll && (
					<Button variant="contained" color="primary" onClick={selectToAll}>
						{t`Set to all`}
					</Button>
				)}
				<Button variant="contained" color="primary" onClick={select}>
					{t`Ok`}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
