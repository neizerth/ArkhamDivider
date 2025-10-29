import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { propEq } from "ramda";
import { useTranslation } from "react-i18next";
import { layoutRoute } from "@/modules/core/router/entities/lib";
import { Link } from "@/modules/core/router/entities/ui";
import type { DividerCategory } from "@/modules/divider/shared/model";
import { DividerCategoryLayoutList as LayoutList } from "../DividerCategoryLayoutList";

type DividerCategoryProps = {
	category: DividerCategory;
};

export function DividerCategoryPreview({ category }: DividerCategoryProps) {
	const { t } = useTranslation();
	const { layouts, name } = category;
	const horizontal = layouts.filter(propEq("horizontal", "orientation"));
	const vertical = layouts.filter(propEq("vertical", "orientation"));

	const [firstLayout] = layouts;

	return (
		<Card>
			<Box padding={2}>
				<Link to={layoutRoute(firstLayout.id)}>
					<CardMedia
						sx={{ height: 200, backgroundSize: "contain" }}
						image={category.image}
						title={name}
					/>
				</Link>
				<Stack gap={1}>
					<Typography variant="h6" textAlign="center">
						{name}
					</Typography>
					<Stack gap={1}>
						<LayoutList
							layouts={horizontal}
							title={t`orientation.horizontal`}
						/>
						<LayoutList layouts={vertical} title={t`orientation.vertical`} />
					</Stack>
				</Stack>
			</Box>
		</Card>
	);
}
