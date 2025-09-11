import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import S from './Panel.module.scss';

export type PanelProps = PropsWithChildren & {
  type?: 'info' | 'warning' | 'normal' | 'error';
};

export const Panel = ({ children, type = 'normal' }: PanelProps) => {
  return <div className={classNames(S.container, S[type])}>{children}</div>;
};
