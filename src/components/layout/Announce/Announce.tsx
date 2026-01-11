import { useTranslation } from 'react-i18next';
import S from './Announce.module.scss';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectLanguage } from '@/shared/store/features/language/language';
import { Row } from '@/components/ui/grid/Row/Row';
import { NotExportable } from '@/components/ui/behavior/NotExportable/NotExportable';
import { Col } from '@/components/ui/grid/Col/Col';
import classNames from 'classnames';

export const Announce = () => {
  const { t } = useTranslation();

  return (
    <div className={S.container}>
      <NotExportable>
        <Row className={classNames(S.announce, S.investigator)} wrap>
          <Col className={S.investigatorHeader}>
            <div className={S.investigatorDescription}>{t('My new project')}</div>
            <div className={S.investigatorTitle}>{t('Digital Investigator Board')}</div>
          </Col>
          <Row className={S.download}>
            <a
              href='https://play.google.com/store/apps/details?id=com.arkhaminvestigator'
              target='_blank'
              rel='noopener noreferrer'
            >
              <img src={'/images/ai.android.svg'} alt='Arkham Investigator Board' height={30} />
            </a>
            <Col className={S.ios}>
              <a
                href='https://apps.apple.com/us/app/ah-investigator/id6753330970'
                target='_blank'
                rel='noopener noreferrer'
              >
                <img src={'/images/ai.ios.svg'} alt='Arkham Investigator Board' height={30} />
              </a>
              <a className={S.unlock} href='https://www.patreon.com/posts/how-to-unlock-on-142409401'>
                {t('iOS Unlock')}
              </a>
            </Col>
          </Row>
        </Row>
        <ArkhamCardsRuAnnounce />
      </NotExportable>
    </div>
  );
};

const ArkhamCardsRuAnnounce = () => {
  const language = useAppSelector(selectLanguage);

  if (language !== 'ru') {
    return null;
  }

  return (
    <p className={S.announce}>
      ⚠️ Сообщество собирает средства на озвучку художественного текста в кампаниях и сценариях.{' '}
      <br />
      <br />
      Сбор на озвучку (Если возникают трудности с нижеперечисленными способами обращайтесь к{' '}
      <a className={S.link} href='https://t.me/Aahz7' target='_blank' rel='noopener noreferrer'>
        @Aahz7
      </a>
      ): <br />
      <ul>
        <li>По номеру телефона (+7 994 432 22 14)</li>
        <li>
          <a
            className={S.link}
            href='https://messenger.online.sberbank.ru/sl/rgONgm2VJesBMZNMh'
            target='_blank'
            rel='noopener noreferrer'
          >
            Сбер
          </a>
        </li>
        <li>
          <a
            className={S.link}
            href='https://boosty.to/arkhamhorror_thecardgame/single-payment/donation/367040/target?share=target_linkhttps://boosty.to/arkhamhorror_thecardgame/single-payment/donation/367040/target?share=target_link'
            target='_blank'
            rel='noopener noreferrer'
          >
            Бусти
          </a>{' '}
          (комиссия до 12%)
        </li>
      </ul>
    </p>
  );
};
