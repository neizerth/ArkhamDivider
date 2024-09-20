import { Container, StorySelect, AddStoryParams, Col, Row, Button, Icon, StoryCustomContent } from '@/components';
import S from './AddStoryDividers.module.scss';
import { selectStories } from '@/store/features/stories/stories';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useState } from 'react';
import { IStory } from '@/types/api';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addStoryDividers as addDividers } from '@/store/features/addDividersForm/addDividersForm';
import { removeAllDividers } from '@/store/features/dividers/dividers';
import { ButtonType } from '@/types/ui';
import { useTranslation } from 'react-i18next';

export type AddStoryDividersProps = {

}

export const AddStoryDividers = ({}: AddStoryDividersProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [story, setCurrentStory] = useState<IStory | null>(null);

  const onAdd = () => {
    if (!story) {
      return;
    }
    dispatch(addDividers(story));
  };

  const onGenerate = () => {
    onClear();
    onAdd();
  }

  const onClear = () => dispatch(removeAllDividers());

  const stories = useAppSelector(selectStories);
  
  const addStoryDividers = (story: IStory) => {
    setCurrentStory(story);
  }

  return (
    <div className={S.container}>
      <Container>
        <Col className={S.col}>
          <div className={S.row}>
            <Row>
              <StorySelect 
                className={S.select}
                stories={stories} 
                onChange={addStoryDividers}
                value={story}
              />
              {story && (
                <>
                  <Button onClick={onGenerate} className={S.generate}>
                    <Icon icon='check-thin'/> {t('Generate')}
                  </Button>
                  <Button onClick={onAdd} className={S.add}>
                    <Icon icon='plus-thin'/> {t('Add')}
                  </Button>
                  <Button 
                    onClick={onClear} 
                    className={S.add}
                    buttonType={ButtonType.DANGER}
                  >
                    <Icon icon='trash'/> {t('Clear')}
                  </Button>
                </>
              )}
            </Row>
          </div>
          {story && (
            <div>
              <AddStoryParams 
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