import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Alert, Snackbar } from "@mui/material";
import Box, { type BoxProps } from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { ArkhamDividerIcon } from "@/modules/core/icon/shared/model";
import { Icon } from "@/modules/core/icon/shared/ui";
import { copyToClipboard, createClickAwayListener } from "@/shared/lib";
import { Row } from "@/shared/ui";
import * as C from "./IconSelectionCopyMenu.components";
import { useCopyFormats } from "./useCopyFormats";

type IconSelectionCopyMenuProps = BoxProps & {
	icon: ArkhamDividerIcon;
};

const chipSx = {
	height: 26,
	fontFamily: "ui-monospace, monospace",
	fontSize: "0.75rem",
	"& .MuiChip-label": { px: 1 },
	backgroundColor: "primary.main",
	color: "primary.contrastText",
} as const;

export function IconSelectionCopyMenu({
	icon,
	...boxProps
}: IconSelectionCopyMenuProps) {
	const { t } = useTranslation();
	const anchorRef = useRef<HTMLButtonElement>(null);
	const [open, setOpen] = useState(false);
	const [copied, setCopied] = useState(false);

	const toggle = useCallback(() => setOpen((v) => !v), []);
	const close = useCallback(() => setOpen(false), []);

	const onClickAway = createClickAwayListener({
		callback: close,
		ignore: anchorRef.current,
	});

	const copy = useCallback(
		(value: string) => {
			copyToClipboard(value);
			setCopied(true);
			close();
		},
		[close],
	);

	const rows = useCopyFormats(icon);

	return (
		<Box {...boxProps}>
			<Button
				ref={anchorRef}
				variant="contained"
				color="primary"
				onClick={toggle}
				aria-expanded={open}
				aria-haspopup="menu"
				startIcon={<Icon icon="icomoonfree-copy" />}
				endIcon={<ExpandMoreIcon />}
			>
				{t("icon.copy")}
			</Button>
			<C.ContextMenu
				open={open}
				transition
				disablePortal
				anchorEl={anchorRef.current}
				placement="bottom-end"
			>
				{({ TransitionProps }) => (
					<Grow {...TransitionProps}>
						<Paper>
							<ClickAwayListener onClickAway={onClickAway}>
								<MenuList sx={{ py: 0, px: 0, boxShadow: 3 }}>
									{rows.map((row, index) => (
										<MenuItem
											key={row.key}
											onClick={() => copy(row.value)}
											divider={index < rows.length - 1}
											sx={{
												py: 1.25,
												alignItems: "center",
												boxSizing: "border-box",
											}}
										>
											<Row
												alignItems="center"
												justifyContent="space-between"
												gap={2}
												width="100%"
											>
												<Typography
													variant="body2"
													color="text"
													fontWeight={500}
												>
													{row.label}
												</Typography>
												{row.key === "symbol" ? (
													<Box mr={1}>
														<Icon icon={icon.icon} />
													</Box>
												) : (
													<Chip size="small" label={row.value} sx={chipSx} />
												)}
											</Row>
										</MenuItem>
									))}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</C.ContextMenu>
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
