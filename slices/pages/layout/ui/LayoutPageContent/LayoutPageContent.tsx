import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {
	DividerLayoutInfo,
	DividerTypeNav,
} from "@/modules/divider/entities/ui";
import { DividerLayoutOptions } from "@/modules/divider/entities/ui/divider-layout-options";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { PrintableContent } from "@/modules/print/widgets/ui";
import { SectionTitle } from "@/shared/ui";
import { SingleColumnLayout } from "@/widgets/layout/SingleColumnLayout";

type LayoutPageContentProps = {
	layout: DividerLayout;
};
export function LayoutPageContent({ layout }: LayoutPageContentProps) {
	return (
		<SingleColumnLayout>
			<Stack sx={{ paddingInline: 2, paddingBlock: 8, gap: 4 }}>
				<Container>
					<Box sx={{ displayPrint: "none" }}>
						<SectionTitle>{layout.name}</SectionTitle>
						<Stack gap={4} paddingTop={3}>
							<Stack gap={2}>
								<DividerLayoutInfo layout={layout} />
								<DividerTypeNav />
							</Stack>
							<DividerLayoutOptions />
						</Stack>
					</Box>
				</Container>
				<PrintableContent />
			</Stack>
		</SingleColumnLayout>
	);
}
