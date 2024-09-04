import S from './PageCredits.module.scss';
import { Icon, Row } from '@/components';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';
import {QRCodeSVG} from 'qrcode.react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLanguage } from '@/store/features/language/language';

export type PageCreditsProps = PropsWithClassName & {

}

const PAYPAL_LINK = import.meta.env.VITE_PAYPAL_LINK;
const T_LINK = import.meta.env.VITE_T_LINK;

export const PageCreditsGlobal = () => (
  <Row className={S.row} gap={false}>
    <QRCodeSVG value={PAYPAL_LINK} className={S.qr}/>
    <div>
      <Icon icon='free' className={classNames(S.icon, S.freeIcon)}/>
      Spend as many resources as you want to <a href={PAYPAL_LINK} target='_blank'>{PAYPAL_LINK}</a><br/>
      Remember that <i><a href="https://github.com/neizerth">Author</a> is grateful to you</i>
    </div>
  </Row>
)

export const PageCreditsRU = () => (
  <Row className={S.row} gap={false}>
    <QRCodeSVG value={T_LINK} className={S.qr}/>
    <div>
      <Icon icon='free' className={classNames(S.icon, S.freeIcon)}/>
      Вы можете потратить любое число ресурсов на <a href={T_LINK} target='_blank'>{T_LINK}</a><br/>
      Запомните, что <i><a href="https://github.com/neizerth">Автор</a> вам благодарен</i>
    </div>
  </Row>
)

export const PageCredits = ({ className }: PageCreditsProps) => {
  const language = useAppSelector(selectLanguage);
  return (
    <div className={classNames(S.container, className)}>
      {language === 'ru' ? <PageCreditsRU/> : <PageCreditsGlobal/>}
    </div>
  );
}