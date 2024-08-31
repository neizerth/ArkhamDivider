import { List, Divider, GuidedItem } from '@/components';

import S from './DividerList.module.scss';
import { IDividerList } from '@/types/dividers';
import { isEven, splitIntoGroups } from '@/util/common';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLanguage } from '@/store/features/language/language';

export type DividerListProps = {
	groupSize: number,
	rowSize: number,
	dividers: IDividerList
}


export const DividerList = ({ dividers, groupSize, rowSize }: DividerListProps) => {
	const groups = splitIntoGroups(dividers, groupSize);
	const language = useAppSelector(selectLanguage);

	return (
		<div className={S.container}>
			{groups.map((group, groupIndex) => (
				<div className={S.group} key={groupIndex}>
					{splitIntoGroups(group, rowSize).map((row, rowIndex) => (
						<div className={S.row} key={rowIndex}>
							{row.map((divider, index) => (
								<GuidedItem 
									key={index}
									className={S.item} 
								>
									<Divider {...divider} language={language}/>
								</GuidedItem>
							))}
						</div>
					))}
				</div>
			))}
		</div>
	);
}