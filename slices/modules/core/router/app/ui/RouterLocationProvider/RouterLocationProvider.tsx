import { type PropsWithChildren, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { useAppDispatch } from "@/shared/lib";
import { changeLocation } from "../../../entities/lib/store/features/changeLocation";
import { setLocationParams } from "../../../shared/lib";

export function RouterLocationProvider({ children }: PropsWithChildren) {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const params = useParams();

	useEffect(() => {
		dispatch(changeLocation(location));
	}, [dispatch, location]);

	useEffect(() => {
		dispatch(setLocationParams(params));
	}, [dispatch, params]);

	return children;
}
