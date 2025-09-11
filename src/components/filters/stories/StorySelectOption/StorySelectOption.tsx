import { components, OptionProps } from 'react-select';
import { StorySelectValue } from '@/components';
import { IStory } from '@/shared/types/api';

export type StorySelectOptionProps = OptionProps<{
  label: string;
  value: IStory;
}>;

export const StorySelectOption = (props: StorySelectOptionProps) => {
  const { children, data, isSelected } = props;
  return (
    <components.Option {...props}>
      <StorySelectValue story={data.value} isSelected={isSelected}>
        {children}
      </StorySelectValue>
    </components.Option>
  );
};
