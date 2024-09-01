import { useAppSelector } from '@/hooks/useAppSelector';
import S from './LanguageSelect.module.scss';
import { changeLanguage, selectAvailableLanguages, selectLanguage } from '@/store/features/language/language';
import { useTranslation } from 'react-i18next';
import { ReactEventHandler } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import Select from 'react-select';

export type LanguageSelectProps = {

}

export const LanguageSelect = ({}: LanguageSelectProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const availableLanguages = useAppSelector(selectAvailableLanguages);
  const language = useAppSelector(selectLanguage);
  
  // console.log({ availableLanguages })

  const changeCurrentLanguage = (value: string) => {
    dispatch(changeLanguage(value));
  }

  const options = availableLanguages.map(value => ({
    value,
    label: value
  }));

  const languageValue = {
    value: language,
    label: language
  }

  return (
    <label className={S.container}>
      {t('Language')}
      <Select options={options} value={languageValue} onChange={item => item && changeCurrentLanguage(item.value)}/>
    </label>
  );
}