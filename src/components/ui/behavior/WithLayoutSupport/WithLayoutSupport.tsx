import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components';
// import S from './WithLayoutSupport.module.scss';
import { useLayoutSupport } from '@/shared/lib/hooks/stories/useLayoutSupport';

export type WithLayoutSupportProps = PropsWithChildren & {
  fallback?: boolean;
};

export const WithLayoutSupport = ({ children, fallback }: WithLayoutSupportProps) => {
  const { t } = useTranslation();
  const supported = useLayoutSupport();
  return (
    <>
      {supported && children}
      {!supported && fallback && <Container>{t('Campaign is not supported')}</Container>}
    </>
  );
};
