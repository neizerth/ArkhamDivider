import { Suspense } from "react";
import { Outlet } from "react-router";
import { AppLoader } from "@/modules/core/app/shared/ui";
import { useHashRedirect, useRouterLocation } from "../../lib";

export function Root() {
	useRouterLocation();
	useHashRedirect();

	return (
		<Suspense fallback={<AppLoader />}>
			<Outlet />
		</Suspense>
	);
}
