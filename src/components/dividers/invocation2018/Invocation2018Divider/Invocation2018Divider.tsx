import S from './Invocation2018Divider.module.scss';
import { IDivider } from '@/types/dividers';
import { PropsWithClassName } from '@/types/util';
import { backgrounds } from './backgrounds';
import { omit } from 'ramda';
import { ClassicDivider } from '@/components';
import { propsEquals } from '@/util/criteria';
import { Invocation2018DividerXPCost } from '../Invocation2018DividerXPCost/Invocation2018DividerXPCost';
import { ClassicDividerSideXP } from '../../classic/xp/ClassicDividerSideXP/ClassicDividerSideXP';

export type Invocation2018DividerProps = PropsWithClassName & IDivider;

export const Invocation2018Divider = (props: Invocation2018DividerProps) => {
	const { 
		faction,
		xpCost,
		displaySideXP,
		displayNumericXP = false
	} = props;

	const level = xpCost?.max || xpCost?.level || 0;

	const xp = Boolean(
		level > 0
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
			titleClassName={S.title}
			background={background?.src}
		>
			{xpCost && (
				<Invocation2018DividerXPCost 
					className={S.xpCost}
					xpCost={xpCost}
				/>
			)}
			{displaySideXP && xpCost && (
				<div className={S.sideXP}>
					<ClassicDividerSideXP
						numeric={displayNumericXP}
						xpCost={xpCost}
					/>
				</div>
			)}
		</ClassicDivider>
  );
}