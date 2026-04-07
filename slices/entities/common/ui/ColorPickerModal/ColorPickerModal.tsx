import type { ModalProps } from "@mui/material";
import { Button, Dialog, DialogActions, Stack } from "@mui/material";
import type { ColorResult } from "@uiw/color-convert";
import Chrome from "@uiw/react-color-chrome";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

type ColorPickerModalProps = Omit<ModalProps, "children"> & {
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
	...props
}: ColorPickerModalProps) {
	const { t } = useTranslation();
	const [color, setColor] = useState(value ?? defaultColor);

	const close = useCallback(() => {
		props.onCancel?.();
	}, [props.onCancel]);

	const select = useCallback(() => {
		props.onColorSelect?.(color);
	}, [props.onColorSelect, color]);

	const reset = useCallback(() => {
		props.onColorSelect?.(defaultValue);
	}, [defaultValue, props.onColorSelect]);

	const onColorChange = useCallback((color: ColorResult) => {
		setColor(color.hexa);
	}, []);

	const selectToAll = useCallback(() => {
		props.onSelectAll?.(color);
	}, [props.onSelectAll, color]);

	return (
		<Dialog {...props}>
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
				{props.onSelectAll && (
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
