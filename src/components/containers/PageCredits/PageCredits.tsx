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
const GITHUB_LINK = import.meta.env.VITE_GITHUB_LINK;

export const PageCreditsGlobal = ({ 
  link,
  authorLink 
}: {
  link: string,
  authorLink: string
}) => (
  <Row className={S.row} gap={false}>
    <QRCodeSVG value={PAYPAL_LINK} className={S.qr}/>
    <div>
      <span className={S.symbol}><Icon icon='free' className={classNames(S.icon, S.freeIcon)}/>:</span>
      Spend as many resources as you want&nbsp;to&nbsp;<a href={link} target='_blank'>{link}</a><br/>
      Remember that <i><a href={authorLink} target='_blank' className={S.author}>Author</a> is grateful to you</i>
    </div>
  </Row>
)

export const PageCreditsRU = ({ 
  link,
  globalLink,
  authorLink 
}: {
  link?: string,
  globalLink: string
  authorLink: string
}) => (
  <Row className={S.row} gap={false}>
    <QRCodeSVG value={T_LINK} className={S.qr}/>
    <div>
      <span className={S.symbol}><Icon icon='free' className={classNames(S.icon, S.freeIcon)}/>:</span>
      Вы можете потратить любое число ресурсов на&nbsp;
      <a href={link} target='_blank'>{link}</a>

      {globalLink &&(
        <>
          {' '}или&nbsp;<a href={globalLink} target='_blank'>{globalLink}</a>
        </>
      )}
      
      Запомните, что <i><a href={authorLink} className={S.author}>Автор</a> вам благодарен</i>
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