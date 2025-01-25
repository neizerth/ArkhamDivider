import { selectStories } from "@/app/store/features/stories/stories";
import { useAppSelector } from "../useAppSelector";
import { selectIsArkhamesqueLayout } from "@/app/store/features/layout/layout";
import { selectArkhamesqueData } from "@/app/store/features/dividers/arkhamesque/arkhamesque";
import { hasArkhamesqueStorySupport } from "@/app/store/features/dividers/arkhamesque/criteria";
import {
	selectLanguage,
	selectTranslatedStories,
} from "@/app/store/features/language/language";
import { IStory } from "@/shared/types/api";

export const useCampaignStories = () => {
	const stories = useAppSelector(selectStories);
	const arkhamesqueData = useAppSelector(selectArkhamesqueData);

	const language = useAppSelector(selectLanguage);
	const translated = useAppSelector(selectTranslatedStories);

	const isArkhamesqueLayout = useAppSelector(selectIsArkhamesqueLayout);

	const getIsTranslated = (story: IStory) => {
		if (language === "en") {
			return true;
		}
		if (!translated[language]) {
			return false;
		}
		return translated[language].includes(story.code);
	};

	if (!isArkhamesqueLayout || !arkhamesqueData) {
		return stories.map((story) => ({
			...story,
			translated: getIsTranslated(story),
		}));
	}

	return stories.map((story) => ({
		...story,
		supported: hasArkhamesqueStorySupport({
			story,
			data: arkhamesqueData,
		}),
		translated: getIsTranslated(story),
	}));
};
