import { List, Divider, GuidedItem } from '@/components';

import S from './DividerList.module.scss';
import { IDividerList } from '@/types/dividers';
import { isEven, splitIntoGroups } from '@/util/common';

export type DividerListProps = {
	groupSize: number,
	rowSize: number,
	dividers: IDividerList
}


export const DividerList = ({ dividers, groupSize, rowSize }: DividerListProps) => {
	const groups = splitIntoGroups(dividers, groupSize);
	return (
		<div className={S.container}>
			{groups.map((group, index) => (
				<div className={S.group} key={index}>
					{group.map((divider, index) => (
						<GuidedItem 
							key={index}
							className={S.item} 

							// topLeft={index < rowSize}
							// bottomLeft={index % rowSize === 0}
							// topRight={index === rowSize - 1}
							// bottomRight={true}
						>
							<Divider {...divider}/>
						</GuidedItem>
					))}
				</div>
			))}
		</div>
	);
}