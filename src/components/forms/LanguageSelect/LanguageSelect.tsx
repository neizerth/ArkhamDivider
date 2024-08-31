import { useAppSelector } from '@/hooks/useAppSelector';
import S from './LanguageSelect.module.scss';
import { changeLanguage, selectAvailableLanguages, selectLanguage } from '@/store/features/language/language';
import { useTranslation } from 'react-i18next';
import { ReactEventHandler } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';

export type LanguageSelectProps = {

}

export const LanguageSelect = ({}: LanguageSelectProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const availableLanguages = useAppSelector(selectAvailableLanguages);
  const language = useAppSelector(selectLanguage);
  
  // console.log({ availableLanguages })

  const changeCurrentLanguage: ReactEventHandler = (e) => {
    const target = e.target as HTMLSelectElement;

    dispatch(changeLanguage(target.value));
  }

  return (
    <label className={S.container} onChange={changeCurrentLanguage}>
      {t('Language')}
      <select value={language}>
        {availableLanguages.map(availableLanguage => (
          <option key={availableLanguage}>{availableLanguage}</option>
        ))}
      </select>
    </label>
  );
}