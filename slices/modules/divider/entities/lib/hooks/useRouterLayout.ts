import { useParams } from "react-router";
import { getLayoutById } from "../layout";
import { getCategoryById } from "../logic/getCategoryById";

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
