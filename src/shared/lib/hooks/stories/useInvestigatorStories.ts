import {
	selectArkhamesqueData,
	selectArkhamesqueClassicInvestigators as selectArkhqmesqueInvestigators,
} from "@/shared/lib/store/features/dividers/arkhamesque/arkhamesque";
import { hasArkhamesqueInvestigatorSupport } from "@/shared/lib/store/features/dividers/arkhamesque/criteria";
import { selectLanguage } from "@/shared/lib/store/features/language/language";
import { selectIsArkhamesqueLayout } from "@/shared/lib/store/features/layout/layout";
import { selectStories } from "@/shared/lib/store/features/stories/stories";
import type { IStory } from "@/shared/model/types/api";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../useAppSelector";

export const useInvestigatorStories = () => {
	const stories = useAppSelector(selectStories);
	const { t } = useTranslation();

	const arkhamesqueData = useAppSelector(selectArkhamesqueData);
	const language = useAppSelector(selectLanguage);

	const isArkhamesqueLayout = useAppSelector(selectIsArkhamesqueLayout);
	const investigators = useAppSelector(selectArkhqmesqueInvestigators);

	if (!isArkhamesqueLayout || !arkhamesqueData) {
		return stories;
	}

	const getIsTranslated = ({ investigators }: IStory) => {
		if (language === "en") {
			return true;
		}
		return investigators.every(({ name }) => t(name) !== name);
	};

	return stories.map((story) => ({
		...story,
		supported: hasArkhamesqueInvestigatorSupport({
			investigators,
			story,
		}),
		translated: getIsTranslated(story),
	}));
};
