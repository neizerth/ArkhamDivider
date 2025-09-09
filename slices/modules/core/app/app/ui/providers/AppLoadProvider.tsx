import { useAppDispatch, useAppSelector } from "@/shared/lib";
import { appStarted, selectAppLoaded } from "../../../shared/lib";
import { useEffect, type PropsWithChildren } from "react";

export function AppLoadProvider({ children }: PropsWithChildren) {
	const dispatch = useAppDispatch();
	const appLoaded = useAppSelector(selectAppLoaded);

	useEffect(() => {
		dispatch(appStarted());
	}, [dispatch]);

	if (appLoaded) {
		return null;
	}

	return children;
}
