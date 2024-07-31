import { List, Divider } from '@/components';

import S from './DividerList.module.scss';
import { IDividerList } from '@/types/dividers';

export type DividerListProps = {
	dividers: IDividerList
}

export const DividerList = ({ dividers }: DividerListProps) => {
	return (
		<List className={S.container}>
			{dividers.map(({ id, title }) => (
				<Divider key={id} title={title}/>
			))}
		</List>
	);
}