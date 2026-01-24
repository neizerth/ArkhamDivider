import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { createLayoutGroups } from "@/modules/divider/shared/lib";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { Row } from "@/shared/ui";
import { DividerLayoutGroupPreview as Group } from "../DividerLayoutGroupPreview";

type DividerCategoryLayoutListProps = {
	layouts: DividerLayout[];
	title: string;
};

export function DividerCategoryLayoutList({
	layouts,
	title,
}: DividerCategoryLayoutListProps) {
	const groups = createLayoutGroups(layouts);
	return (
		<Stack gap={1}>
			<Typography variant="body2">{title}</Typography>
			<Row gap={1} flexWrap="wrap">
				{groups.map((group) => (
					<Group key={group.id} group={group} />
				))}
			</Row>
		</Stack>
	);
}
