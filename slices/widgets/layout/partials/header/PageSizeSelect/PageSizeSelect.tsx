import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function PageSizeSelect() {
	const [open, setOpen] = useState(false);

	const toggle = () => setOpen(!open);

	const { t } = useTranslation();
	return (
		<>
			<ListItemButton onClick={toggle}>
				<ListItemIcon>A4</ListItemIcon>
				<ListItemText primary={t(`Page Size`)} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List>
					<ListItemButton>
						<ListItemIcon>A3</ListItemIcon>
						<ListItemText primary="297x420mm" />
					</ListItemButton>
					<ListItemButton>
						<ListItemIcon>A2</ListItemIcon>
						<ListItemText primary="420x594mm" />
					</ListItemButton>
				</List>
			</Collapse>
		</>
	);
}
