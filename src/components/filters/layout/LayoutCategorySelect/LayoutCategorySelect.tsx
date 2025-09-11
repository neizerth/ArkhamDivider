import Select from "react-select";
import { useAppNavigate } from "@/shared/lib/hooks/useAppNavigate";
import S from "./LayoutCategorySelect.module.scss";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import {
	selectCategoryId,
	selectLayout,
} from "@/shared/store/features/layout/layout";
import { layoutCategories } from "@/shared/data/layouts";
import classNames from "classnames";
import { PropsWithClassName } from "@/shared/types/util";
import { propEq } from "ramda";
import { getLayouts } from "@/shared/lib/features/layouts/common";
import { useTranslation } from "react-i18next";

export type LayoutCategorySelectProps = PropsWithClassName & {};

export const LayoutCategorySelect = ({
	className,
}: LayoutCategorySelectProps) => {
	const { t } = useTranslation();
	const navigate = useAppNavigate();
	const selectedCategoryId = useAppSelector(selectCategoryId);
	const layout = useAppSelector(selectLayout);

	const categoryId = selectedCategoryId || layout.categoryId;

	const options = layoutCategories
		.filter(({ unlisted, id }) => !unlisted || id === categoryId)
		.map(({ name, id }) => ({
			label: name,
			value: id,
		}));

	const value = options.find(propEq(categoryId, "value"));

	const setCategoryId = (categoryId: string) => {
		const [layout] = getLayouts({
			criteria: { categoryId },
		});
		navigate({
			categoryId,
			layout,
		});
	};

	const containerClassName = classNames(className, S.container);

	return (
		<Select
			className={containerClassName}
			options={options}
			value={value}
			placeholder={t("Choose an option")}
   onChange={(item: any) => item && setCategoryId(item.value)}
		/>
	);
};
