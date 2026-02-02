import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { type JSX, useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useBoolean } from "@/shared/lib/hooks/common";
import { Select } from "@/shared/ui";
import {
	useDividerColorData,
	useDividerOrientationData,
	useRouterLayout,
} from "../../../lib";
import * as C from "./DividerVariantSelect.components";

type DividerVariantSelectProps = JSX.IntrinsicElements["div"];
export function DividerVariantSelect(props: DividerVariantSelectProps) {
	const { t } = useTranslation();
	const data = useRouterLayout();

	const [open, setOpen] = useState(false);
	const [selectOpen, setSelectOpen] = useBoolean(false);
	const anchorRef = useRef<HTMLButtonElement>(null);

	const colorData = useDividerColorData();
	const orientationData = useDividerOrientationData();

	const onClickAway = useCallback(() => {
		if (selectOpen) {
			return;
		}
		setOpen(false);
	}, [selectOpen]);

	if (!data) {
		return null;
	}

	const { category } = data;

	const toggle = () => setOpen(!open);

	return (
		<ClickAwayListener onClickAway={onClickAway}>
			<C.Container {...props}>
				<C.Button variant="text" onClick={toggle} ref={anchorRef}>
					<C.BrandingIcon />
				</C.Button>
				<Popper
					open={open}
					transition
					disablePortal
					anchorEl={anchorRef.current}
				>
					{({ TransitionProps }) => (
						<Grow {...TransitionProps}>
							<Paper>
								<List>
									{category.hasGrayscale && (
										<ListItem>
											<Select
												onOpen={setSelectOpen.on}
												onClose={setSelectOpen.off}
												data={colorData}
												label={t("Color")}
												defaultValue={"color"}
												containerSx={{
													width: "100%",
												}}
											/>
										</ListItem>
									)}
									{category.hasOrientationVariants && (
										<ListItem>
											<Select
												onOpen={setSelectOpen.on}
												onClose={setSelectOpen.off}
												data={orientationData}
												label={t("Orientation")}
												defaultValue={"horizontal"}
												sx={{
													width: "100%",
												}}
											/>
										</ListItem>
									)}
								</List>
							</Paper>
						</Grow>
					)}
				</Popper>
			</C.Container>
		</ClickAwayListener>
	);
}
