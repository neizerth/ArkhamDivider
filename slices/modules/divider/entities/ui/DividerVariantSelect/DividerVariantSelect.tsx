import ContrastOutlinedIcon from "@mui/icons-material/ContrastOutlined";
import Grow from "@mui/material/Grow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { type JSX, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select } from "@/shared/ui";
import { useRouterLayout } from "../../lib";
import * as C from "./DividerVariantSelect.components";

type DividerVariantSelectProps = JSX.IntrinsicElements["div"];
export function DividerVariantSelect(props: DividerVariantSelectProps) {
	const { t } = useTranslation();
	const data = useRouterLayout();

	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLButtonElement>(null);

	const colorData = useMemo(() => {
		return [
			{
				id: "grayscale",
				label: t("color.grayscale"),
				value: "grayscale",
			},
			{
				id: "color",
				label: t("color.color"),
				value: "color",
			},
		];
	}, [t]);

	const orientationData = useMemo(() => {
		return [
			{
				id: "horizontal",
				label: t("orientation.horizontal"),
				value: "horizontal",
			},
			{
				id: "vertical",
				label: t("orientation.vertical"),
				value: "vertical",
			},
		];
	}, [t]);

	if (!data) {
		return null;
	}

	const { category } = data;

	const toggle = () => setOpen(!open);

	return (
		<C.Container {...props}>
			<C.Button variant="text" onClick={toggle} ref={anchorRef}>
				<C.BrandingIcon />
			</C.Button>
			<Popper open={open} transition disablePortal anchorEl={anchorRef.current}>
				{({ TransitionProps }) => (
					<Grow {...TransitionProps}>
						<Paper>
							<List>
								{category.hasGrayscale && (
									<ListItem>
										<ListItemIcon>
											<ContrastOutlinedIcon />
										</ListItemIcon>

										<Select
											data={colorData}
											label={t("Color")}
											defaultValue={"color"}
										/>
									</ListItem>
								)}
								{category.hasOrientationVariants && (
									<ListItem>
										<ListItemIcon>
											<C.OrientationIcon icon="exhaust" />
										</ListItemIcon>

										<Select
											data={orientationData}
											label={t("Orientation")}
											defaultValue={"horizontal"}
										/>
									</ListItem>
								)}
							</List>
						</Paper>
					</Grow>
				)}
			</Popper>
		</C.Container>
	);
}
