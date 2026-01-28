import Box, { type BoxProps } from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useCallback } from "react";
import { Icon } from "@/modules/core/icon/shared/ui";
import { copyDivider, deleteDivider } from "@/modules/divider/shared/lib";
import { DividerNotExportable as NotExportable } from "@/modules/divider/shared/ui";
import {
	selectSingleItemPerPage,
	usePrintSx,
} from "@/modules/print/shared/lib";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { downloadDividerAsImage } from "../../../lib/store/features/downloadDividerAsImage";
import { getButtonSx, getSx } from "./DividerMenu.styles";

type DividerMenuProps = BoxProps & {
	dividerId: string;
};

export function DividerMenu({
	dividerId,
	sx: sxProp,
	...props
}: DividerMenuProps) {
	const single = useAppSelector(selectSingleItemPerPage);
	const dispatch = useAppDispatch();

	const copy = useCallback(() => {
		dispatch(
			copyDivider({
				id: dividerId,
			}),
		);
	}, [dispatch, dividerId]);

	const remove = useCallback(() => {
		dispatch(deleteDivider(dividerId));
	}, [dispatch, dividerId]);

	const download = useCallback(() => {
		dispatch(downloadDividerAsImage(dividerId));
	}, [dispatch, dividerId]);

	const getPrintSx = usePrintSx();
	const containerSx = getPrintSx(getSx);
	const buttonSx = getPrintSx(getButtonSx);

	const sx = {
		...containerSx,
		...sxProp,
	};
	return (
		<Box sx={sx} {...props} displayPrint="none">
			<NotExportable id={dividerId}>
				{!single && (
					<IconButton sx={buttonSx}>
						<Icon icon="eye" />
					</IconButton>
				)}
				<IconButton onClick={download} sx={buttonSx}>
					<Icon icon="download" />
				</IconButton>
				<IconButton onClick={copy} sx={buttonSx}>
					<Icon icon="icomoonfree-copy" />
				</IconButton>
				<IconButton onClick={remove} sx={buttonSx}>
					<Icon icon="trash" />
				</IconButton>
			</NotExportable>
		</Box>
	);
}
