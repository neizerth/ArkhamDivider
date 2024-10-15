import S from './SarnetskyDivider.module.scss';

import { DividerType, IDivider } from '@/types/dividers';
import { DividerContent, DividerMenu, DividerText, Icon } from '@/components';
import classNames from 'classnames';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';
import { SarnetskyDividerBackground as DividerBackground } from '../SarnetskyDividerBackground/SarnetskyDividerBackground';
import { useTranslation } from 'react-i18next';
import { selectLanguage } from '@/store/features/language/language';
import { SarnetskyDividerScenarioEncounters as ScenarioEncounters } from '../encounters/SarnetskyDividerScenarioEncounters/SarnetskyDividerScenarioEncounters';
import { SarnetskyDividerLinkedScenarioEncounters as LinkedScenarioEncounters } from '../encounters/SarnetskyDividerLinkedScenarioEncounters/SarnetskyDividerLinkedScenarioEncounters';
import { LayoutOrientation } from '@/types/layouts';
import { SarnetskyDividerXPCost } from '../xp/SarnetskyDividerXPCost/SarnetskyDividerXPCost';
import { SarnetskyDividerSideXP } from '../xp/SarnetskyDividerSideXP/SarnetskyDividerSideXP';
import { SarnetskyDividerXPText } from '../xp/SarnetskyDividerXPText/SarnetskyDividerXPText';
import { SarnetskyDividerMainIcon as MainIcon } from '../SarnetskyDividerMainIcon/SarnetskyDividerMainIcon';
import { useIconSelect } from '@/hooks/useIconSelect';

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
		type,
		story,
		xpCost,
		icon,
		tags = []
	} = props;

	const { t } = useTranslation();

	const language = useAppSelector(selectLanguage);
	const { orientation } = useAppSelector(selectLayout);
	
	const [previewIcon, selectPreviewIcon] = useIconSelect({
		defaultIcon: props.previewIcon || props.icon
	});

	const [campaignIcon, selectCampaignIcon] = useIconSelect({
		defaultIcon: props.campaignIcon
	});
	
	const translatedName = t(name);
	const realLanguage = translatedName === name ? 'en' : language;
	const [tag] = tags;

	const isLight = !tag && LIGHT_FACTIONS.includes(faction);

	const containerClassName = classNames(
		S.container,
		S[realLanguage],
		S[orientation],
		S[`type_${type}`],
		isLight && S.light,
		xpCost ? S.withXP : S.withoutXP
	);

	const isScenario = [
		DividerType.SCENARIO, 
		DividerType.CAMPAIGN,
	].includes(type);
	
	const isEncounter = type === DividerType.ENCOUNTER;

	const titleClassName = classNames(
		S.title, 
		S[`title_${type}`],
		S[`title_${realLanguage}`],
	)

	const titleInputClassName = classNames(
		S.titleInput,
		S[`titleInput_${type}`],
	)

	const rowSize = orientation === LayoutOrientation.VERTICAL ? 8 : 10;
	const showIcon = (isScenario || isEncounter) && icon;

  return (
    <div 
			className={containerClassName}
		>
			<DividerContent>
				<div className={S.background}>
					<DividerBackground 
						id={tag || faction || icon || ''}
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
						{faction && icon && (
							<div className={S.xpTitle}>
								<SarnetskyDividerXPText 
									xpCost={xpCost} 
									faction={faction}
									icon={icon}
								/>
							</div>
						)}
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
				{showIcon && (
					<div 
						className={classNames(
							S.icon, 
							S[`icon_type-${type}`]
						)}
						onClick={selectPreviewIcon}
					>
						{previewIcon && <Icon icon={previewIcon}/>}
					</div>
				)}
				{isScenario && campaignIcon && (
					<div 
						className={classNames(
							S.icon, 
							S.campaignIcon
						)}
						onClick={selectCampaignIcon}
					>
						<Icon icon={campaignIcon}/>
					</div>
				)}
				{name && (
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
					<div className={classNames(
							S.campaignIcon, 
							S[`icon_${type}`], 
							S.icon_secondary
						)}
						onClick={selectCampaignIcon}
					>
						<Icon icon={campaignIcon}/>
					</div>
				)}
				<div className={S.content}>
					{showIcon && (
						<MainIcon 
							className={S.mainIcon} 
							dynamicHeight={Boolean(scenario)}
							icon={icon}
						/>
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
				</div>
				<div className={S.menu}>
					<DividerMenu 
						id={id} 
						className={S.menuContainer}
					/>
				</div>
			</DividerContent>
    </div>
  );
}