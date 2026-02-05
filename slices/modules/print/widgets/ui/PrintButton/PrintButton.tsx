import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import type { ButtonGroupProps } from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@/modules/core/icon/shared/ui";
import { selectLayout } from "@/modules/divider/entities/lib";
import { getSupportedLayoutDPI } from "@/modules/divider/shared/lib";
import type { DPI } from "@/modules/print/shared/model";
import { downloadDividersAsPDF } from "@/modules/render/features/download-dividers-as-pdf";
import { isPrintSupported, theme } from "@/shared/config";
import {
	createClickAwayListener,
	useAppDispatch,
	useAppSelector,
} from "@/shared/lib";
import * as C from "./PrintButton.components";

type PrintButtonProps = ButtonGroupProps;

const sx = {
	backgroundColor: theme.palette.primary.main,
	"&:hover": { backgroundColor: theme.palette.primary.dark },
};

export function PrintButton(props: PrintButtonProps) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const layout = useAppSelector(selectLayout);
	const supportedDPI = getSupportedLayoutDPI(layout);
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLDivElement>(null);

	const toggle = () => setOpen(!open);
	const close = createClickAwayListener({
		callback: () => setOpen(false),
		ignore: anchorRef.current,
	});

	const download = useCallback(
		(dpi?: DPI) => () => {
			dispatch(downloadDividersAsPDF({ dpi }));
		},
		[dispatch],
	);

	return (
		<>
			{isPrintSupported ? (
				<C.Group {...props} variant="contained" ref={anchorRef}>
					<Button onClick={print} sx={sx}>
						<Icon icon="printer" /> &nbsp;
						<Box sx={{ display: { xs: "none", sm: "inline" } }}>{t`Print`}</Box>
						&nbsp;/ &nbsp; <Icon icon="file-pdf" /> &nbsp; PDF
					</Button>
					<Button size="small" onClick={toggle} sx={sx}>
						<Icon icon="download" />
					</Button>
				</C.Group>
			) : (
				<C.Group {...props} variant="contained" ref={anchorRef}>
					<Button onClick={toggle} sx={sx}>
						<Icon icon="download" /> &nbsp; {t`Download`}
					</Button>
				</C.Group>
			)}
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
									{supportedDPI.flatMap((dpi) => [
										<Box
											key={`${dpi}-header`}
											display="flex"
											justifyContent="center"
											alignItems="center"
											paddingBlock={1}
											paddingInline={2}
											borderBottom={1}
											borderColor="divider"
											color="text.secondary"
										>
											<Typography variant="body2">{dpi} DPI</Typography>
										</Box>,
										<MenuItem key={`${dpi}-pdf`} onClick={download(dpi)}>
											<Icon icon="file-pdf" /> &nbsp; PDF
											<C.Badge>CMYK</C.Badge>
										</MenuItem>,
										<MenuItem key={`${dpi}-tiff`}>
											<Icon icon="file-zip" /> &nbsp; TIFF
											<C.Badge>CMYK</C.Badge>
										</MenuItem>,
										<MenuItem key={`${dpi}-jpeg`}>
											<Icon icon="file-zip" /> &nbsp; JPEG
											<C.Badge>CMYK</C.Badge>
										</MenuItem>,
										<MenuItem key={`${dpi}-jpg`}>
											<Icon icon="file-zip" /> &nbsp; PNG
											<C.Badge>RGB</C.Badge>
										</MenuItem>,
									])}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</C.ContextMenu>
		</>
	);
}
