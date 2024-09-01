import { List, Divider, GuidedItem, A4 } from '@/components';

import S from './DividerList.module.scss';
import { IDividerList } from '@/types/dividers';
import { isEven, splitIntoGroups } from '@/util/common';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';
import { ILayout } from '@/types/layouts';
import { selectDividers } from '@/store/features/dividers/dividers';

export type DividerListProps = {
	layout: ILayout
}


export const DividerList = ({ layout }: DividerListProps) => {
	const { groupSize, rowSize, image } = layout;

	const dividers = useAppSelector(selectDividers);

	const groups = splitIntoGroups(dividers, groupSize);

	return (
		<div className={S.container}>
			{groups.map((group, groupIndex) => (
				<A4 className={S.page} key={groupIndex}>
					<div className={S.group}>
						{splitIntoGroups(group, rowSize).map((row, rowIndex) => (
							<div className={S.row} key={rowIndex}>
								{row.map((divider, index) => (
									<GuidedItem 
										key={index}
										className={S.item} 
									>
										<Divider background={image} {...divider}/>
									</GuidedItem>
								))}
							</div>
						))}
					</div>
				</A4>
			))}
		</div>
	);
}