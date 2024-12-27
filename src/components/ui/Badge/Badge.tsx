import classNames from 'classnames';
import S from './Badge.module.scss';
import { PropsWithChildren } from 'react';

export type BadgeProps = PropsWithChildren & {
  size?: 'small' | 'medium' | 'large';
}

export const Badge = ({
  size = 'medium',
  children
}: BadgeProps) => {
  return (
    <div 
      className={classNames(
        S.container,
        S[size]
      )}
    >
      {children}
    </div>
  );
}