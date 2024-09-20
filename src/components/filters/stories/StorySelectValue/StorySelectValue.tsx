import { PropsWithChildren } from 'react';
import S from './StorySelectValue.module.scss';
import classNames from 'classnames';
import { IStory } from '@/types/api';
import { Icon } from '@/components';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLanguage, selectTranslatedStories } from '@/store/features/language/language';

export type StorySelectValueProps = PropsWithChildren & {
  story: IStory
  isSelected?: boolean
}

export const StorySelectValue = ({ 
  story,
  isSelected = false,
  children
}: StorySelectValueProps) => {
  const language = useAppSelector(selectLanguage);
  const translated = useAppSelector(selectTranslatedStories);
  const translatedStories = translated[language] || [];

  const { is_official, icon } = story;
  const isTranslated = translatedStories.includes(story.code);

  const containerClassNames = classNames(
    S.container, 
    isSelected && S.selected
  );
  return (
    <div className={containerClassNames}>
      {icon && <Icon icon={icon} className={S.icon}/>}
      <div className={S.optionLabel}>{children}</div>
      <div className={S.icons}>
        {language !== 'en' && !isTranslated && <Icon icon={'en'}/>}
        {is_official && <Icon icon={'ffg'} className={classNames(S.icon, S.official)}/>}
      </div>
    </div>
  );
}