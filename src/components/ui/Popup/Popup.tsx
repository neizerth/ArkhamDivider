import classNames from 'classnames';
import { PropsWithChildren, useRef } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useOnClickOutside } from '@/shared/lib/hooks/useOnClickOutside';
import { clearActivePopupId } from '@/shared/store/features/app/app';
import { PropsWithClassName } from '@/shared/types/util';
import S from './Popup.module.scss';

export type PopupProps = PropsWithClassName &
  PropsWithChildren & {
    show?: boolean;
    contentClassName?: string;
    scrollable?: boolean;
  };

export const Popup = ({
  children,
  show = false,
  scrollable = true,
  className,
  contentClassName,
}: PopupProps) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const close = () => dispatch(clearActivePopupId());

  useOnClickOutside(ref, close);

  return (
    <>
      {show && (
        <div className={classNames(S.container, className)}>
          <div className={classNames(S.content, contentClassName)} ref={ref}>
            <div className={S.close} onClick={close}>
              &times;
            </div>
            <div className={classNames(S.wrapper, scrollable && S.scrollable)}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
