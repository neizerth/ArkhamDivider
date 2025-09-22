import { isNil } from 'ramda';
import { useState } from 'react';
// import { onlyWithScenarioEncounters } from '@/store/features/stories/criteria';
import { useTranslation } from 'react-i18next';
import { Checkbox, Col, Icon, Row } from '@/components';
import { getCampaignDividersCount } from '@/shared/lib/features/dividers/story/count';
import {
  getExtraEncounterDividersIcons,
  getRequiredEncounterDividersIcons,
  getScenarioDividerIcons,
} from '@/shared/lib/features/dividers/story/icons';
import { safePropEq } from '@/shared/lib/features/util/criteria';
import { createToggleHanlder } from '@/shared/lib/features/util/forms';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectEncounterSets } from '@/shared/store/features/encounterSets/encounterSets';
import { selectLayout } from '@/shared/store/features/layout/layout';
import { selectStories } from '@/shared/store/features/stories/stories';
import { IStory } from '@/shared/types/api';
import { FirstParam } from '@/shared/types/util';
import S from './AddStoryParams.module.scss';

export type ToggleFunction = (value: boolean) => void;

export type IAddStoryParamsForm = {
  includeExtraSets: boolean;
  includeReturnSets: boolean;
  includeScenarios: boolean;
  includeEncounterSize: boolean;
  includeCampaignIcon: boolean;
  includeScenarioEncounterSet: boolean;
  includeScenarioSize: boolean;
  includeCampaign: boolean;
  includeEncounters: boolean;
};

export type AddStoryParamsProps = {
  story: IStory;
  defaultValue: IAddStoryParamsForm;
  onChange: (form: IAddStoryParamsForm) => void;
};

export const AddStoryParams = ({ story, defaultValue, onChange }: AddStoryParamsProps) => {
  const { t } = useTranslation();

  const encounterSets = useAppSelector(selectEncounterSets);
  const stories = useAppSelector(selectStories);
  const { campaignOptions } = useAppSelector(selectLayout);

  const [form, setForm] = useState(defaultValue);

  const haveExtraDividers = story.extra_encounter_sets.length > 0;

  const returnStories = stories.filter(safePropEq(story.code, 'return_to_code'));
  const haveReturnCycle = returnStories.length > 0;

  const onToggle = createToggleHanlder(form, (form) => {
    setForm(form);
    onChange(form);
  });

  const check = (prop: FirstParam<typeof onToggle>) => ({
    ...onToggle(prop),
    labelClassName: S.label,
  });

  const includeEncounterSize = isNil(campaignOptions?.includeEncounterSize);
  const includeScenarioSize = form.includeScenarios && isNil(campaignOptions?.includeScenarioSize);

  const showSize = story.is_size_supported && (includeEncounterSize || includeScenarioSize);

  const showAdditional = haveExtraDividers || showSize;

  const encountersCountOptions = {
    encounterSets,
    story,
    includeScenarioEncounterSet: form.includeScenarioEncounterSet,
  };

  const encountersCount = getRequiredEncounterDividersIcons({
    encounterSets,
    story,
    includeScenarioEncounterSet: form.includeScenarioEncounterSet,
  }).length;

  const extraCount = getExtraEncounterDividersIcons(encountersCountOptions).length;
  const scenariosCount = getScenarioDividerIcons(story).length;
  const campaignsCount = getCampaignDividersCount(story);

  return (
    <div className={S.container}>
      <Col>
        <Row wrap className={S.controls}>
          <div className={S.checkboxGroup}>
            <h3 className={S.title}>{t('Campaign')}</h3>
            <Col wrap className={S.checks}>
              <Checkbox {...check('includeEncounters')}>
                {t('Encounter Dividers')} ({encountersCount})
              </Checkbox>
              {campaignOptions?.includeCampaign !== false && (
                <>
                  <Checkbox {...check('includeCampaign')}>
                    {t('Campaign Divider')} ({campaignsCount})
                  </Checkbox>
                  {isNil(campaignOptions?.includeCampaignIcon) && (
                    <Checkbox {...check('includeCampaignIcon')}>{t('Campaign Icon')}</Checkbox>
                  )}
                </>
              )}
            </Col>
          </div>
          <div className={S.checkboxGroup}>
            <h3 className={S.title}>{t('Scenario')}</h3>
            <Col wrap className={S.checks}>
              <Checkbox {...check('includeScenarios')}>
                {t('Scenario Dividers')} ({scenariosCount})
              </Checkbox>
              <Checkbox {...check('includeScenarioEncounterSet')}>
                {t('Scenario Encounter Divider')} ({scenariosCount})
              </Checkbox>
            </Col>
          </div>
          {showAdditional && (
            <div className={S.checkboxGroup}>
              <h3 className={S.title}>{t('Additional')}</h3>
              <Col wrap className={S.checks}>
                {haveExtraDividers && (
                  <Checkbox {...check('includeExtraSets')}>
                    {t('Extra Dividers')} ({extraCount})
                  </Checkbox>
                )}
                {showSize && (
                  <>
                    {includeEncounterSize && (
                      <Checkbox {...check('includeEncounterSize')}>{t('Encounter Size')}</Checkbox>
                    )}
                    {includeScenarioSize && (
                      <Checkbox {...check('includeScenarioSize')}>{t('Scenario Size')}</Checkbox>
                    )}
                  </>
                )}
              </Col>
            </div>
          )}
        </Row>
        {haveReturnCycle && (
          <Row>
            <Checkbox {...check('includeReturnSets')} labelClassName={S.returnLabel}>
              <span className={S.label}>{t('Include Return Set:')}</span>

              <span className={S.returnStories}>
                {returnStories.map(({ code, name, is_official }) => (
                  <span className={S.return} key={code}>
                    {t(name)} {is_official && <Icon icon='ffg' className={S.official} />}
                  </span>
                ))}
              </span>
            </Checkbox>
          </Row>
        )}
      </Col>
    </div>
  );
};
