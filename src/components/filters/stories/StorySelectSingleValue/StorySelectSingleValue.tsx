import { SingleValueProps, components } from 'react-select';

import { StorySelectValue } from '../StorySelectValue/StorySelectValue';
import { IStory } from '@/types/api';

export type StorySelectSingleValueProps = SingleValueProps<{
  label: string,
  isTranslated: boolean
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
        isTranslated={data.isTranslated}
      >
        {children}
      </StorySelectValue>
    </components.SingleValue>
  );
}