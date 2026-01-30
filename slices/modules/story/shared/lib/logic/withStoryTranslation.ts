import type { Story } from "../../model";
import { type TranslateStoryOptions, translateStory } from "./translateStory";

export const withStoryTranslation =
	(story?: Story) =>
	(text?: string, options?: Omit<TranslateStoryOptions, "story" | "text">) =>
		translateStory({ story, text, ...options });
