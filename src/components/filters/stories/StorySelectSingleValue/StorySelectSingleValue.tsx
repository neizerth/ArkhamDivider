import { SingleValueProps, components } from 'react-select';

import { StorySelectValue } from '../StorySelectValue/StorySelectValue';
import { IStory } from '@/shared/types/api';

export type StorySelectSingleValueProps = SingleValueProps<{
  label: string,
  value: IStory
}>

export const StorySelectSingleValue = ({ 
  children,
  ...props
}: StorySelectSingleValueProps) => {
  const { data } = props;
  return (
    <components.SingleValue {...props}>
      <StorySelectValue 
        story={data.value}
      >
        {children}
      </StorySelectValue>
    </components.SingleValue>
  );
}