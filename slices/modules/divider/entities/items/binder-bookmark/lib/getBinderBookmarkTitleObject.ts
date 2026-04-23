import { mergeDeepRight } from "ramda";
import { binderBookmarkObjects as O } from "../config/common";

type Title = typeof O.title.default;

export const getBinderBookmarkTitleObject = (language: string) => {
	switch (language) {
		case "ru":
			return mergeDeepRight(O.title.default, O.title.ru) as Title;
		default:
			return O.title.default;
	}
};
