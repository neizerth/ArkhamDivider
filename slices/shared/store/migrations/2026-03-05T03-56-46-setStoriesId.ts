import { v4 } from "uuid";
import type { Story } from "@/modules/story/shared/model";

// biome-ignore lint/suspicious/noExplicitAny: Redux Persist Migration
export default function setStoriesId(state?: any) {
	if (!state) {
		return;
	}

	return {
		...state,
		stories: state.stories.map((story: Story) => ({
			...story,
			id: v4(),
		})),
	};
}
