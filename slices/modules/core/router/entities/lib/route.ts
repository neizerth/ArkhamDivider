import type { DividerType } from "@/modules/divider/shared/model";
import { createRoutePart } from "./logic";

export const categoryRoute = ({
	categoryId,
	language,
}: {
	categoryId: string;
	language?: string;
}) => {
	const prefix = createRoutePart(language);
	const path = `${prefix}/category/${categoryId}`;
	return path;
};

export const layoutRoute = ({
	layoutId,
	storyCode,
	dividerType,
	language,
}: {
	layoutId: string;
	storyCode?: string | null;
	language?: string;
	dividerType?: DividerType | null;
}) => {
	const prefix = createRoutePart(language);

	if (storyCode) {
		const storyCodePart = createRoutePart(storyCode);
		const dividerTypePart = createRoutePart(dividerType);
		return `${prefix}/layout/${layoutId}${storyCodePart}${dividerTypePart}`;
	}

	return `${prefix}/layout/${layoutId}`;
};
