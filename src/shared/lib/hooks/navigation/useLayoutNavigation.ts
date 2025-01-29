import { arkhamesqueCategory } from "@/shared/data/layouts/arkhamesque";
import { getLayoutById } from "@/shared/lib/features/layouts/common";
import { loadArkhamesqueData } from "@/shared/lib/store/features/dividers/arkhamesque/arkhamesque";
import {
	selectLayout,
	setLayoutById,
} from "@/shared/lib/store/features/layout/layout";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../useAppDispatch";
import { useAppSelector } from "../useAppSelector";

export const useLayoutNavigation = () => {
	const dispatch = useAppDispatch();
	const { layoutId } = useParams();
	const currentLayout = useAppSelector(selectLayout);

	useEffect(() => {
		if (currentLayout.id === layoutId) {
			return;
		}

		if (!layoutId) {
			return;
		}

		dispatch(setLayoutById(layoutId));

		const layout = getLayoutById(layoutId);

		if (layout?.categoryId === arkhamesqueCategory.id) {
			dispatch(loadArkhamesqueData());
		}
	}, [layoutId]);

	useEffect(() => {}, []);
};
