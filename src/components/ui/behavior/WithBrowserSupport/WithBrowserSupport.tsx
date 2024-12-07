import { PropsWithChildren } from 'react';
import S from './WithBrowserSupport.module.scss';
import { detect } from 'detect-browser';
import { Icon } from '../../icons/Icon/Icon';

export type WithBrowserSupportProps = PropsWithChildren;

export const WithBrowserSupport = ({
  children
}: WithBrowserSupportProps) => {
  const browser = detect();
  const notSupported = browser?.name === 'safari';
  return (
    <>
      {notSupported && (
        <div className={S.container}>
          <div className={S.icons}>
            <div className={S.cross}>
              <Icon icon={'cross_a'}/>
            </div>
            <Icon className={S.icon} icon={browser.name}/>
          </div>
        </div>
      )}
      {!notSupported && children}
    </>
  );
}