import { useParams } from "react-router";
import { getCategoryById } from "../category";
import { getLayoutById } from "../layout";

export const useRouterLayout = () => {
	const params = useParams();
	const { layoutId } = params;

	if (!layoutId) {
		return null;
	}

	const layout = getLayoutById(layoutId);

	if (!layout) {
		return null;
	}

	const category = getCategoryById(layout.categoryId);
	if (!category) {
		return null;
	}

	return { layout, category };
};
