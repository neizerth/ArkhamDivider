import { selectStories } from "@/shared/store/features/stories/stories";
import { useAppSelector } from "../useAppSelector";
import {
	selectArkhamesqueClassicInvestigators as selectArkhqmesqueInvestigators,
	selectArkhamesqueData,
} from "@/shared/store/features/dividers/arkhamesque/arkhamesque";
import { selectIsArkhamesqueLayout } from "@/shared/store/features/layout/layout";
import { hasArkhamesqueInvestigatorSupport } from "@/shared/store/features/dividers/arkhamesque/criteria";
import { IStory } from "@/shared/types/api";
import { selectLanguage } from "@/shared/store/features/language/language";
import { useTranslation } from "react-i18next";

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
