import S from './Invocation2018Divider.module.scss';
import { backgrounds } from './backgrounds';
import { omit } from 'ramda';
import { ClassicDivider, Icon } from '@/components';
import { propsEquals } from '@/util/criteria';
import { Invocation2018DividerXPCost } from '../Invocation2018DividerXPCost/Invocation2018DividerXPCost';
import { ClassicDividerSideXP } from '../../classic/xp/ClassicDividerSideXP/ClassicDividerSideXP';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';
import classNames from 'classnames';
import iconBg from './images/icon-bg.png';
import { useIconSelect } from '@/hooks/useIconSelect';
import { DividerProps } from '../../common/Divider/Divider';
import { selectLanguage } from '@/store/features/language/language';

export type Invocation2018DividerProps = DividerProps;

export const Invocation2018Divider = (props: Invocation2018DividerProps) => {
	const {
		faction,
		xpCost,
		displaySideXP,
		displayNumericXP = false
	} = props;

	const { orientation } = useAppSelector(selectLayout);
	const language = useAppSelector(selectLanguage);

	const level = xpCost?.max || xpCost?.level || 0;

	const xp = Boolean(
		level > 0
	);

	const [icon, selectIcon] = useIconSelect()

  const background = backgrounds.find(propsEquals({
		orientation,
		faction,
		xp
	}));
	
	const dividerProps = background ? omit([
		'previewIcon', 
		'icon', 
		'xpCost',
		'displaySideXP'
	], props) : props;
	

  return (
    <ClassicDivider 
			{...dividerProps}
			titleStroke={false}
			titleClassName={classNames(
				S.title,
				S[`title_${orientation}`],
				S[`title_${language}`]
			)}
			background={background?.src}
		>
			<div 
				className={classNames(
					S.icon,
					xpCost && S.icon_xp
				)} 
				onClick={selectIcon}
			>
				{icon && (
					<>
						<img src={iconBg} className={S.iconBackground} alt="" />
						<div className={S.iconContent}>
							<Icon icon={icon}/>
						</div>
					</>
				)}
			</div>
			{xpCost && (
				<div className={S.xpCost}>
					<Invocation2018DividerXPCost 
						xpCost={xpCost}
					/>
				</div>
			)}
			{displaySideXP && xpCost && (
				<div className={classNames(
						S.sideXP,
						S[`sideXP_${language}`],
						displayNumericXP && S.sideXP_numeric
					)}
				>
					<ClassicDividerSideXP
						numeric={displayNumericXP}
						xpCost={xpCost}
					/>
				</div>
			)}
		</ClassicDivider>
  );
}