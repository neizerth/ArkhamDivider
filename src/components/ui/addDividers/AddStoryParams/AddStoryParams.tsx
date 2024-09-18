import { IStory } from '@/types/api';
import S from './AddStoryParams.module.scss';
import { Checkbox, Col, Icon, Row } from '@/components';
import { selectStories } from '@/store/features/stories/stories';
import { prop } from 'ramda';
import { useAppSelector } from '@/hooks/useAppSelector';
import { safePropEq } from '@/util/criteria';
import { MouseEventHandler } from 'react';

export type ToggleFunction = (value: boolean) => void;

export type AddStoryParamsProps = {
  story: IStory
  onChangeIncludeExtra: ToggleFunction
  onChangeIncludeReturnSet: ToggleFunction
  onChangeIncludeScenarios: ToggleFunction
}

export const AddStoryParams = ({ 
  story, 
  onChangeIncludeExtra,
  onChangeIncludeReturnSet,
  onChangeIncludeScenarios
}: AddStoryParamsProps) => {
  const stories = useAppSelector(selectStories);

  const haveExtraDividers = story.extra_encounter_sets.length > 0;

  const returnStories = stories.filter(safePropEq(story.code, 'return_to_code'));
  const haveReturnCycle = returnStories.length > 0;
  
  const createToggleHanlder = (onToggle: ToggleFunction): MouseEventHandler => 
    e => {
      const { checked } = e.target as HTMLInputElement;
      onToggle(checked);
    }

  return (
    <div className={S.container}>
      <Col>
        <Row>
          {haveExtraDividers && (
            <Checkbox 
              onClick={createToggleHanlder(onChangeIncludeExtra)}
            >
              <span className={S.label}>Extra</span>
            </Checkbox>
          )}
          <Checkbox 
            onClick={createToggleHanlder(onChangeIncludeScenarios)}
          >
            <span className={S.label}>Scenarios</span>
          </Checkbox>
        </Row>
        {haveReturnCycle && (
          <Row>
            <Checkbox 
              onClick={createToggleHanlder(onChangeIncludeReturnSet)}
            >
              <span className={S.label}>Include Return Set:</span>

              <span className={S.returnStories}>
                {returnStories.map(({ code, name, is_official }) => (
                  <span className={S.return} key={code}>
                    {name} {is_official && <Icon icon='ffg'/>}
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