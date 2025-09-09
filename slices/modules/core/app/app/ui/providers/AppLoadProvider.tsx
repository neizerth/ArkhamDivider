import { type PropsWithChildren, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { appStarted, selectAppLoaded } from "../../../shared/lib";
import { AppLoader } from "../../../shared/ui";

export function AppLoadProvider({ children }: PropsWithChildren) {
	const dispatch = useAppDispatch();
	const appLoaded = useAppSelector(selectAppLoaded);

	useEffect(() => {
		dispatch(appStarted());
	}, [dispatch]);

	if (!appLoaded) {
		return <AppLoader />;
	}

	return children;
}
