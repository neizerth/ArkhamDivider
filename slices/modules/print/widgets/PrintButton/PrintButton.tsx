import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { ButtonGroupProps } from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import { theme } from "@/shared/config";
import { createClickAwayListener } from "@/shared/lib";
import * as C from "./PrintButton.components";

type PrintButtonProps = ButtonGroupProps;

const sx = {
	backgroundColor: theme.palette.primary.main,
	"&:hover": { backgroundColor: theme.palette.primary.dark },
};

export function PrintButton(props: PrintButtonProps) {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLDivElement>(null);

	const toggle = () => setOpen(!open);
	const close = createClickAwayListener({
		callback: () => setOpen(false),
		ignore: anchorRef.current,
	});

	return (
		<>
			<C.Group {...props} variant="contained" ref={anchorRef}>
				<Button onClick={print} sx={sx}>
					<Icon icon="printer" />
					&nbsp; {t`Print`} / &nbsp; <Icon icon="file-pdf" /> &nbsp; PDF
				</Button>
				<Button size="small" onClick={toggle} sx={sx}>
					<Icon icon="download" />
				</Button>
			</C.Group>
			<C.ContextMenu
				open={open}
				transition
				disablePortal
				anchorEl={anchorRef.current}
			>
				{({ TransitionProps }) => (
					<Grow {...TransitionProps}>
						<Paper>
							<ClickAwayListener onClickAway={close}>
								<MenuList>
									<Box
										textAlign="center"
										paddingBottom={1}
										borderBottom={1}
										borderColor="divider"
										color="text.secondary"
									>
										<Typography variant="body2">300 DPI</Typography>
									</Box>
									<MenuItem>
										<Icon icon="file-pdf" /> &nbsp; PDF <C.HQ>HQ</C.HQ>
									</MenuItem>
									<MenuItem>
										<Icon icon="file-zip" /> &nbsp; TIFF
									</MenuItem>
									<MenuItem>
										<Icon icon="file-zip" /> &nbsp; PNG
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</C.ContextMenu>
		</>
	);
}
