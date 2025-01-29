import { useParams } from "react-router-dom";
import { useAppDispatch } from "../useAppDispatch";
import { useEffect } from "react";
import { selectType, setType } from "@/shared/lib/store/features/layout/layout";
import { LayoutType } from "@/shared/model/types/layouts";
import { useAppSelector } from "../useAppSelector";

export const useTypeNavigation = () => {
	const params = useParams();
	const type = params.type as LayoutType | undefined;
	const dispatch = useAppDispatch();
	const currentType = useAppSelector(selectType);

	useEffect(() => {
		if (!type) {
			return;
		}
		if (currentType === type) {
			return;
		}

		dispatch(setType(type));
	}, [type]);
};
