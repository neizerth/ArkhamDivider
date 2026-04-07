import type { Story } from "@/modules/story/shared/model";

type Options = {
	story: Story;
	includeReturnStory?: boolean;
};

export const getCampaignDividersCount = (options: Options) => {
	const { story, includeReturnStory = false } = options;

	if (includeReturnStory && story.return_code) {
		return 2;
	}

	return 1;
};
