import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import {
	DividerLayoutInfo,
	DividerLayoutOptions,
	DividerTypeNav,
} from "@/modules/divider/entities/ui";
import type {
	DividerCategory,
	DividerLayout,
} from "@/modules/divider/shared/model";
import { PrintableContent } from "@/modules/print/widgets/ui";
import { SectionTitle } from "@/shared/ui";
import { SingleColumnLayout } from "@/widgets/layout/SingleColumnLayout";
import { Announces } from "../Announces";
import { PrintInfo } from "../PrintInfo";

type LayoutPageContentProps = {
	layout: DividerLayout;
	category: DividerCategory;
};
export function LayoutPageContent({
	layout,
	category,
}: LayoutPageContentProps) {
	const { t } = useTranslation();
	return (
		<SingleColumnLayout printable>
			<Stack
				sx={{
					"@media screen": {
						paddingBlock: 8,
						gap: 10,
					},
				}}
			>
				<Container>
					<Box sx={{ displayPrint: "none" }}>
						<Announces />
						<SectionTitle mt={3}>
							<Typography color="text.secondary">{t(category.name)}</Typography>
							{t(layout.name)}
						</SectionTitle>
						<Stack
							sx={{
								"@media screen": {
									paddingTop: 3,
									gap: 4,
								},
							}}
						>
							<Stack gap={2}>
								<DividerLayoutInfo layout={layout} category={category} />
								<DividerTypeNav />
							</Stack>
							<DividerLayoutOptions />
							<PrintInfo />
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
					<PrintableContent />
				</Stack>
			</Stack>
		</SingleColumnLayout>
	);
}
