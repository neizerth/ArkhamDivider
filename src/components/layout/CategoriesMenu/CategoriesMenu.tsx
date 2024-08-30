import { useTranslation } from 'react-i18next';
import S from './CategoriesMenu.module.scss';

import Link from 'next/link'

export type CategoriesMenuProps = {

}

export const CategoriesMenu = ({}: CategoriesMenuProps) => {
  const { t } = useTranslation();

  return (
    <div className={S.container}>
      <Link href={'/campaigns'}>{t('Campaigns')}</Link>
      <Link href={'/investigators'}>{t('Investigators')}</Link>
      <Link href={'/player-cards'}>{t('Player Cards')}</Link>
    </div>
 );
}