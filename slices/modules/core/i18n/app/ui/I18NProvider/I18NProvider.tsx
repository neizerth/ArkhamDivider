import { I18nextProvider } from 'react-i18next';
import { i18n } from '../../../shared/config';
import type { PropsWithChildren } from 'react';


export function I18NProvider({ children }: PropsWithChildren) {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}