import {
	type RouteOptions,
	createRoute,
} from "@/shared/lib/features/util/routes";
import { selectStory } from "@/shared/lib/store/features/dividers/dividers";
import { selectLanguage } from "@/shared/lib/store/features/language/language";
import {
	selectCategoryId,
	selectLayout,
	selectType,
} from "@/shared/lib/store/features/layout/layout";
import type { ILayout } from "@/shared/model/types/layouts";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "./useAppSelector";

type AppRouteOptions = RouteOptions & {
	layout?: ILayout;
};

export const useAppNavigate = () => {
	const params = useParams();
	const navigate = useNavigate();
	const language = useAppSelector(selectLanguage);
	const currentType = useAppSelector(selectType);
	const categoryId = useAppSelector(selectCategoryId);
	const { id } = useAppSelector(selectLayout);
	const story = useAppSelector(selectStory);

	return ({ layout, ...options }: AppRouteOptions) => {
		const layoutId = layout ? layout.id : id;
		const type =
			layout && !layout.types.includes(currentType)
				? layout.types[0]
				: currentType;

		const routeOptions = {
			...params,
			language,
			type,
			categoryId,
			layoutId,
			storyId: story?.code,
			...options,
		};
		const route = createRoute(routeOptions);
		navigate(route);
	};
};
