import { selectCategory } from "@/modules/divider/entities/lib";
import { useAppSelector } from "@/shared/lib";
import { DividerVariantSelectDropdown } from "../DividerVariantSelectDropdown";

export const DividerVariantSelect = () => {
	const category = useAppSelector(selectCategory);
	const layoutsSize = category?.layouts.length ?? 0;

	if (!category || layoutsSize <= 1) {
		return null;
	}

	return <DividerVariantSelectDropdown />;
};
