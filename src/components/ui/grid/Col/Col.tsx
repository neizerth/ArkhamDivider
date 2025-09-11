import classNames from 'classnames';
import { Row } from '@/components';
import { RowProps } from '../Row/Row';
import S from './Col.module.scss';

export type ColProps = RowProps;

export const Col = ({ children, className, ...props }: ColProps) => {
  return (
    <Row className={classNames(S.container, className)} {...props}>
      {children}
    </Row>
  );
};
