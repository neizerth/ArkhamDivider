import { Box, type BoxProps, Button, ButtonGroup, Stack } from "@mui/material";
import { isString } from "ramda-adjunct";
import { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { downloadIcon } from "@/modules/core/icon/entities/lib";
import { createMediaIcon, getIconId } from "@/modules/core/icon/shared/lib";
import { Icon, IconSelectionContext } from "@/modules/core/icon/shared/ui";
import { addMedia } from "@/modules/core/media/shared/lib";
import { Row, Upload } from "@/shared/ui";
import * as C from "./IconSelectionPreview.components";

type IconSelectionPreviewProps = BoxProps;

export function IconSelectionPreview(props: IconSelectionPreviewProps) {
	const { selectedIcon, setSelectedIcon } = useContext(IconSelectionContext);
	const { t } = useTranslation();

	const downloadSvg = useCallback(() => {
		if (!selectedIcon || !isString(selectedIcon)) {
			return;
		}
		downloadIcon(selectedIcon);
	}, [selectedIcon]);

	const handleUpload = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const file = event.target.files?.[0];
			if (!file) {
				return;
			}
			const mediaId = await addMedia(file);
			const icon = createMediaIcon(mediaId);

			console.log("media icon", icon);
			setSelectedIcon(icon);
		},
		[setSelectedIcon],
	);
	const iconId = getIconId(selectedIcon) ?? "upload";

	return (
		<Box {...props}>
			<Stack gap={1} justifyContent="center" alignItems="center">
				<C.Icon>{selectedIcon && <Icon icon={selectedIcon} />}</C.Icon>

				<ButtonGroup variant="contained" color="primary">
					<Upload
						key={iconId}
						accept="image/*"
						onChange={handleUpload}
						sx={{
							paddingInline: 2,
						}}
					>
						<Row alignItems="center" gap={1}>
							<Icon icon="upload" />
							{t("Upload")}
						</Row>
					</Upload>
					<Button onClick={downloadSvg}>
						<Row alignItems="center" gap={1}>
							<Icon icon="download" /> SVG
						</Row>
					</Button>
				</ButtonGroup>
			</Stack>
		</Box>
	);
}
