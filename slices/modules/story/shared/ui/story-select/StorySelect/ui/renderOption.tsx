import type { HTMLAttributes } from "react";
import type { SelectItem } from "../model";
import { renderStory } from "./renderStory";

export const renderOption = (
	props: HTMLAttributes<HTMLLIElement>,
	story: SelectItem,
) => {
	return (
		<li {...props} key={story.code}>
			{renderStory(story)}
		</li>
	);
};
