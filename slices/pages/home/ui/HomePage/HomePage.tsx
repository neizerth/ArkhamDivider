import Stack from "@mui/material/Stack";
import { brands } from "@/entities/brand/config";
import { SectionList } from "@/entities/common/ui";
import dividers from "./dividers.json";
import * as C from "./HomePage.components";

export function HomePage() {
	return (
		<C.Container>
			<Stack gap={8} paddingBlock={8}>
				<SectionList
					title="Dividers"
					columns={{ xs: 2, sm: 3, md: 4 }}
					height={200}
					data={dividers}
					showTitle={true}
				/>
				<SectionList
					title="Compatible with"
					columns={{ xs: 1, sm: 2, md: 3 }}
					data={brands}
				/>
			</Stack>
		</C.Container>
	);
}
