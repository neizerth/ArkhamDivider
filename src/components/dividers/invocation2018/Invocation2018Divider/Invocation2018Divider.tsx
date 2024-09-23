import S from './Invocation2018Divider.module.scss';
import { IDivider } from '@/types/dividers';
import { PropsWithClassName } from '@/types/util';
import { backgrounds } from './backgrounds';
import { omit, propEq } from 'ramda';
import { ClassicDivider } from '@/components';
import { propsEquals } from '@/util/criteria';
import { Invocation2018DividerCost } from '../Invocation2018DividerCost/Invocation2018DividerCost';

export type Invocation2018DividerProps = PropsWithClassName & IDivider;

export const Invocation2018Divider = (props: Invocation2018DividerProps) => {
	const { 
		faction,
		xpCost
	} = props;

	const xp = Boolean(
		xpCost?.level && xpCost.level > 0
	);

  const background = backgrounds.find(propsEquals({
		faction,
		xp
	}));
	
	const dividerProps = background ? omit([
		'previewIcon', 
		'icon', 
		'xpCost'
	], props) : props;

  return (
    <ClassicDivider 
			{...dividerProps}
			titleStroke={false}
			background={background?.src}
		>
			{xpCost?.level && (
				<Invocation2018DividerCost 
					className={S.xpCost}
					level={xpCost.level}
				/>
			)}
		</ClassicDivider>
  );
}