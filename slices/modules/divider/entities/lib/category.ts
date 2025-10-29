import { whereId } from "@/shared/util";
import { dividerCategories } from "../items";

export const getCategoryById = (id: string) =>
	dividerCategories.find(whereId(id));
