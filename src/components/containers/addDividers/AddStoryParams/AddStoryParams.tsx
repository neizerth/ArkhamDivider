import { IStory } from '@/types/api';
import S from './AddStoryParams.module.scss';
import { Checkbox, Col, Icon, Row } from '@/components';
import { selectStories } from '@/store/features/stories/stories';
import { useAppSelector } from '@/hooks/useAppSelector';
import { safePropEq } from '@/util/criteria';
import { selectDividerFormConfig, setDividerFormConfig } from '@/store/features/addDividersForm/addDividersForm';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { createToggleHanlder } from '@/util/forms';
// import { onlyWithScenarioEncounters } from '@/store/features/stories/criteria';
import { useTranslation } from 'react-i18next';

export type ToggleFunction = (value: boolean) => void;

export type AddStoryParamsProps = {
  story: IStory
}

export const AddStoryParams = ({ 
  story, 
}: AddStoryParamsProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  
  const stories = useAppSelector(selectStories);
  const form = useAppSelector(selectDividerFormConfig);

  const haveExtraDividers = story.extra_encounter_sets.length > 0;

  const returnStories = stories.filter(safePropEq(story.code, 'return_to_code'));
  const haveReturnCycle = returnStories.length > 0;
  // const onlyScenario = onlyWithScenarioEncounters(story);
  // console.log(story);
  // onlyWithScenarioEncounters(story); 

  const check = createToggleHanlder(
    form, 
    data => dispatch(setDividerFormConfig(data))
  );

  return (
    <div className={S.container}>
      <Col>
        <Row wrap>
          {haveExtraDividers && (
            <Checkbox {...check('includeExtraSets')}>
              {t('Extra Dividers')}
            </Checkbox>
          )}
          <Checkbox {...check('includeScenarios')}>
            {t('Scenario Dividers')}
          </Checkbox>
          <Checkbox {...check('includeScenarioEncounterSet')}>
            {t('Scenario Encounter Divider')}
          </Checkbox>
          {story.is_size_supported && (
            <>
              <Checkbox {...check('includeEncounterSize')}>
                {t('Encounter Size')}
              </Checkbox>
              {form.includeScenarios && (
                <Checkbox {...check('includeScenarioSize')}>
                 {t('Scenario Size')}
                </Checkbox>
              )}
             
            </>
          )}
          <Checkbox {...check('includeCampaignIcon')}>
            {t('Campaign Icon')}
          </Checkbox>
        </Row>
        {haveReturnCycle && (
          <Row>
            <Checkbox 
              {...check('includeReturnSets')}
              labelClassName={S.returnLabel}
            >
              <span className={S.label}>{t('Include Return Set:')}</span>

              <span className={S.returnStories}>
                {returnStories.map(({ code, name, is_official }) => (
                  <span className={S.return} key={code}>
                    {t(name)} {is_official && <Icon icon='ffg' className={S.official}/>}
                  </span>
                ))}
              </span>
            </Checkbox>
          
          </Row>
        )}
      </Col>
    </div>
  );
}