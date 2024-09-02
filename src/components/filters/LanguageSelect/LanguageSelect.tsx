import { useAppSelector } from '@/hooks/useAppSelector';
import S from './LanguageSelect.module.scss';
import { changeLanguage, selectAvailableLanguages, selectLanguage } from '@/store/features/language/language';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import Select from 'react-select';
import { Row } from '@/components'

export type LanguageSelectProps = {

}

export const LanguageSelect = ({}: LanguageSelectProps) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const availableLanguages = useAppSelector(selectAvailableLanguages);
  const language = useAppSelector(selectLanguage);
  
  // console.log({ availableLanguages })

  const changeCurrentLanguage = (value: string) => {
    i18n.changeLanguage(value);
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
      <Row>
        {t('Language')}
        
        <Select options={options} value={languageValue} onChange={item => item && changeCurrentLanguage(item.value)}/>
      </Row>
    </label>
  );
}