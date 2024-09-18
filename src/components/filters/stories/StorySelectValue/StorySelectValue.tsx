import { PropsWithChildren } from 'react';
import S from './StorySelectValue.module.scss';
import classNames from 'classnames';
import { IStory } from '@/types/api';
import { Icon } from '@/components';

export type StorySelectValueProps = PropsWithChildren & {
  story: IStory
  isSelected?: boolean
}

export const StorySelectValue = ({ 
  story,
  isSelected = false,
  children
}: StorySelectValueProps) => {
  const { is_official, icon } = story;
  const containerClassNames = classNames(
    S.container, 
    isSelected && S.selected
  );
  return (
    <div className={containerClassNames}>
      {icon && <Icon icon={icon} className={S.icon}/>}
      <div className={S.optionLabel}>{children}</div>
      {is_official && <Icon icon={'ffg'} className={classNames(S.icon, S.official)}/>}
    </div>
  );
}