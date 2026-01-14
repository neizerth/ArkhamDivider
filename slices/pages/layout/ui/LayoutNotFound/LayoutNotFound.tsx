import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { Row } from "@/shared/ui";

export function LayoutNotFound() {
	const { t } = useTranslation();
	return (
		<Row justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
			<Typography variant="h6">{t("Layout not found")}</Typography>
		</Row>
	);
}
