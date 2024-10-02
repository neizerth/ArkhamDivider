import S from './SarnetskyDivider.module.scss';

import { DividerType, IDivider } from '@/types/dividers';
import { DividerContent, DividerMenu, DividerText, Icon } from '@/components';
import classNames from 'classnames';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectOrientation } from '@/store/features/layout/layout';
import { SarnetskyDividerBackground as DividerBackground } from '../SarnetskyDividerBackground/SarnetskyDividerBackground';
import { useTranslation } from 'react-i18next';
import { selectLanguage } from '@/store/features/language/language';
import { SarnetskyDividerScenarioEncounters as ScenarioEncounters } from '../encounters/SarnetskyDividerScenarioEncounters/SarnetskyDividerScenarioEncounters';
import { SarnetskyDividerLinkedScenarioEncounters as LinkedScenarioEncounters } from '../encounters/SarnetskyDividerLinkedScenarioEncounters/SarnetskyDividerLinkedScenarioEncounters';
import { LayoutOrientation } from '@/types/layouts';
import { SarnetskyDividerXPCost } from '../xp/SarnetskyDividerXPCost/SarnetskyDividerXPCost';
import { SarnetskyDividerSideXP } from '../xp/SarnetskyDividerSideXP/SarnetskyDividerSideXP';

export const ENCOUNTER_ROW_SIZE = 7;

export type SarnetskyDividerProps = IDivider;

const LIGHT_FACTIONS = [
	'mystic',
	'rogue',
	'guardian',
	'survivor'
]

export const SarnetskyDivider = (props: SarnetskyDividerProps) => {

	const {
		id,
		scenario,
		name = '',
		faction = '',
		icon = '',
		type,
		story,
		campaignIcon,
		xpCost,
		tags = []
	} = props;

	const { t } = useTranslation();

	const language = useAppSelector(selectLanguage);
	const orientation = useAppSelector(selectOrientation);

	const translatedName = t(name);
	const realLanguage = translatedName === name ? 'en' : language;
	const [tag] = tags;

	const isLight = !tag && LIGHT_FACTIONS.includes(faction);

	const containerClassName = classNames(
		S.container,
		S[orientation],
		S[`type_${type}`],
		isLight && S.light
	);

	const isScenario = [
		DividerType.SCENARIO, 
		DividerType.CAMPAIGN,
	].includes(type);

	const isPlayer = type === DividerType.PLAYER;
	const isEncounter = type === DividerType.ENCOUNTER;

	const titleClassName = classNames(
		S.title, 
		S[`title_${type}`],
		S[`title_${realLanguage}`]
	)

	const titleInputClassName = classNames(
		S.titleInput,
		S[`titleInput_${type}`],
	)

	const rowSize = orientation === LayoutOrientation.VERTICAL ? 8 : 16;

	const showTitle = !isPlayer || (isPlayer && !xpCost);

  return (
    <div 
			className={containerClassName}
		>
			<DividerContent>
				<div className={S.background}>
					<DividerBackground 
						id={tag || faction || icon}
						storyCode={story?.return_to_code || story?.code}
						type={type}
					/>
				</div>
				{xpCost && (
					<>
						<div className={S.xpCost}>
							<SarnetskyDividerSideXP xpCost={xpCost}/>
						</div>
						<div className={S.sideXP}>
							<SarnetskyDividerXPCost xpCost={xpCost}/>
						</div>
					</>
				)}
				{story && scenario && (
					<div className={S.scenarioTitle}>
						<DividerText 
							defaultValue={`${t(story.name)}. \u{200B}${t(scenario.header)}`}
							inputClassName={S.scenarioInputTitle}
						/>
					</div>
				)}
				{!isPlayer && icon && (
					<>
						<div className={classNames(S.icon, S[`icon_type-${type}`])}>
							<Icon icon={icon}/>
						</div>
						<div className={classNames(S.icon, S.icon_main)}>
							<Icon icon={icon}/>
						</div>
					</>
				)}
				{isScenario && campaignIcon && (
					<div className={classNames(S.icon, S.campaignIcon)}>
						<Icon icon={campaignIcon}/>
					</div>
				)}
				{showTitle && name && (
					<div className={classNames(titleClassName)}>
						<DividerText 
							defaultValue={translatedName} 
							inputClassName={titleInputClassName}
							minFontSize={60}
							fixedFontSize={isEncounter}
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
								rowSize={rowSize}
							/>
						)}
						{scenario.scenarios && (
							<LinkedScenarioEncounters
								mainScenario={scenario}
								scenarios={scenario.scenarios}
								rowSize={rowSize}
							/>
						)}
					</div>
				)}
				<div className={S.menu}>
					<DividerMenu id={id} className={S.menuContainer}/>
				</div>
			</DividerContent>
    </div>
  );
}