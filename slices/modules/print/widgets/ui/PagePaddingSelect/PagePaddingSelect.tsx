import PaddingOutlinedIcon from "@mui/icons-material/PaddingOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { isUniformBoxPosition } from "@/shared/util";
import { selectPagePadding, setPagePadding } from "../../../shared/lib";
import * as S from "./PagePaddingSelect.styles";

type PagePaddingSelectProps = {
	onOpen?: () => void;
	onClose?: () => void;
};

const ALL_SIDES_OPTIONS = [5, 10, 20] as const;

type FormValues = {
	top: number;
	right: number;
	bottom: number;
	left: number;
};

function normalizeNumberInput(value: unknown) {
	if (value === "" || value == null) {
		return 0;
	}
	const num = Number(value);
	return Number.isFinite(num) ? num : 0;
}

const SIDE_FIELDS = [
	{ name: "top" as const, labelKey: "Top" as const, gridColumn: 2, gridRow: 1 },
	{
		name: "left" as const,
		labelKey: "Left" as const,
		gridColumn: 1,
		gridRow: 2,
	},
	{
		name: "right" as const,
		labelKey: "Right" as const,
		gridColumn: 3,
		gridRow: 2,
	},
	{
		name: "bottom" as const,
		labelKey: "Bottom" as const,
		gridColumn: 2,
		gridRow: 3,
	},
] as const;

export function PagePaddingSelect({ onOpen, onClose }: PagePaddingSelectProps) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const paddingAllId = useId();
	const [open, setOpen] = useState(false);
	const pagePadding = useAppSelector(selectPagePadding);

	const { register, handleSubmit, reset, setValue } = useForm<FormValues>({
		defaultValues: {
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		},
	});

	type AllSidesMode = "custom" | `${(typeof ALL_SIDES_OPTIONS)[number]}`;

	const [allSidesMode, setAllSidesMode] = useState<AllSidesMode>("custom");

	const close = () => {
		setOpen(false);
		onClose?.();
	};

	const openDialog = () => {
		setOpen(true);
		onOpen?.();
	};

	const applyAll = (value: number) => {
		setValue("top", value);
		setValue("right", value);
		setValue("bottom", value);
		setValue("left", value);
	};

	const onChangeAll = (event: SelectChangeEvent<AllSidesMode>) => {
		const { value } = event.target;
		if (!value) {
			return;
		}
		if (value === "custom") {
			setAllSidesMode("custom");
			return;
		}

		const num = Number(value);
		if (Number.isFinite(num)) {
			setAllSidesMode(`${num}` as AllSidesMode);
			applyAll(num);
		}
	};

	useEffect(() => {
		if (!open) {
			return;
		}
		const isUniform = isUniformBoxPosition(pagePadding);
		const preset = isUniform
			? (ALL_SIDES_OPTIONS.find((v) => v === pagePadding.top) ?? null)
			: null;

		setAllSidesMode((preset == null ? "custom" : `${preset}`) as AllSidesMode);
		reset(pagePadding);
	}, [open, pagePadding, reset]);

	const onSubmit = (values: FormValues) => {
		if (allSidesMode !== "custom") {
			const preset = Number(allSidesMode);
			dispatch(
				setPagePadding({
					top: preset,
					right: preset,
					bottom: preset,
					left: preset,
				}),
			);
			close();
			return;
		}

		dispatch(
			setPagePadding({
				top: normalizeNumberInput(values.top),
				right: normalizeNumberInput(values.right),
				bottom: normalizeNumberInput(values.bottom),
				left: normalizeNumberInput(values.left),
			}),
		);
		close();
	};

	const mmEndAdornment = (
		<InputAdornment position="end">
			<Typography component="span" variant="body2" color="text.secondary">
				{t`mm`}
			</Typography>
		</InputAdornment>
	);

	const mmInputProps = {
		endAdornment: mmEndAdornment,
	} as const;

	const preview = (() => {
		if (isUniformBoxPosition(pagePadding)) {
			const value = pagePadding.top;
			const label = value === 0 ? t`None` : `${value} ${t`mm`}`;
			return (
				<Typography
					component="div"
					variant="caption"
					color="text.secondary"
					sx={S.previewUniformGridSx}
				>
					{label}
				</Typography>
			);
		}
		return (
			<Box sx={S.previewGridSx}>
				<Box sx={S.getPreviewNumericCellSx(2, 1)}>{pagePadding.top}</Box>
				<Box sx={S.getPreviewNumericCellSx(1, 2)}>{pagePadding.left}</Box>
				<Box sx={S.getPreviewSpacerCellSx(2, 2)} />
				<Box sx={S.getPreviewNumericCellSx(3, 2)}>{pagePadding.right}</Box>
				<Box sx={S.getPreviewNumericCellSx(2, 3)}>{pagePadding.bottom}</Box>
			</Box>
		);
	})();

	return (
		<>
			<ListItem disablePadding sx={S.pagePaddingListItemSx}>
				<ListItemButton onClick={openDialog} sx={S.listItemButtonSx}>
					<ListItemIcon>
						<PaddingOutlinedIcon />
					</ListItemIcon>
					<ListItemText sx={S.listItemTextSx} primary={t(`Page padding`)} />
					{preview}
				</ListItemButton>
			</ListItem>
			<Dialog open={open} onClose={close} fullWidth maxWidth="xs">
				<DialogTitle>{t(`Page padding`)}</DialogTitle>
				<DialogContent sx={S.dialogContentSx}>
					<FormControl fullWidth sx={S.formControlSx}>
						<InputLabel id={paddingAllId}>{t(`All sides`)}</InputLabel>
						<Select<AllSidesMode>
							labelId={paddingAllId}
							label={t(`All sides`)}
							value={allSidesMode}
							onChange={onChangeAll}
						>
							<MenuItem value="custom">{t(`Custom`)}</MenuItem>
							<MenuItem value="0">{t(`None`)}</MenuItem>
							{ALL_SIDES_OPTIONS.map((v) => (
								<MenuItem key={v} value={`${v}`}>
									{v} {t`mm`}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Box component="fieldset" sx={S.pageFieldsetSx}>
						<Box component="legend" sx={S.pageLegendSx}>
							{t(`Page`)}
						</Box>
						<Box sx={S.paddingGridSx}>
							{SIDE_FIELDS.map(({ name, labelKey, gridColumn, gridRow }) => (
								<Box
									key={name}
									sx={S.getPaddingSideFieldCellSx(gridColumn, gridRow)}
								>
									<TextField
										label={t(labelKey)}
										{...register(name, {
											setValueAs: normalizeNumberInput,
										})}
										type="number"
										fullWidth
										inputProps={{ inputMode: "numeric" }}
										InputProps={mmInputProps}
										disabled={allSidesMode !== "custom"}
									/>
								</Box>
							))}

							<Box sx={S.paddingContentPlaceholderSx}>{t(`Content`)}</Box>
						</Box>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={close} color="secondary">
						{t(`Cancel`)}
					</Button>
					<Button variant="contained" onClick={handleSubmit(onSubmit)}>
						{t(`Ok`)}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
