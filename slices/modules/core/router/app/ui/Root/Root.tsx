import { Suspense } from "react";
import { Outlet } from "react-router";
import { AppLoader } from "@/modules/core/app/shared/ui";
import { RouterLocationProvider } from "../RouterLocationProvider";

export function Root() {
	return (
		<RouterLocationProvider>
			<Suspense fallback={<AppLoader />}>
				<Outlet />
			</Suspense>
		</RouterLocationProvider>
	);
}
