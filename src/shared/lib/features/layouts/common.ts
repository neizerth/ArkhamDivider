import { layoutCategories, layouts } from "@/shared/data/layouts";
import type {
	ILayout,
	ILayoutCriteria,
	LayoutOrientation,
	LayoutType,
} from "@/shared/model/types/layouts";
import { isNil, propEq, reject } from "ramda";
import { propsEquals } from "../util/criteria";

export const getLayoutById = (layoutId: string) =>
	layouts.find(({ id }) => layoutId === id);

export const getLayoutsByType = (layoutType: LayoutOrientation) =>
	layouts.filter(({ orientation }) => orientation === layoutType);

type GetLayoutsOptions = {
	criteria: ILayoutCriteria;
	source?: ILayout[];
};

export const typeIncludes =
	(type?: LayoutType) =>
	({ types }: ILayout) =>
		!type || types.includes(type);

export const getLayouts = ({
	criteria,
	source = layouts,
}: GetLayoutsOptions) => {
	const { type, ...restCriteria } = criteria;

	const safeCriteria = reject(isNil, restCriteria);

	return source.filter(propsEquals(safeCriteria)).filter(typeIncludes(type));
};

export const getCategoryById = (id: string) => {
	return layoutCategories.find(propEq(id, "id"));
};
