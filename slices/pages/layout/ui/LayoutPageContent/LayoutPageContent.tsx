import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {
	DividerLayoutInfo,
	DividerTypeNav,
} from "@/modules/divider/entities/ui";
import { DividerLayoutOptions } from "@/modules/divider/entities/ui/divider-layout-options";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { SectionTitle } from "@/shared/ui";
import { SingleColumnLayout } from "@/widgets/layout/SingleColumnLayout";

type LayoutPageContentProps = {
	layout: DividerLayout;
};
export function LayoutPageContent({ layout }: LayoutPageContentProps) {
	return (
		<SingleColumnLayout>
			<Stack gap={8} paddingBlock={8}>
				<Container sx={{ paddingInline: { xs: 1, sm: 2 } }}>
					<SectionTitle>{layout.name}</SectionTitle>
					<Stack gap={4}>
						<DividerLayoutInfo layout={layout} />
						<DividerTypeNav />
						<DividerLayoutOptions />
					</Stack>
				</Container>
			</Stack>
		</SingleColumnLayout>
	);
}
