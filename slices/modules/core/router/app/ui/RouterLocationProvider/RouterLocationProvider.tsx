import { type PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router";
import { useAppDispatch } from "@/shared/lib";
import { changeLocation } from "../../../entities/lib/store/features/changeLocation";

export function RouterLocationProvider({ children }: PropsWithChildren) {
	const location = useLocation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(changeLocation(location));
	}, [dispatch, location]);

	return children;
}
