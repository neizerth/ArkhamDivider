import S from './SarnetskyDivider.module.scss';

import { DividerType, IDivider } from '@/types/dividers';
import { DividerContent, DividerMenu, DividerText, Icon } from '@/components';
import classNames from 'classnames';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectOrientation } from '@/store/features/layout/layout';
import { SarnetskyDividerBackground as DividerBackground } from '../SarnetskyDividerBackground/SarnetskyDividerBackground';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { selectLanguage } from '@/store/features/language/language';
import { SarnetskyDividerScenarioEncounters as ScenarioEncounters } from '../encounters/SarnetskyDividerScenarioEncounters/SarnetskyDividerScenarioEncounters';
import { SarnetskyDividerLinkedScenarioEncounters as LinkedScenarioEncounters } from '../encounters/SarnetskyDividerLinkedScenarioEncounters/SarnetskyDividerLinkedScenarioEncounters';

export const ENCOUNTER_ROW_SIZE = 7;

export type SarnetskyDividerProps = IDivider;

export const SarnetskyDivider = (props: SarnetskyDividerProps) => {

	const {
		id,
		scenario,
		name = '',
		faction,
		icon = '',
		type,
		story,
		campaignIcon,
	} = props;

	const { t } = useTranslation();

	const language = useAppSelector(selectLanguage);
	const translatedName = t(name);

	const realLanguage = translatedName === name ? 'en' : language;

	const [title, setTitle] = useState(translatedName);


	useEffect(() => {
		setTitle(translatedName);
	}, [translatedName]);

	const orientation = useAppSelector(selectOrientation);

	const containerClassName = classNames(
		S.container,
		S[orientation],
		S[`type_${type}`]
	);



	const size = ['ko', 'zh', 'zh-cn'].includes(realLanguage) ? title.length * 2 : title.length;

	const titleClassName = classNames(
		S.title, 
		S[`title_${type}`],
		size <= 30 && S.title_m,
		size > 30 && S.title_l,
		size > 40 && S.title_xl,
		size > 50 && S.title_xxl,
		S[`title_${language}`]
	)

	const titleInputClassName = classNames(
		S.titleInput,
		S[`titleInput_${type}`],
	)
	
	const isScenario = [DividerType.SCENARIO, DividerType.CAMPAIGN].includes(type);

  return (
    <div 
			className={containerClassName}
		>
			<DividerContent>
				<div className={S.background}>
					<DividerBackground 
						id={faction || icon}
						storyCode={story?.return_to_code || story?.code}
						type={type}
					/>
				</div>
				{isScenario && story && scenario && (
					<div className={S.scenarioTitle}>
						<DividerText 
							defaultValue={`${t(story.name)}. \u{200B}${t(scenario.header)}`}
							inputClassName={S.scenarioInputTitle}
						/>
					</div>
				)}
				{icon && (
					<>
						<div className={classNames(S.icon, S[`icon_type-${type}`])}>
							<Icon icon={icon}/>
						</div>
						<div className={classNames(S.icon, S.icon_main)}>
							<Icon icon={icon}/>
						</div>
					</>
				)}
				{campaignIcon && (
					<div className={classNames(S.icon, S.campaignIcon)}>
						<Icon icon={campaignIcon}/>
					</div>
				)}
				{name && (
					<div className={classNames(titleClassName)}>
						<DividerText 
							defaultValue={translatedName} 
							onChange={setTitle}
							inputClassName={titleInputClassName}
							minFontSize={60}
							fixedFontSize={!isScenario}
						/>
					</div>
				)}
				{campaignIcon && (
					<div className={classNames(S.campaignIcon, S[`icon_${type}`])}>
						<Icon icon={campaignIcon}/>
					</div>
				)}
				{scenario && (
					<div className={classNames(S.encounters)}>
						{!scenario.scenarios && (
							<ScenarioEncounters 
								scenario={scenario}
								rowSize={8}
							/>
						)}
						{scenario.scenarios && (
							<LinkedScenarioEncounters
								mainScenario={scenario}
								scenarios={scenario.scenarios}
								rowSize={8}
							/>
						)}
					</div>
				)}
				{/* {background && <img className={S.background} src={background} alt={title}/>} */}
				<div className={S.menu}>
					<DividerMenu id={id} className={S.menuContainer}/>
				</div>
			</DividerContent>
    </div>
  );
}