import Stack from "@mui/material/Stack";
import { Compatibility } from "@/widgets/section/Compatibility";
import { CustomStorageSearch } from "@/widgets/section/CustomStorageSearch";
import * as C from "./HomePage.components";

export function HomePage() {
	return (
		<C.Container>
			<Stack padding={2}>
				<h1>HomePage.tsx</h1>
			</Stack>
			<Stack gap={8}>
				<CustomStorageSearch />
				<Compatibility />
			</Stack>
		</C.Container>
	);
}
