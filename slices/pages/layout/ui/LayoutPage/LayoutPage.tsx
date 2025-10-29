import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouterLayout } from "@/modules/divider/entities/lib";
import { DividerLayoutInfo } from "@/modules/divider/entities/ui/divider-layout-info";
import { SectionTitle } from "@/shared/ui";
import { SingleColumnLayout } from "@/widgets/layout/SingleColumnLayout";

export function LayoutPage() {
	const data = useRouterLayout();

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
					<DividerLayoutInfo layout={layout} />
				</Container>
			</Stack>
		</SingleColumnLayout>
	);
}
