import { PropsWithClassName } from '@/types/util';
import S from './Popup.module.scss';
import classNames from 'classnames';
import { PropsWithChildren } from 'react';

export type PopupProps = PropsWithClassName & PropsWithChildren & {
  show?: boolean
  contentClassName?: string
}

export const Popup = ({
  children,
  show = false,
  className,
  contentClassName
}: PopupProps) => {
  return (
    <>
      {show && (
        <div className={classNames(S.container, className)}>
          <div className={classNames(S.content, contentClassName)}>
            {children}
          </div>
        </div>
      )}
    </>
  );
}