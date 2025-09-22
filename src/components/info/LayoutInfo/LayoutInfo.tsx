import { useTranslation } from 'react-i18next';
import { AuthorInfo, Container, UITranslationRequest } from '@/components';
import { getCategoryById } from '@/shared/lib/features/layouts/common';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectCategoryId, selectLayout } from '@/shared/store/features/layout/layout';
import S from './LayoutInfo.module.scss';

export const LayoutInfo = () => {
  const { t } = useTranslation();
  const layout = useAppSelector(selectLayout);
  const currentCategoryId = useAppSelector(selectCategoryId);
  const { width, height } = layout;
  const categoryId = currentCategoryId || layout.categoryId;
  const category = getCategoryById(categoryId);
  const author = category?.author;

  return (
    <Container className={S.container}>
      <UITranslationRequest />
      <div className={S.wrapper}>
        <div className={S.size}>
          {t('Size')}: {width}x{height}
          {t('mm')}
        </div>
        {category?.info && <div className={S.info}>{t(category.info)}</div>}
        {author && (
          <>
            <div className={S.rule} />
            <AuthorInfo author={author} />
          </>
        )}
      </div>
    </Container>
  );
};
