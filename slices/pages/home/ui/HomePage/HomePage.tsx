import Stack from "@mui/material/Stack";
import { BoxCompatibility } from "../BoxCompatibility";
import { DividerList } from "../DividerList";
import * as C from "./HomePage.components";

export function HomePage() {
	return (
		<C.Container>
			<Stack gap={8} paddingBlock={8}>
				<DividerList />
				<BoxCompatibility />
			</Stack>
		</C.Container>
	);
}
