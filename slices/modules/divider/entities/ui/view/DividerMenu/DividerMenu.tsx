import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack, { type StackProps } from "@mui/material/Stack";
import { useCallback } from "react";
import { Icon } from "@/modules/core/icon/shared/ui";
import { copyDivider, deleteDivider } from "@/modules/divider/shared/lib";
import { usePrintSx } from "@/modules/print/shared/lib";
import { downloadDividerAsImage } from "@/modules/render/entities/lib/store/features/downloadDividerAsImage";
import type { ImageFormat } from "@/modules/render/shared/model";
import { NotExportable } from "@/modules/render/shared/ui";
import { useAppDispatch } from "@/shared/lib";
import { useBoolean } from "@/shared/lib/hooks/common";
import { Row } from "@/shared/ui";
import { getButtonSx, getSx } from "./DividerMenu.styles";

type DividerMenuProps = StackProps & {
	dividerId: string;
};

export function DividerMenu({
	dividerId,
	sx: sxProp,
	...props
}: DividerMenuProps) {
	const [showDownload, setShowDownload] = useBoolean(false);
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

	const download = useCallback(
		(imageFormat: ImageFormat) => () => {
			dispatch(
				downloadDividerAsImage({
					dividerId,
					imageFormat,
				}),
			);
			setShowDownload.off();
		},
		[dispatch, dividerId, setShowDownload.off],
	);

	const getPrintSx = usePrintSx();
	const containerSx = getPrintSx(getSx);
	const buttonSx = getPrintSx(getButtonSx);

	const sx = {
		...containerSx,
		...sxProp,
	};

	return (
		<Stack {...props} sx={sx} displayPrint="none">
			<NotExportable id={dividerId}>
				<Row position="relative">
					<IconButton onClick={setShowDownload.toggle} sx={buttonSx}>
						<Icon icon="download" color={showDownload ? "black" : "inherit"} />
					</IconButton>
					{showDownload && (
						<Row
							position="absolute"
							top={0}
							gap={2}
							zIndex={2}
							left="100%"
							height="100%"
						>
							<IconButton onClick={download("tiff")} sx={buttonSx}>
								<Box fontSize="0.65em" color="black">
									TIFF
								</Box>
							</IconButton>
							<IconButton onClick={download("jpeg")} sx={buttonSx}>
								<Box fontSize="0.65em" color="black">
									JPEG
								</Box>
							</IconButton>
							<IconButton onClick={download("png")} sx={buttonSx}>
								<Box fontSize="0.65em" color="black">
									PNG
								</Box>
							</IconButton>
						</Row>
					)}
				</Row>
				<IconButton onClick={copy} sx={buttonSx}>
					<Icon icon="icomoonfree-copy" />
				</IconButton>
				<IconButton onClick={remove} sx={buttonSx}>
					<Icon icon="trash" />
				</IconButton>
			</NotExportable>
		</Stack>
	);
}
