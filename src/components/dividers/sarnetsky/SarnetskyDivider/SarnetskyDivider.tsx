import S from './SarnetskyDivider.module.scss';

import { IDivider } from '@/types/dividers';
import { DividerContent, DividerTitle, Icon } from '@/components';
import classNames from 'classnames';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectOrientation } from '@/store/features/layout/layout';
import { SarnetskyDividerBackground } from '../SarnetskyDividerBackground/SarnetskyDividerBackground';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export type SarnetskyDividerProps = IDivider & {

}


export const SarnetskyDivider = (props: SarnetskyDividerProps) => {
	const { t } = useTranslation();

	const {
		id,
		name = '',
		faction,
		icon = '',
		type,
		story,
		campaignIcon
	} = props;

	const translatedName = t(name);

	const [title, setTitle] = useState(translatedName);

	useEffect(() => {
		setTitle(translatedName);
	}, [translatedName]);

	const clear = () => setTitle(translatedName);

	const orientation = useAppSelector(selectOrientation);

	const containerClassName = classNames(
		S.container,
		S[orientation],
		S[type]
	);

  return (
    <div 
			className={containerClassName} 
		>
			<DividerContent>
				<div className={S.background}>
					<SarnetskyDividerBackground 
						id={faction || icon}
						storyCode={story?.code}
						type={type}
					/>
				</div>
				{icon && (
					<>
						<div className={classNames(S.icon, S[`icon_${type}`])}>
							<Icon icon={icon}/>
						</div>
						<div className={classNames(S.icon, S.icon_main)}>
							<Icon icon={icon}/>
						</div>
					</>
				)}
				{name && (
					<div className={classNames(S.title, S[`title_${type}`])}>
						<DividerTitle title={title} onChange={setTitle} onClear={clear}/>
					</div>
				)}
				{campaignIcon && (
					<div className={classNames(S.campaignIcon, S[`icon_${type}`])}>
						<Icon icon={campaignIcon}/>
					</div>
				)}
				{/* {background && <img className={S.background} src={background} alt={title}/>} */}
				{/* <DividerMenu id={id}/> */}
			</DividerContent>
    </div>
  );
}