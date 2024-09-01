import { List, Divider, GuidedItem, A4 } from '@/components';

import S from './DividerList.module.scss';
import { IDividerList, IDividerType } from '@/types/dividers';
import { isEven, splitIntoGroups } from '@/util/common';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';
import { ILayout } from '@/types/layouts';
import { selectDividers } from '@/store/features/dividers/dividers';

export type DividerListProps = {
	layout: ILayout
}


export const DividerList = ({ layout }: DividerListProps) => {
	const dividers = useAppSelector(selectDividers);
	const { groupSize, rowSize, image, type, id } = layout;
	const landscape = type === IDividerType.VERTICAL;

	const groups = splitIntoGroups(dividers, groupSize);

	return (
		<div className={S.container}>
			{groups.map((group, groupIndex) => (
				<A4 
					className={S.page} 
					key={groupIndex}
					landscape={landscape}
				>
					<div className={S.group}>
						{splitIntoGroups(group, rowSize).map((row, rowIndex) => (
							<div className={S.row} key={rowIndex}>
								{row.map((divider, index) => (
									<GuidedItem 
										key={index}
										className={S.item} 
									>
										<Divider 
											{...divider} 
											background={image}
											type={type}
											layoutId={id}
										/>
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