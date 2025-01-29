import { DEFAULT_LANGUAGE } from "@/shared/config/i18n";

export type RouteOptions = {
	layoutId?: string;
	storyId?: string;
	type?: string;
	language?: string;
	categoryId?: string;
};

export const createRoute = (options: RouteOptions) => {
	const { layoutId, categoryId, language = DEFAULT_LANGUAGE } = options;

	if (layoutId) {
		return createLayoutRoute(options);
	}

	if (categoryId) {
		return createCategoryRoute(options);
	}

	return `/${language}`;
};

export const createLayoutRoute = (options: RouteOptions) => {
	const {
		language = DEFAULT_LANGUAGE,
		storyId,
		type = "scenario",
		layoutId,
	} = options;

	const path = `/${language}/layout/${layoutId}/${type}`;

	if (!storyId) {
		return path;
	}

	return `${path}/${storyId}`;
};

export const createCategoryRoute = (options: RouteOptions) => {
	const { language = DEFAULT_LANGUAGE, categoryId } = options;

	return `/${language}/category/${categoryId}`;
};
