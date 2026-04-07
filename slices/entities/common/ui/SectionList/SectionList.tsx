import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { useResponsiveGap } from "@/shared/lib";
import { SectionTitle } from "@/shared/ui";
import * as C from "./SectionList.components";

type SectionItem = {
	id: string;
	image: string;
	url: string;
	title: string;
};

type SectionListProps = {
	title: string;
	columns: Record<string, number>;
	data: SectionItem[];
	showTitle?: boolean;
	height?: number;
};

export function SectionList({
	title,
	columns,
	data,
	showTitle = false,
	height = 140,
}: SectionListProps) {
	const { t } = useTranslation();
	const getSpacing = useResponsiveGap(2);

	const width = getSpacing(columns);

	return (
		<C.Container>
			<Container>
				<SectionTitle>{t(title)}</SectionTitle>
				<Stack gap={2} flexDirection="row" flexWrap="wrap">
					{data.map((item) => (
						<C.Link
							key={item.id}
							to={item.url}
							sx={{
								width,
							}}
						>
							<Card key={item.id}>
								<Box padding={2}>
									<CardMedia
										sx={{ height, backgroundSize: "contain" }}
										image={item.image}
										title={item.title}
									/>
									{showTitle && (
										<Typography variant="body2" textAlign="center">
											{item.title}
										</Typography>
									)}
								</Box>
							</Card>
						</C.Link>
					))}
				</Stack>
			</Container>
		</C.Container>
	);
}
