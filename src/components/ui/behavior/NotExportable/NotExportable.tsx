import classNames from 'classnames';
import S from './NotExportable.module.scss';

import { PropsWithChildren } from 'react';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectExport } from '@/shared/store/features/app/app';

export type NotExportableProps = PropsWithChildren & {
  printable?: boolean;
};

export const NotExportable = ({ children, printable = true }: NotExportableProps) => {
  const isExport = useAppSelector(selectExport);

  const className = classNames(S.container, !printable && S.notPrintable);

  return <div className={className}>{!isExport && children}</div>;
};
