import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useResponsiveGap } from "@/shared/lib";
import * as C from "./ResponsiveList.components";

type ListItem = {
	id: string;
	image: string;
	url: string;
	title: string;
};

export type ResponsiveListProps = {
	columns: Record<string, number>;
	data: ListItem[];
	showTitle?: boolean;
	height?: number;
};

export function ResponsiveList({
	columns,
	data,
	showTitle = false,
	height = 140,
}: ResponsiveListProps) {
	const getSpacing = useResponsiveGap();

	const width = getSpacing(columns);

	return (
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
	);
}
