import { whereId } from "@/shared/util";
import type { DividerLayout } from "../../shared/model";
import { dividerLayouts } from "../items";
import { getCategoryById } from "./category";

export const getLayoutById = (id: string) => dividerLayouts.find(whereId(id));

export const getLayoutAuthors = (layout: DividerLayout) => {
	const { categoryId, authors } = layout;
	if (authors) {
		return authors;
	}

	const category = getCategoryById(categoryId);
	return category?.authors;
};
