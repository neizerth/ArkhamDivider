import Stack from "@mui/material/Stack";
import { SingleColumnLayout } from "@/widgets/layout/SingleColumnLayout";
import { BoxCompatibility } from "../BoxCompatibility";
import { DividerList } from "../DividerList";

export function HomePage() {
	return (
		<SingleColumnLayout>
			<Stack gap={8} paddingBlock={8}>
				<DividerList />
				<BoxCompatibility />
			</Stack>
		</SingleColumnLayout>
	);
}
