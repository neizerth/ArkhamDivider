import { Container, StorySelect, AddStoryParams, Col, Row, StoryCustomContent, IconButton } from '@/components';
import S from './AddStoryDividers.module.scss';
import { selectStories } from '@/store/features/stories/stories';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useState } from 'react';
import { IStory } from '@/types/api';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { removeAllDividers } from '@/store/features/dividers/dividers';
import { ButtonType } from '@/types/ui';
import { useTranslation } from 'react-i18next';
import { addStoryDividers } from '@/store/features/addDividers/addDividers';

export type AddStoryDividersProps = {

}

export const AddStoryDividers = ({}: AddStoryDividersProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [story, setCurrentStory] = useState<IStory | null>(null);
  const [form, onFormChange] = useState({
    includeExtraSets: false,
    includeReturnSets: false,
    includeScenarios: false,
    includeEncounterSize: false,
    includeCampaignIcon: false,
    includeScenarioEncounterSet: false,
    includeScenarioSize: false
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

  const stories = useAppSelector(selectStories);

  return (
    <div className={S.container}>
      <Container>
        <Col className={S.col}>
          <div className={S.row}>
            <Row wrap>
              <StorySelect 
                className={S.select}
                stories={stories} 
                onChange={setCurrentStory}
                value={story}
              />
              {story && (
                <>
                  <IconButton 
                    onClick={onGenerate} 
                    className={S.generate}
                    icon="Icon"
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
                </>
              )}
            </Row>
          </div>
          {story && (
            <div>
              <AddStoryParams 
                onChange={onFormChange}
                defaultValue={form}
                story={story}
              />
            </div>
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