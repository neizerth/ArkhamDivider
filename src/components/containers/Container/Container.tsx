import classNames from 'classnames';
import { PropsWithChildren } from 'react';
import { PropsWithClassName } from '@/shared/types/util';
import S from './Container.module.scss';

export type ContainerProps = PropsWithClassName & PropsWithChildren;

export const Container = ({ className, ...props }: ContainerProps) => {
  const classes = classNames(S.container, className);

  return <div className={classes} {...props} />;
};
