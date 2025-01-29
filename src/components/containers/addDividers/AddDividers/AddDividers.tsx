import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
// import S from './AddDividers.module.scss';
import { selectType } from "@/shared/lib/store/features/layout/layout";
import { LayoutType } from "@/shared/model/types/layouts";
import { AddStoryDividers } from "../story/AddStoryDividers/AddStoryDividers";
import { AddPlayerDividers } from "../AddPlayerDividers/AddPlayerDividers";
import { AddInvestigatorDividers } from "../AddInvestigatorDividers/AddInvestigatorDividers";

export type AddDividersProps = {};

export const AddDividers = ({}: AddDividersProps) => {
	const type = useAppSelector(selectType);
	return (
		<>
			{type === LayoutType.SCENARIO && <AddStoryDividers />}
			{type === LayoutType.PLAYER && <AddPlayerDividers />}
			{type === LayoutType.INVESTIGATOR && <AddInvestigatorDividers />}
		</>
	);
};
