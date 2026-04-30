import { useEffect } from "react";
import { useAppDispatch } from "@/shared/lib";
import { getInjectReducer } from "@/shared/store";
import { getArkhamIndexData } from "../../api/getArkhamIndexData";
import { arkhamIndex, setArkhamIndexData } from "../store";

const arkhamIndexReducer = arkhamIndex.reducer;

export const useArkhamIndexData = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const inject = getInjectReducer();
		inject("arkhamIndex", arkhamIndexReducer);

		getArkhamIndexData().then((data) => {
			dispatch(setArkhamIndexData(data));
		});
	}, [dispatch]);
};
