import { IStory } from '@/types/api';
import S from './AddStoryParams.module.scss';
import { Checkbox, Col, Icon, Row } from '@/components';
import { selectStories } from '@/store/features/stories/stories';
import { useAppSelector } from '@/hooks/useAppSelector';
import { safePropEq } from '@/util/criteria';
import { selectDividerFormConfig, setDividerFormConfig } from '@/store/features/addDividersForm/addDividersForm';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { createToggleHanlder } from '@/util/forms';
import { onlyWithScenarioEncounters } from '@/store/features/stories/criteria';
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
  const onlyScenario = onlyWithScenarioEncounters(story);
  // console.log(story);
  // onlyWithScenarioEncounters(story); 

  const onToggle = createToggleHanlder(
    form, 
    data => dispatch(setDividerFormConfig(data))
  );

  return (
    <div className={S.container}>
      <Col>
        <Row>
          {haveExtraDividers && (
            <Checkbox 
              checked={form.includeExtraSets}
              onChange={onToggle('includeExtraSets')}
            >
              Extra
            </Checkbox>
          )}
          {!onlyScenario && (
            <Checkbox 
              checked={form.includeScenarios}
              onChange={onToggle('includeScenarios')}
            >
              Scenarios
            </Checkbox>
          )}
          <Checkbox 
            checked={form.includeScenarioEncounterSet}
            onChange={onToggle('includeScenarioEncounterSet')}
          >
            Scenario Encounter
          </Checkbox>
          {story.is_size_supported && (
            <>
              <Checkbox 
                checked={form.includeEncounterSize}
                onChange={onToggle('includeEncounterSize')}
              >
                Encounter Size
              </Checkbox>
              <Checkbox 
                checked={form.includeScenarioSize}
                onChange={onToggle('includeScenarioSize')}
              >
                Scenario Size
              </Checkbox>
            </>
          )}
          <Checkbox 
            checked={form.includeCampaignIcon}
            onChange={onToggle('includeCampaignIcon')}
          >
            Campaign Icon
          </Checkbox>
        </Row>
        {haveReturnCycle && (
          <Row>
            <Checkbox 
              checked={form.includeReturnSets}
              labelClassName={S.returnLabel}
              onChange={onToggle('includeReturnSets')}
            >
              <span className={S.label}>Include Return Set:</span>

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