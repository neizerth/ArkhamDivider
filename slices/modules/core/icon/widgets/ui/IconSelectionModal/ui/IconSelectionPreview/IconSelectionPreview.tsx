import {
	Alert,
	Box,
	type BoxProps,
	Button,
	ButtonGroup,
	Chip,
	Snackbar,
	Stack,
} from "@mui/material";
import { compact, isString } from "ramda-adjunct";
import { useCallback, useContext, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { downloadIcon } from "@/modules/core/icon/entities/lib";
import {
	createMediaIcon,
	getIconChar,
	getIconId,
} from "@/modules/core/icon/shared/lib";
import { selectIconById } from "@/modules/core/icon/shared/lib/store/selectors/selectIconById";
import { Icon, IconSelectionContext } from "@/modules/core/icon/shared/ui";
import { copyToClipboard, useAppSelector } from "@/shared/lib";
import { Row, Upload } from "@/shared/ui";
import { IconSelectionCopyMenu } from "../IconSelectionCopyMenu";
import * as C from "./IconSelectionPreview.components";

type IconSelectionPreviewProps = BoxProps;

export function IconSelectionPreview(props: IconSelectionPreviewProps) {
	const { selectedIcon, defaultIcon, setSelectedIcon, mode } =
		useContext(IconSelectionContext);

	const [copied, setCopied] = useState(false);

	const iconInfo = useAppSelector((state) =>
		selectIconById(state, selectedIcon),
	);

	const { t } = useTranslation();

	const downloadSvg = useCallback(() => {
		if (!selectedIcon || !isString(selectedIcon)) {
			return;
		}
		downloadIcon(selectedIcon);
	}, [selectedIcon]);

	const handleUpload = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (!file) {
				return;
			}
			const icon = await createMediaIcon({ file, defaultIcon });
			if (icon) {
				setSelectedIcon(icon);
			}
			event.target.value = "";
		},
		[setSelectedIcon, defaultIcon],
	);

	const iconId = getIconId(selectedIcon) ?? "upload";
	const isPreview = mode === "preview";

	const toolbarButtons = useMemo(
		() =>
			compact([
				!isPreview && (
					<Upload
						key={iconId}
						accept="image/*"
						onChange={handleUpload}
						sx={{
							paddingInline: 2,
						}}
					>
						<Row alignItems="center" gap={1}>
							<Icon icon="upload" />
							{t("Upload")}
						</Row>
					</Upload>
				),
				isString(selectedIcon) && (
					<Button key="download" onClick={downloadSvg}>
						<Row alignItems="center" gap={1}>
							<Icon icon="download" /> SVG
						</Row>
					</Button>
				),
			]),
		[downloadSvg, handleUpload, iconId, isPreview, selectedIcon, t],
	);

	const handleIconClick = useCallback(() => {
		if (!iconInfo) {
			return;
		}
		const char = getIconChar(iconInfo.code);
		copyToClipboard(char);
		setCopied(true);
	}, [iconInfo]);

	const copyName = useCallback(() => {
		if (!iconInfo) {
			return;
		}
		copyToClipboard(iconInfo.icon);
		setCopied(true);
	}, [iconInfo]);

	return (
		<Box {...props}>
			<Stack gap={1}>
				<Stack justifyContent="center" alignItems="center">
					<C.Icon>
						{selectedIcon && (
							<Icon
								icon={selectedIcon}
								onClick={handleIconClick}
								sx={{ cursor: iconInfo ? "pointer" : "default" }}
							/>
						)}
					</C.Icon>
				</Stack>
				{isString(selectedIcon) && isPreview && (
					<Stack alignItems="center">
						<Chip
							label={selectedIcon}
							onClick={copyName}
							sx={{ cursor: "pointer" }}
						/>
					</Stack>
				)}
				<Stack alignItems="center">
					<Row alignItems="center" justifyContent="center" gap={1}>
						{toolbarButtons.length > 0 && (
							<ButtonGroup variant="contained" color="primary">
								{toolbarButtons}
							</ButtonGroup>
						)}
						{iconInfo && isPreview && (
							<IconSelectionCopyMenu key="copy" icon={iconInfo} />
						)}
					</Row>
				</Stack>
			</Stack>
			<Snackbar
				open={copied}
				autoHideDuration={3000}
				onClose={() => setCopied(false)}
			>
				<Alert severity="success" onClose={() => setCopied(false)}>
					{t("copy.success")}
				</Alert>
			</Snackbar>
		</Box>
	);
}
