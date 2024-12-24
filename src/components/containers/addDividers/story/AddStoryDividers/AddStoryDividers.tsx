import { Container, StorySelect, AddStoryParams, Col, Row, StoryCustomContent, IconButton, WithLayoutSupport } from '@/components';
import S from './AddStoryDividers.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { removeAllDividers, selectStory } from '@/store/features/dividers/dividers';
import { ButtonType } from '@/types/ui';
import { useTranslation } from 'react-i18next';
import { addStoryDividers } from '@/store/features/addDividers/addDividers';
import { withScenario } from '@/store/features/stories/criteria';
import { useCampaignStories } from '@/hooks/stories/useCampaignStories';

export type AddStoryDividersProps = {

}

export const AddStoryDividers = ({}: AddStoryDividersProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const story = useAppSelector(selectStory);

  const allStories = useCampaignStories();

  const stories = allStories.filter(withScenario);
  
  const [form, onFormChange] = useState({
    includeExtraSets: false,
    includeReturnSets: false,
    includeScenarios: true,
    includeEncounterSize: false,
    includeCampaignIcon: false,
    includeScenarioEncounterSet: false,
    includeScenarioSize: false,
    includeCampaign: true,
    includeEncounters: false
  });

  const onAdd = () => {
    if (!story) {
      return;
    }
    dispatch(addStoryDividers({
      story,
      ...form
    }));
  };

  const onGenerate = () => {
    onClear();
    onAdd();
  }

  const onClear = () => dispatch(removeAllDividers());

  return (
    <div className={S.container}>
      <Container>
        <Col className={S.col}>
          <div className={S.row}>
            <Row wrap>
              <StorySelect 
                className={S.select}
                stories={stories} 
              />
              {story && (
                <WithLayoutSupport>
                  <IconButton 
                    onClick={onGenerate} 
                    className={S.generate}
                    icon="check-thin"
                  >
                    {t('Generate')}
                  </IconButton>
                  <IconButton 
                    onClick={onAdd} 
                    className={S.add}
                    icon="plus-thin"
                  >
                    {t('Add')}
                  </IconButton>
                  <IconButton 
                    onClick={onClear} 
                    className={S.add}
                    buttonType={ButtonType.DANGER}
                    icon="trash"
                  >
                    {t('Clear')}
                  </IconButton>
                </WithLayoutSupport>
              )}
            </Row>
          </div>
          {story && (
            <WithLayoutSupport>
              <AddStoryParams 
                onChange={onFormChange}
                defaultValue={form}
                story={story}
              />
            </WithLayoutSupport>
          )}
          {story?.custom_content && (
            <div>
              <StoryCustomContent
                content={story.custom_content}
              />
            </div>
          )}
        </Col>
      </Container>
    </div>
  );
}