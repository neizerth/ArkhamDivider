import type { SelectProps } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import { type JSX, useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { changeLayoutId } from "@/modules/divider/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { useBoolean } from "@/shared/lib/hooks/common";
import type { Defined, Single } from "@/shared/model";
import { Select } from "@/shared/ui";
import {
	selectLayout,
	useDividerColorData,
	useDividerOrientationData,
	useRouterLayout,
} from "../../../../lib";
import { changeLayoutColor } from "../../../../lib/store/features/changeLayoutColor/changeLayoutColor";
import { changeLayoutOrientation } from "../../../../lib/store/features/changeLayoutOrientation/changeLayoutOrientation";
import { useDividerVariants } from "../lib";
import * as C from "./DividerVariantSelect.components";

type DividerVariantSelectProps = JSX.IntrinsicElements["div"];
export function DividerVariantSelect(props: DividerVariantSelectProps) {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const data = useRouterLayout();

	const layout = useAppSelector(selectLayout);
	const category = data?.category;

	const color = layout?.color ?? true;
	const orientation = layout?.orientation ?? "horizontal";

	const [open, setOpen] = useState(false);
	const [selectOpen, setSelectOpen] = useBoolean(false);
	const anchorRef = useRef<HTMLButtonElement>(null);

	const colorData = useDividerColorData(category);
	const orientationData = useDividerOrientationData(category);
	const variants = useDividerVariants();

	const onClickAway = useCallback(() => {
		if (selectOpen) {
			return;
		}
		setOpen(false);
	}, [selectOpen]);

	type ColorValue = Single<typeof colorData>;
	type ColorChangeCallback = Defined<SelectProps["onChange"]>;

	const handleColorChange = useCallback<ColorChangeCallback>(
		(event) => {
			const target = event.target as never as ColorValue;
			dispatch(changeLayoutColor(target.value === "color"));
		},
		[dispatch],
	);

	type OrientationValue = Single<typeof orientationData>;
	const handleOrientationChange = useCallback<Defined<SelectProps["onChange"]>>(
		(event) => {
			const value = (event.target as never as OrientationValue).value;
			dispatch(
				changeLayoutOrientation(
					value === "vertical" ? "vertical" : "horizontal",
				),
			);
		},
		[dispatch],
	);
	type VariantValue = Single<typeof variants>;
	const handleVariantChange = useCallback<Defined<SelectProps["onChange"]>>(
		(event) => {
			const value = (event.target as never as VariantValue).value;
			dispatch(changeLayoutId(value));
		},
		[dispatch],
	);

	if (!category) {
		return null;
	}

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
												onChange={handleColorChange}
												label={t("Color")}
												defaultValue={"color"}
												value={color ? "color" : "grayscale"}
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
												onChange={handleOrientationChange}
												label={t("Orientation")}
												defaultValue={"horizontal"}
												value={orientation}
												containerSx={{
													width: "100%",
												}}
											/>
										</ListItem>
									)}
									{variants.length > 1 && (
										<ListItem>
											<Select
												onOpen={setSelectOpen.on}
												onClose={setSelectOpen.off}
												data={variants}
												onChange={handleVariantChange}
												value={layout?.id}
												label={t("Variant")}
												containerSx={{
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
