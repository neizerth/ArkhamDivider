import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import { Form } from "react-router";
import { Row } from "@/shared/ui";
import * as C from "./CustomStorageSearch.components";

type CustomStorageSearchProps = JSX.IntrinsicElements["section"];

export function CustomStorageSearch(props: CustomStorageSearchProps) {
	const { t } = useTranslation();

	return (
		<C.Container {...props}>
			<Container>
				<Divider sx={{ marginBottom: 2 }}>
					<Typography variant="h5">{t("Custom Storage")}</Typography>
				</Divider>

				<Typography variant="body1" textAlign="center">
					{t("Divider size")}
				</Typography>
				<Form action="/search/custom">
					<Row
						paddingBlock={2}
						gap={2}
						alignItems="center"
						marginInline="auto"
						maxWidth={"400px"}
					>
						<TextField fullWidth label={t("Width")} name="max_width" />
						<Typography variant="body2">x</Typography>

						<TextField fullWidth label={t("Height")} name="max_height" />
						<Typography variant="body2">{t("mm")}</Typography>
						<Button variant="contained" sx={{ padding: 2, flexShrink: 0 }}>
							{t("Search")}
						</Button>
					</Row>
				</Form>
			</Container>
		</C.Container>
	);
}
