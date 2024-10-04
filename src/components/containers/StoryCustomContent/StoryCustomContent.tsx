import { ICustomContent } from '@/types/api';
import S from './StoryCustomContent.module.scss';
import { useTranslation } from 'react-i18next';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';
import { Col, LanguageFlag } from '@/components';
import { toPairs } from 'ramda';
// import { countries } from 'country-flag-icons'
// import * as flags from 'country-flag-icons/react/3x2'

export type StoryCustomContentProps = PropsWithClassName & {
  content: ICustomContent
}

export const StoryCustomContent = ({ 
  content,
  className
}: StoryCustomContentProps) => {
  const { t } = useTranslation();
  return (
    <Col className={classNames(S.container, className)}>
      <div className={S.author}>
        {t('Fan-made scenario by {{custom.creator}}', { custom: content })}
      </div>
      <div className={S.download}>
        <div>{t('Download print and play cards')}:</div>
        <div className={S.links}>
          {toPairs(content.download_link).map(([language, href]) => (
            <a 
              className={S.link} 
              href={href} 
              key={language}
              target='_blank'
            >
              <LanguageFlag className={S.flag} language={language}/>
            </a>
          ))}
        </div>
      </div>
    </Col>
  );
}