import { Box, type BoxProps, Button, ButtonGroup, Stack } from "@mui/material";
import { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";
import { downloadIcon } from "@/modules/core/icon/shared/lib";
import { Icon, IconSelectionContext } from "@/modules/core/icon/shared/ui";
import { Row } from "@/shared/ui";
import * as C from "./IconSelectionPreview.components";

type IconSelectionPreviewProps = BoxProps;

export function IconSelectionPreview(props: IconSelectionPreviewProps) {
	const { selectedIcon } = useContext(IconSelectionContext);
	const { t } = useTranslation();

	const downloadSvg = useCallback(() => {
		if (!selectedIcon) {
			return;
		}
		downloadIcon(selectedIcon);
	}, [selectedIcon]);

	return (
		<Box {...props}>
			<Stack>
				<C.Icon>{selectedIcon && <Icon icon={selectedIcon} />}</C.Icon>

				<ButtonGroup variant="contained" color="primary">
					<Button>
						<Row alignItems="center" gap={1}>
							<Icon icon="upload" />
							{t("Upload")}
						</Row>
					</Button>
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
