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
import { selectPageMargin, setPageMargin } from "../../../shared/lib";
import * as S from "./PageMarginSelect.styles";

type PageMarginSelectProps = {
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

type SideField = {
	name: keyof FormValues;
	labelKey: string;
	gridColumn: number;
	gridRow: number;
};

function normalizeNumberInput(value: unknown) {
	if (value === "" || value == null) {
		return 0;
	}
	const num = Number(value);
	return Number.isFinite(num) ? num : 0;
}

const SIDE_FIELDS: SideField[] = [
	{ name: "top", labelKey: "Top", gridColumn: 2, gridRow: 1 },
	{
		name: "left",
		labelKey: "Left",
		gridColumn: 1,
		gridRow: 2,
	},
	{
		name: "right",
		labelKey: "Right",
		gridColumn: 3,
		gridRow: 2,
	},
	{
		name: "bottom",
		labelKey: "Bottom",
		gridColumn: 2,
		gridRow: 3,
	},
];

export function PageMarginSelect({ onOpen, onClose }: PageMarginSelectProps) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const marginAllId = useId();
	const [open, setOpen] = useState(false);
	const pageMargin = useAppSelector(selectPageMargin);

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
		const isUniform = isUniformBoxPosition(pageMargin);
		const preset = isUniform
			? (ALL_SIDES_OPTIONS.find((v) => v === pageMargin.top) ?? null)
			: null;

		setAllSidesMode((preset == null ? "custom" : `${preset}`) as AllSidesMode);
		reset(pageMargin);
	}, [open, pageMargin, reset]);

	const onSubmit = (values: FormValues) => {
		if (allSidesMode !== "custom") {
			const preset = Number(allSidesMode);
			dispatch(
				setPageMargin({
					top: preset,
					right: preset,
					bottom: preset,
					left: preset,
				}),
			);
			close();
			return;
		}

		dispatch(setPageMargin(values));
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
		if (isUniformBoxPosition(pageMargin)) {
			const value = pageMargin.top;
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
				<Box sx={S.getPreviewNumericCellSx(2, 1)}>{pageMargin.top}</Box>
				<Box sx={S.getPreviewNumericCellSx(1, 2)}>{pageMargin.left}</Box>
				<Box sx={S.getPreviewSpacerCellSx(2, 2)} />
				<Box sx={S.getPreviewNumericCellSx(3, 2)}>{pageMargin.right}</Box>
				<Box sx={S.getPreviewNumericCellSx(2, 3)}>{pageMargin.bottom}</Box>
			</Box>
		);
	})();

	return (
		<>
			<ListItem disablePadding sx={S.pageMarginListItemSx}>
				<ListItemButton onClick={openDialog} sx={S.listItemButtonSx}>
					<ListItemIcon>
						<PaddingOutlinedIcon />
					</ListItemIcon>
					<ListItemText sx={S.listItemTextSx} primary={t(`Page margin`)} />
					{preview}
				</ListItemButton>
			</ListItem>
			<Dialog open={open} onClose={close} fullWidth maxWidth="xs">
				<DialogTitle>{t(`Page margin`)}</DialogTitle>
				<DialogContent sx={S.dialogContentSx}>
					<FormControl fullWidth sx={S.formControlSx}>
						<InputLabel id={marginAllId}>{t(`All sides`)}</InputLabel>
						<Select<AllSidesMode>
							labelId={marginAllId}
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
						<Box sx={S.marginGridSx}>
							{SIDE_FIELDS.map(({ name, labelKey, gridColumn, gridRow }) => (
								<Box
									key={name}
									sx={S.getMarginSideFieldCellSx(gridColumn, gridRow)}
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

							<Box sx={S.marginContentPlaceholderSx}>{t(`Content`)}</Box>
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
