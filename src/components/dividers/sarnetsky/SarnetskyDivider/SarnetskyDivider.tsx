import classNames from 'classnames';
import { DividerContent, DividerMenu, DividerText, Icon, NotExportable } from '@/components';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { useIconSelect } from '@/shared/lib/hooks/useIconSelect';
import { useStoryTranslation } from '@/shared/lib/hooks/useStoryTranslation';
import { selectLanguage } from '@/shared/store/features/language/language';
import { selectLayout } from '@/shared/store/features/layout/layout';
import { selectCornerRadius } from '@/shared/store/features/print/print';
import { DividerType } from '@/shared/types/dividers';
import { LayoutOrientation } from '@/shared/types/layouts';
import { DividerProps } from '../../common/Divider/Divider';
import { DividerCornerRadius } from '../../common/DividerCornerRadius/DividerCornerRadius';
import { SarnetskyDividerLinkedScenarioEncounters as LinkedScenarioEncounters } from '../encounters/SarnetskyDividerLinkedScenarioEncounters/SarnetskyDividerLinkedScenarioEncounters';
import { SarnetskyDividerScenarioEncounters as ScenarioEncounters } from '../encounters/SarnetskyDividerScenarioEncounters/SarnetskyDividerScenarioEncounters';
import { SarnetskyDividerBackground as DividerBackground } from '../SarnetskyDividerBackground/SarnetskyDividerBackground';
import { SarnetskyDividerMainIcon as MainIcon } from '../SarnetskyDividerMainIcon/SarnetskyDividerMainIcon';
import { SarnetskyDividerSideXP } from '../xp/SarnetskyDividerSideXP/SarnetskyDividerSideXP';
import { SarnetskyDividerXPCost } from '../xp/SarnetskyDividerXPCost/SarnetskyDividerXPCost';
import { SarnetskyDividerXPText } from '../xp/SarnetskyDividerXPText/SarnetskyDividerXPText';
import S from './SarnetskyDivider.module.scss';

export const ENCOUNTER_ROW_SIZE = 7;

const LIGHT_FACTIONS = ['mystic', 'rogue', 'guardian', 'survivor'];

export const SarnetskyDivider = (props: DividerProps) => {
  const {
    id,
    scenario,
    name = '',
    faction = '',
    type,
    story,
    xpCost,
    icon,
    tags = [],
    className,
  } = props;

  const { t } = useStoryTranslation(story);

  const language = useAppSelector(selectLanguage);
  const { orientation } = useAppSelector(selectLayout);
  const cornerRadius = useAppSelector(selectCornerRadius);

  const [previewIcon, selectPreviewIcon] = useIconSelect({
    defaultIcon: props.previewIcon || props.icon,
  });

  const [campaignIcon, selectCampaignIcon] = useIconSelect({
    defaultIcon: props.campaignIcon,
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
    xpCost && xpCost.level < 0 ? S.withoutXP : S.withXP,
    className
  );

  const isScenario = [DividerType.SCENARIO, DividerType.CAMPAIGN].includes(type);

  const isEncounter = type === DividerType.ENCOUNTER;

  const titleClassName = classNames(S.title, S[`title_${type}`], S[`title_${realLanguage}`]);

  const titleInputClassName = classNames(S.titleInput, S[`titleInput_${type}`]);

  console.log(titleInputClassName);

  const rowSize = orientation === LayoutOrientation.VERTICAL ? 8 : 10;
  const showIcon = (isScenario || isEncounter) && icon;

  return (
    <div className={containerClassName}>
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
              <SarnetskyDividerSideXP xpCost={xpCost} />
            </div>
            <div className={S.sideXP}>
              <SarnetskyDividerXPCost xpCost={xpCost} />
            </div>
            {faction && icon && (
              <div className={S.xpTitle}>
                <SarnetskyDividerXPText xpCost={xpCost} faction={faction} icon={icon} />
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
        {showIcon && previewIcon && (
          <div className={classNames(S.icon, S[`icon_type-${type}`])} onClick={selectPreviewIcon}>
            <Icon icon={previewIcon} scaleType={isScenario ? 'circle' : 'square'} />
          </div>
        )}
        {isScenario && campaignIcon && (
          <div className={classNames(S.icon, S.campaignIcon)} onClick={selectCampaignIcon}>
            <Icon icon={campaignIcon} />
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
        <div className={S.content}>
          {showIcon && (
            <MainIcon className={S.mainIcon} dynamicHeight={Boolean(scenario)} icon={icon} />
          )}
          {scenario && (
            <div className={classNames(S.encounters)}>
              {!scenario.scenarios && <ScenarioEncounters scenario={scenario} rowSize={rowSize} />}
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
        <NotExportable>
          <div className={S.menu}>
            <DividerMenu id={id} className={S.menuContainer} />
          </div>
        </NotExportable>
        {cornerRadius && (
          <NotExportable>
            <DividerCornerRadius className={classNames(S.cornerRadius)} />
          </NotExportable>
        )}
      </DividerContent>
    </div>
  );
};
