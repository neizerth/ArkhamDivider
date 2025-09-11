// import S from './NotExportable.module.scss';

import { PropsWithChildren } from 'react';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectExport } from '@/shared/store/features/app/app';

export const NotExportable = ({ children }: PropsWithChildren) => {
  const isExport = useAppSelector(selectExport);
  return <>{!isExport && children}</>;
};
