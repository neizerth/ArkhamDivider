import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {
	DividerLayoutInfo,
	DividerLayoutOptions,
	DividerTypeNav,
} from "@/modules/divider/entities/ui";
import type { DividerLayout } from "@/modules/divider/shared/model";
import { PagePreviewZoomSelect } from "@/modules/print/entities/ui";
import { PrintableContent } from "@/modules/print/widgets/ui";
import { SectionTitle } from "@/shared/ui";
import { SingleColumnLayout } from "@/widgets/layout/SingleColumnLayout";

type LayoutPageContentProps = {
	layout: DividerLayout;
};
export function LayoutPageContent({ layout }: LayoutPageContentProps) {
	return (
		<SingleColumnLayout>
			<Stack
				sx={{
					"@media screen": {
						paddingInline: 2,
						paddingBlock: 8,
						gap: 10,
					},
				}}
			>
				<Container>
					<Box sx={{ displayPrint: "none" }}>
						<SectionTitle>{layout.name}</SectionTitle>
						<Stack
							sx={{
								"@media screen": {
									paddingTop: 3,
									gap: 4,
								},
							}}
						>
							<Stack gap={2}>
								<DividerLayoutInfo layout={layout} />
								<DividerTypeNav />
							</Stack>
							<DividerLayoutOptions />
						</Stack>
					</Box>
				</Container>
				<Stack
					sx={{
						"@media screen": {
							gap: 4,
						},
					}}
				>
					<Box displayPrint="none" margin="auto">
						<PagePreviewZoomSelect />
					</Box>
					<PrintableContent />
				</Stack>
			</Stack>
		</SingleColumnLayout>
	);
}
