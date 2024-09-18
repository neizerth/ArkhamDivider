import { Container, StorySelect } from '@/components';
import S from './AddCampaign.module.scss';
import { selectStories } from '@/store/features/stories/stories';
import { useAppSelector } from '@/hooks/useAppSelector';

export type AddCampaignProps = {

}

export const AddCampaign = ({}: AddCampaignProps) => {

  const stories = useAppSelector(selectStories);

  return (
    <div>
      <Container>
        <StorySelect stories={stories}/>
      </Container>
    </div>
  );
}