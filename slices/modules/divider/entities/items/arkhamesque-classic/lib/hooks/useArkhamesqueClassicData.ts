import { useEffect } from "react";
import { useAppDispatch } from "@/shared/lib";
import { getInjectReducer } from "@/shared/store";
import { ArkhamesqueClassicAPI } from "../../api/ArkhamesqueClassicAPI";
import { arkhamesqueClassic, setArkhamesqueClassicData } from "../store";

const arkhamesqueClassicReducer = arkhamesqueClassic.reducer;

export const useArkhamesqueClassicData = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const inject = getInjectReducer();
		inject("arkhamesqueClassic", arkhamesqueClassicReducer);

		ArkhamesqueClassicAPI.getData().then((data) => {
			dispatch(setArkhamesqueClassicData(data));
		});
	}, [dispatch]);
};
