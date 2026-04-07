import Stack from "@mui/material/Stack";
import { SingleColumnLayout } from "@/widgets/layout/SingleColumnLayout";
import { BandsList } from "../BandsList";
import { DividerList } from "../DividerList";
import { IconsDownload } from "../IconsDownload";
import { InvestigatorTokensPreview } from "../InvestigatorTokensPreview";
import { ProjectInfo } from "../ProjectInfo";
import { StickersList } from "../StickersList";

export function HomePage() {
	return (
		<SingleColumnLayout>
			<Stack gap={8} paddingBlock={8}>
				<ProjectInfo />
				<DividerList />
				<BandsList />
				<StickersList />
				<InvestigatorTokensPreview />
				<IconsDownload />
			</Stack>
		</SingleColumnLayout>
	);
}
