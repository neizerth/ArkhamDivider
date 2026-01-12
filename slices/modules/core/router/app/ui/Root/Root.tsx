import { Outlet } from "react-router";
import { RouterLocationProvider } from "../RouterLocationProvider";

export function Root() {
	return (
		<RouterLocationProvider>
			<Outlet />
		</RouterLocationProvider>
	);
}
