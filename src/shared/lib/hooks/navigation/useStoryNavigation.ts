import { propEq } from 'ramda';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { selectLoading } from '@/shared/store/features/app/app';
import { selectStory, setStory } from '@/shared/store/features/dividers/dividers';
import { selectStories } from '@/shared/store/features/stories/stories';
import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';

export const useStoryNavigation = () => {
  const { storyId } = useParams();
  const dispatch = useAppDispatch();
  const currentStory = useAppSelector(selectStory);
  const loading = useAppSelector(selectLoading);
  const stories = useAppSelector(selectStories);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (storyId === currentStory?.code) {
      return;
    }
    if (!storyId) {
      dispatch(setStory(null));
      return;
    }

    const story = stories.find(propEq(storyId, 'code'));

    if (!story) {
      return;
    }

    dispatch(setStory(story));
  }, [storyId, loading, currentStory?.code, dispatch, stories.find]);
};
