import { PropsWithChildren } from 'react';
import S from './StorySelectValue.module.scss';
import classNames from 'classnames';
import { IStory } from '@/types/api';
import { Icon } from '@/components';

export type StorySelectValueProps = PropsWithChildren & {
  story: IStory
  isSelected?: boolean,
  isTranslated?: boolean
}

export const StorySelectValue = ({ 
  story,
  isSelected = false,
  isTranslated = false,
  children
}: StorySelectValueProps) => {
  const { 
    is_official, 
    icon, 
    supported = true
  } = story;

  const containerClassNames = classNames(
    S.container, 
    isSelected && S.selected
  );
  return (
    <div className={containerClassNames}>
      {icon && (
        <div className={S.icon}>
          <Icon icon={icon} className={S.icon}/>
        </div>
      )}
      <div className={S.optionLabel}>{children}</div>
      <div className={S.icons}>
        {!isTranslated && <Icon icon={'en'}/>}
        {is_official && (
          <Icon icon={'ffg'} className={classNames(S.icon, S.official)}/>
        )}
        {!supported && (
          <div className={classNames(S.icon, S.notSupported)}>
            <Icon icon={'blocked'}/>
          </div>
        )}
      </div>
    </div>
  );
}