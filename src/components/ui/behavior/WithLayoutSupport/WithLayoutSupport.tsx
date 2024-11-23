import { PropsWithChildren } from 'react';
import S from './WithLayoutSupport.module.scss';
import { useLayoutSupport } from '@/hooks/stories/useLayoutSupport';
import { useTranslation } from 'react-i18next';
import { Container } from '@/components';

export type WithLayoutSupportProps = PropsWithChildren & {
  fallback?: boolean
}

export const WithLayoutSupport = ({
  children,
  fallback
}: WithLayoutSupportProps) => {
  const { t } = useTranslation();
  const supported = useLayoutSupport();
  return (
    <>
      {supported && children}
      {!supported && fallback && (
        <Container>
          {t('Campaign is not supported')}
        </Container>
      )}
    </>
  );
}