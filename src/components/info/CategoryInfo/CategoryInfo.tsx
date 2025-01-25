import { LayoutInfo } from "@/components";
import S from "./CategoryInfo.module.scss";

export type CategoryInfoProps = {};

export const CategoryInfo = ({}: CategoryInfoProps) => {
	return (
		<div className={S.container}>
			<LayoutInfo />
		</div>
	);
};
