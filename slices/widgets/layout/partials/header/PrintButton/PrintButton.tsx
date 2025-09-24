import Button from "@mui/material/Button";
import type { ButtonGroupProps } from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import { useRef, useState } from "react";
import { Icon } from "@/modules/core/icon/shared/ui";
import * as C from "./PrintButton.components";

type PrintButtonProps = ButtonGroupProps;

export function PrintButton(props: PrintButtonProps) {
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLDivElement>(null);

	const toggle = () => setOpen(!open);
	const close = () => setOpen(false);

	return (
		<>
			<C.Group {...props} variant="contained" color="primary" ref={anchorRef}>
				<Button onClick={print}>
					<Icon icon="printer" />
					&nbsp; Print / &nbsp; <Icon icon="file-pdf" /> &nbsp; PDF
				</Button>
				<Button size="small" onClick={toggle}>
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
