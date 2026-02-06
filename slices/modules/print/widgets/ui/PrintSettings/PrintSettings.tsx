import Bleed from "@assets/images/bleed.svg?react";
import CornerRadius from "@assets/images/corner-radius.svg?react";
import Lasercut from "@assets/images/lasercut.svg?react";
import AddIcon from "@mui/icons-material/Add";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ImportContactsIcon from "@mui/icons-material/ImportContactsOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import LooksOneIcon from "@mui/icons-material/LooksOneOutlined";
import PinOutlinedIcon from "@mui/icons-material/PinOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import SvgIcon from "@mui/material/SvgIcon";
import { type JSX, useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSelect } from "@/modules/core/i18n/entities/ui/LanguageSelect";
import { useBooleanAction } from "@/shared/lib";
import { useBoolean } from "@/shared/lib/hooks/common";
import { StoreSwitch } from "@/shared/ui";
import {
	selectBleedEnabled,
	selectCropMarksEnabled,
	selectDoubleSidePrintEnabled,
	selectEnablePageCounter,
	selectLasercutEnabled,
	selectShowCornerRadius,
	selectSingleItemPerPage,
	setBleedEnabled,
	setCropMarksEnabled,
	setDoubleSidePrintEnabled,
	setEnablePageCounter,
	setLasercutEnabled,
	setShowCornerRadius,
	setSingleItemPerPage,
} from "../../../shared/lib";
import { PageSizeSelect } from "../PageSizeSelect";
import * as C from "./PrintSettings.components";

type PrintSettingsProps = JSX.IntrinsicElements["div"];

export function PrintSettings(props: PrintSettingsProps) {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const anchorRef = useRef<HTMLButtonElement>(null);
	const [selectOpen, setSelectOpen] = useBoolean(false);

	const onClickAway = useCallback(() => {
		if (selectOpen) {
			return;
		}
		setOpen(false);
	}, [selectOpen]);

	const toggle = () => setOpen(!open);

	const { toggle: toggleCropMarksEnabled } = useBooleanAction({
		actionCreator: setCropMarksEnabled,
		selector: selectCropMarksEnabled,
	});
	const { toggle: toggleBleedEnabled } = useBooleanAction({
		actionCreator: setBleedEnabled,
		selector: selectBleedEnabled,
	});
	const { toggle: toggleShowCornerRadius } = useBooleanAction({
		actionCreator: setShowCornerRadius,
		selector: selectShowCornerRadius,
	});
	const { toggle: toggleDoubleSidePrintEnabled } = useBooleanAction({
		actionCreator: setDoubleSidePrintEnabled,
		selector: selectDoubleSidePrintEnabled,
	});
	const { toggle: toggleSingleItemPerPage } = useBooleanAction({
		actionCreator: setSingleItemPerPage,
		selector: selectSingleItemPerPage,
	});

	const { toggle: toggleLasercutEnabled } = useBooleanAction({
		actionCreator: setLasercutEnabled,
		selector: selectLasercutEnabled,
	});

	const { toggle: toggleEnablePageCounter } = useBooleanAction({
		actionCreator: setEnablePageCounter,
		selector: selectEnablePageCounter,
	});

	return (
		<ClickAwayListener onClickAway={onClickAway}>
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
							<Paper
								sx={{
									maxHeight: "calc(100vh - 2rem)",
									overflow: "auto",
								}}
							>
								<List>
									<ListItem>
										<ListItemIcon>
											<LanguageIcon />
										</ListItemIcon>
										<LanguageSelect
											onOpen={setSelectOpen.on}
											onClose={setSelectOpen.off}
											containerProps={{
												fullWidth: true,
											}}
										/>
									</ListItem>
									<ListItem>
										<ListItemIcon>
											<DescriptionOutlinedIcon />
										</ListItemIcon>
										<PageSizeSelect
											onOpen={setSelectOpen.on}
											onClose={setSelectOpen.off}
											containerProps={{
												fullWidth: true,
											}}
										/>
									</ListItem>
									<ListItemButton onClick={toggleCropMarksEnabled}>
										<ListItemIcon>
											<AddIcon />
										</ListItemIcon>
										<ListItemText primary={t(`Crop marks`)} />
										<StoreSwitch
											actionCreator={setCropMarksEnabled}
											selector={selectCropMarksEnabled}
										/>
									</ListItemButton>
									<ListItemButton onClick={toggleBleedEnabled}>
										<ListItemIcon>
											<SvgIcon>
												<Bleed />
											</SvgIcon>
										</ListItemIcon>
										<ListItemText primary={t(`Bleed`)} />
										<StoreSwitch
											actionCreator={setBleedEnabled}
											selector={selectBleedEnabled}
										/>
									</ListItemButton>

									<ListItemButton onClick={toggleShowCornerRadius}>
										<ListItemIcon>
											<SvgIcon>
												<CornerRadius />
											</SvgIcon>
										</ListItemIcon>
										<ListItemText primary={t(`Corner radius`)} />
										<StoreSwitch
											actionCreator={setShowCornerRadius}
											selector={selectShowCornerRadius}
										/>
									</ListItemButton>
									<ListItemButton onClick={toggleDoubleSidePrintEnabled}>
										<ListItemIcon>
											<ImportContactsIcon />
										</ListItemIcon>
										<ListItemText primary={t(`2 sides`)} />
										<StoreSwitch
											actionCreator={setDoubleSidePrintEnabled}
											selector={selectDoubleSidePrintEnabled}
										/>
									</ListItemButton>
									<ListItemButton onClick={toggleSingleItemPerPage}>
										<ListItemIcon>
											<LooksOneIcon />
										</ListItemIcon>
										<ListItemText primary={t(`One per page`)} />
										<StoreSwitch
											actionCreator={setSingleItemPerPage}
											selector={selectSingleItemPerPage}
										/>
									</ListItemButton>
									<ListItemButton onClick={toggleEnablePageCounter}>
										<ListItemIcon>
											<PinOutlinedIcon />
										</ListItemIcon>
										<ListItemText primary={t(`Page counter`)} />
										<StoreSwitch
											actionCreator={setEnablePageCounter}
											selector={selectEnablePageCounter}
										/>
									</ListItemButton>
									<ListItemButton onClick={toggleLasercutEnabled}>
										<ListItemIcon>
											<Lasercut width={24} />
										</ListItemIcon>
										<ListItemText primary={t(`Lasercut`)} />
										<StoreSwitch
											actionCreator={setLasercutEnabled}
											selector={selectLasercutEnabled}
										/>
									</ListItemButton>
								</List>
							</Paper>
						</Grow>
					)}
				</C.ContextMenu>
			</C.Container>
		</ClickAwayListener>
	);
}
