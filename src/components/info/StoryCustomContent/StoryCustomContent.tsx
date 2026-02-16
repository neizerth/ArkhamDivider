import classNames from 'classnames';
import { prop } from 'ramda';
import { useTranslation } from 'react-i18next';
import { Col, LanguageFlag } from '@/components';
import { Panel } from '@/components/ui/Panel/Panel';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectLanguage, selectTranslatedStories } from '@/shared/store/features/language/language';
import { ICustomContent } from '@/shared/types/api';
import { PropsWithClassName } from '@/shared/types/util';
import S from './StoryCustomContent.module.scss';
import { selectStory } from '@/shared/store/features/dividers/dividers';

export type StoryCustomContentProps = PropsWithClassName & {
  content: ICustomContent;
};

export const StoryCustomContent = ({ content, className }: StoryCustomContentProps) => {
  const { t } = useTranslation();
  const story = useAppSelector(selectStory);
  const language = useAppSelector(selectLanguage);
  const translatedStoriesMapping = useAppSelector(selectTranslatedStories);
  const translatedStories = translatedStoriesMapping[language] || [];

  const { creators, download_links } = content;
  const creator = creators.map(prop('name')).join(', ');
  const custom = { creator };

  const isTranslated =
    (story?.code && translatedStories.includes(story.code)) ||
    download_links.find((link) => language === link.language) !== undefined;

  return (
    <Col className={classNames(S.container, className)}>
      <div className={S.author}>{t('Fan-made scenario by {{custom.creator}}', { custom })}</div>
      {!isTranslated && (
        <Panel type='warning'>
          Please, help me with the content translation to your language <br />
          Contact me using one of the links at the bottom of the page
        </Panel>
      )}
      <div className={S.download}>
        <div>{t('Download print and play cards')}:</div>
        <div className={S.links}>
          {download_links.map(({ links, language }) => (
            <div key={language}>
              {links.map((item, key) => (
                <div key={key} className={S.item}>
                  <a className={S.link} href={item.link} title={item.name} target='_blank'>
                    <LanguageFlag className={S.flag} language={language} />
                    {item.name && `(${item.name})`}
                  </a>
                  {item.translated_by && (
                    <div className={S.translatedBy}>
                      <div className={S.translatedByContainer}>
                        <div className={S.translatedByTitle}>{t('Translated by')}</div>
                        <div className={S.translatedByUsers}>
                          {item.translated_by.map((user) => (
                            <a
                              key={user.name}
                              className={S.user}
                              href={user.link}
                              title={user.kind || user.name}
                              target='_blank'
                              rel='nofollow'
                            >
                              {user.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </Col>
  );
};
