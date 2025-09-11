import { PropsWithChildren } from 'react';
import { PropsWithClassName } from '@/shared/types/util';
// import S from './List.module.scss';
import { Row } from '../Row/Row';

export type ListProps = PropsWithChildren & PropsWithClassName;

export const List = ({ ...props }: ListProps) => {
  return <Row wrap {...props} />;
};
