import * as Flags from 'country-flag-icons/react/3x2'
import { PropsWithClassName } from '@/types/util';
import languageMapping from './languageMapping.json';
import S from './LanguageFlag.module.scss';
import { propEq } from 'ramda';
import classNames from 'classnames';
import { CHINA_LANGUAGES } from '@/constants/i18n';

export type LanguageFlagProps = PropsWithClassName & {
  imageClassName?: string
  altClassName?: string
  language: string;
}

export const LanguageFlag = ({
  className,
  imageClassName,
  altClassName,
  language
}: LanguageFlagProps) => {
  const isChina = CHINA_LANGUAGES.includes(language);

  const mappingItem = languageMapping.find(propEq(language, 'language'));
  const country = mappingItem?.country;
  const code = country || language.toUpperCase();

  const hasFlag = code in Flags;
  const Component = Flags[code as keyof typeof Flags];

  const classList = classNames(S.image, imageClassName);
  return (
    <div className={classNames(S.container, className)} title={language}>
      {hasFlag && (
        <Component className={classList}/>
      )}
      {isChina && (
        <Flags.CN className={classList}/>
      )}
      {!hasFlag && (
        <span className={classNames(S.alt, altClassName)}>
          {language}
        </span>
      )}
    </div>
  );
}