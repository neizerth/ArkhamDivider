import {
	selectCategoryId,
	selectLayout,
	selectType,
} from "@/shared/lib/store/features/layout/layout";
import { useAppSelector } from "../useAppSelector";
import { selectArkhamesqueData } from "@/shared/lib/store/features/dividers/arkhamesque/arkhamesque";
import { arkhamesqueCategory } from "@/shared/data/layouts/arkhamesque";
import {
	hasArkhamesqueInvestigatorSupport,
	hasArkhamesqueStorySupport,
} from "@/shared/lib/store/features/dividers/arkhamesque/criteria";
import { selectStory } from "@/shared/lib/store/features/dividers/dividers";
import { LayoutType } from "@/shared/model/types/layouts";
import { prop } from "ramda";

export const useLayoutSupport = () => {
	const type = useAppSelector(selectType);
	const story = useAppSelector(selectStory);
	const arkhamesqueData = useAppSelector(selectArkhamesqueData);
	const layout = useAppSelector(selectLayout);
	const defaultCategoryId = useAppSelector(selectCategoryId);
	const categoryId = defaultCategoryId || layout.categoryId;

	if (type === LayoutType.PLAYER) {
		return true;
	}

	const isArkhamesqueLayout = categoryId === arkhamesqueCategory.id;

	if (!story) {
		return true;
	}

	if (!isArkhamesqueLayout) {
		return true;
	}

	if (!arkhamesqueData) {
		return false;
	}

	if (type === LayoutType.SCENARIO) {
		return hasArkhamesqueStorySupport({
			data: arkhamesqueData,
			story,
		});
	}

	if (type === LayoutType.INVESTIGATOR) {
		const investigators = arkhamesqueData.investigators.flatMap((category) =>
			category.data.map(prop("code")),
		);

		return hasArkhamesqueInvestigatorSupport({
			investigators,
			story,
		});
	}

	return false;
};
