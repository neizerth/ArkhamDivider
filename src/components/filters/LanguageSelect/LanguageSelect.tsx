import { useAppSelector } from '@/hooks/useAppSelector';
import S from './LanguageSelect.module.scss';
import { changeLanguage, selectAvailableLanguages, selectLanguage } from '@/store/features/language/language';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import Select, { OptionProps, SingleValueProps, components } from 'react-select';
import { LanguageFlag } from '@/components/ui/LanguageFlag/LanguageFlag';

export const LanguageSelectSingleValue = (props: SingleValueProps<{
  label: string,
  value: string
}>) => {
  const { value } = props.data;
  return (
    <components.SingleValue {...props}>
      <LanguageFlag language={value}/>
    </components.SingleValue>
  )
}

export const LanguageSelectOption = (props: OptionProps<{
  label: string,
  value: string
}>) => {
  const { value } = props.data;
  return (
    <components.Option {...props}>
      <LanguageFlag language={value}/>
    </components.Option>
  )
}

export const LanguageSelect = () => {
  const { i18n } = useTranslation();
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

  const components = {
    Option: LanguageSelectOption,
    SingleValue: LanguageSelectSingleValue
  }

  return (
    <Select 
      className={S.container} 
      options={options} 
      value={languageValue} 
      components={components}
      isMulti={false}
      onChange={item => item && changeCurrentLanguage(item.value)}
    />
  );
}