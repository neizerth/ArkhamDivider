import AddIcon from "@mui/icons-material/Add";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ImportContactsIcon from "@mui/icons-material/ImportContactsOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import Grow from "@mui/material/Grow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import SvgIcon from "@mui/material/SvgIcon";
import Switch from "@mui/material/Switch";
import { type JSX, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "@/modules/core/i18n/entities/ui/LanguageSelect";
import { PageSizeSelect } from "../PageSizeSelect";
import Bleed from "./images/bleed.svg?react";
import CornerRadius from "./images/corner-radius.svg?react";
import * as C from "./PrintSettings.components";

type PrintSettingsProps = JSX.IntrinsicElements["div"];

export function PrintSettings(props: PrintSettingsProps) {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLButtonElement>(null);

	const toggle = () => setOpen(!open);

	console.log(t(`Bleed`));

	return (
		<C.Container {...props}>
			<C.Button variant="text" ref={anchorRef} onClick={toggle}>
				<C.Icon icon="cog" />
			</C.Button>
			<C.ContextMenu
				open={open}
				transition
				disablePortal
				anchorEl={anchorRef.current}
			>
				{({ TransitionProps }) => (
					<Grow {...TransitionProps}>
						<Paper>
							<List>
								<ListItem>
									<ListItemIcon>
										<LanguageIcon />
									</ListItemIcon>
									<LanguageSelect fullWidth />
								</ListItem>
								<ListItem>
									<ListItemIcon>
										<DescriptionOutlinedIcon />
									</ListItemIcon>
									<PageSizeSelect fullWidth />
								</ListItem>
								<ListItemButton>
									<ListItemIcon>
										<ImportContactsIcon />
									</ListItemIcon>
									<ListItemText primary={t(`2 sides`)} />
									<Switch />
								</ListItemButton>
								<ListItemButton>
									<ListItemIcon>
										<AddIcon />
									</ListItemIcon>
									<ListItemText primary={t(`Crop marks`)} />
									<Switch />
								</ListItemButton>
								<ListItemButton>
									<ListItemIcon>
										<SvgIcon>
											<Bleed />
										</SvgIcon>
									</ListItemIcon>
									<ListItemText primary={t(`Bleed`)} />
									<Switch />
								</ListItemButton>
								<ListItemButton>
									<ListItemIcon>
										<SvgIcon>
											<CornerRadius />
										</SvgIcon>
									</ListItemIcon>
									<ListItemText primary={t(`Corner radius`)} />
									<Switch />
								</ListItemButton>
							</List>
						</Paper>
					</Grow>
				)}
			</C.ContextMenu>
		</C.Container>
	);
}
