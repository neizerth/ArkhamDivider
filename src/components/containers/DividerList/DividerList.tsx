import { Divider, GuidedItem, A4, Row } from '@/components';

import S from './DividerList.module.scss';
import { IDividerType } from '@/types/dividers';
import { splitIntoGroups } from '@/util/common';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ILayout } from '@/types/layouts';
import { selectDividers } from '@/store/features/dividers/dividers';
import { useEffect, useState } from 'react';
import { Icon, IconButton } from '@/components';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

export type DividerListProps = {
	layout: ILayout
}


export const DividerList = ({ layout }: DividerListProps) => {
	const { t } = useTranslation();
	const dividers = useAppSelector(selectDividers);
	const [removedDividers, setRemovedDividers] = useState([] as string[])
	const { groupSize, rowSize, image, type, id } = layout;
	const landscape = type === IDividerType.VERTICAL;

	useEffect(() => {
		refresh();
	}, [dividers]);

	const refresh = () => setRemovedDividers([]);

	const removeDivider = (id: string) => setRemovedDividers([...removedDividers, id]);

	const availableDividers = dividers.filter(({ id }) => !removedDividers.includes(id));

	const groups = splitIntoGroups(availableDividers, groupSize);

	return (
		<div className={S.container}>

			{removedDividers.length > 0 && (
				<div className={classNames(S.group, S.removedDividers)}>
					
					<Row gap={false} className={S.removed}>
						<Icon icon="hide" className={S.removedIcon}/>
						{removedDividers.length}
					</Row>

					<IconButton 
						iconClassName={S.refreshIcon} 
						onClick={refresh} 
						icon="repeat">
						{t('Clear')}
					</IconButton>
				</div>
			)}

			<div className={S.groups}>
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
												onRemove={() => removeDivider(divider.id)}
											/>
										</GuidedItem>
									))}
								</div>
							))}
						</div>
					</A4>
				))}
			</div>
		</div>
	);
}