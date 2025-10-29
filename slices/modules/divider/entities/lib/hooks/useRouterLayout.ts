import { useParams } from "react-router";
import { getLayoutById } from "../layout";

export const useRouterLayout = () => {
	const params = useParams();
	const { layoutId } = params;

	const layout = layoutId ? getLayoutById(layoutId) : null;

	return layout;
};
