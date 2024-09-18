import { Container, StorySelect, AddStoryParams, Col, Row, Button } from '@/components';
import S from './AddStoryDividers.module.scss';
import { selectStories } from '@/store/features/stories/stories';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useState } from 'react';
import { IStory } from '@/types/api';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setStory } from '@/store/features/dividers/dividers';

export type AddStoryDividersProps = {

}

export const AddStoryDividers = ({}: AddStoryDividersProps) => {

  const dispatch = useAppDispatch();
  const [story, setCurrentStory] = useState<IStory | null>(null);
  const [includeExtra, setIncludeExtra] = useState(false);
  const [includeReturnSet, setIncludeReturnSet] = useState(false);
  const [includeScenarios, setIncludeScenarios] = useState(false);

  const onAdd = () => {
    if (!story) {
      return;
    }
    dispatch(setStory({
      story,
      includeExtra,
      includeReturnSet,
      includeScenarios
    }));
  };

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
              <Button onClick={onAdd}>Add</Button>
            </Row>
          </div>
          {story && (
            <div>
              <AddStoryParams 
                story={story}
                onChangeIncludeExtra={setIncludeExtra}
                onChangeIncludeReturnSet={setIncludeReturnSet}
                onChangeIncludeScenarios={setIncludeScenarios}
              />
            </div>
          )}
        </Col>
      </Container>
    </div>
  );
}