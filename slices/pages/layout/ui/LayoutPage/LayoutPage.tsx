import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouterLayout } from "@/modules/divider/entities/lib";
import { DividerLayoutInfo } from "@/modules/divider/entities/ui";
import { selectStories } from "@/modules/story/shared/lib";
import { StorySelect } from "@/modules/story/shared/ui";
import { useAppSelector } from "@/shared/lib";
import { SectionTitle } from "@/shared/ui";
import { SingleColumnLayout } from "@/widgets/layout/SingleColumnLayout";

export function LayoutPage() {
	const data = useRouterLayout();
	const stories = useAppSelector(selectStories);

	if (!data) {
		return (
			<Box>
				<Typography variant="h6">Layout not found</Typography>
			</Box>
		);
	}

	const { layout } = data;

	return (
		<SingleColumnLayout>
			<Stack gap={8} paddingBlock={8}>
				<Container>
					<SectionTitle>{layout.name}</SectionTitle>
					<Stack gap={4}>
						<DividerLayoutInfo layout={layout} />
						<StorySelect fullWidth stories={stories} />
					</Stack>
				</Container>
			</Stack>
		</SingleColumnLayout>
	);
}
