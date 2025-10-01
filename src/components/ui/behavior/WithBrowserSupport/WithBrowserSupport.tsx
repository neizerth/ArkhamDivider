import { detect } from 'detect-browser';
import { PropsWithChildren } from 'react';
import { Icon } from '../../icons/Icon/Icon';
import S from './WithBrowserSupport.module.scss';

export type WithBrowserSupportProps = PropsWithChildren;

export const WithBrowserSupport = ({ children }: WithBrowserSupportProps) => {
  const browser = detect();
  const notSupported = ['safari'].includes(browser?.name || '');
  return (
    <>
      {notSupported && (
        <div className={S.container}>
          <div>This browser is not supported.</div>
        </div>
      )}
      {!notSupported && children}
    </>
  );
};
