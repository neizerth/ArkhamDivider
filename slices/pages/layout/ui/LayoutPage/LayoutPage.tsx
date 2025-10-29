import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouterLayout } from "@/modules/divider/entities/lib";
import { DividerLayoutInfo } from "@/modules/divider/entities/ui/divider-layout-info";
import { SingleColumnLayout } from "@/widgets/layout/SingleColumnLayout";

export function LayoutPage() {
	const layout = useRouterLayout();
	return (
		<SingleColumnLayout>
			<Stack gap={8} paddingBlock={8}>
				{layout ? (
					<DividerLayoutInfo layout={layout} />
				) : (
					<Box>
						<Typography variant="h6">Layout not found</Typography>
					</Box>
				)}
			</Stack>
		</SingleColumnLayout>
	);
}
