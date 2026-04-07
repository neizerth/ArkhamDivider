import { Alert, Box, type BoxProps, type SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";

type StoryNotSupportedProps = BoxProps;

export function StoryNotSupported(props: StoryNotSupportedProps) {
	const { t } = useTranslation();
	const sx = {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		width: "100%",
		paddingInline: 2,
		...props.sx,
	} as SxProps;
	return (
		<Box {...props} sx={sx}>
			<Alert severity="error">{t("contentNotSupported")}</Alert>
		</Box>
	);
}
