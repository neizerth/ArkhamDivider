import { SingleValueProps, components } from 'react-select';

import { StorySelectValue } from '../StorySelectValue/StorySelectValue';
import { IStory } from '@/types/api';

export type StorySelectSingleValueProps = SingleValueProps<{
  label: string,
  value: IStory
}>

export const StorySelectSingleValue = ({ 
  children, 
  ...props
}: StorySelectSingleValueProps) => {
  const story = props.data.value;
  return (
    <components.SingleValue {...props}>
      <StorySelectValue story={story}>
        {children}
      </StorySelectValue>
    </components.SingleValue>
  );
}