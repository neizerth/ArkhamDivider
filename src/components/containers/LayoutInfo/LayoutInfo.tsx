import { useAppSelector } from '@/hooks/useAppSelector';
import S from './LayoutInfo.module.scss';
import { selectCategoryId, selectLayout } from '@/store/features/layout/layout';
import { Col, Container, Icon, Row } from '@/components';
import { useTranslation } from 'react-i18next';
import { getCategoryById } from '@/util/layouts';

export type LayoutInfoProps = {

}

export const LayoutInfo = ({}: LayoutInfoProps) => {

  const { t } = useTranslation();
  const layout = useAppSelector(selectLayout);
  const currentCategoryId = useAppSelector(selectCategoryId);
  const { width, height } = layout;
  const categoryId = currentCategoryId || layout.categoryId;
  const category = getCategoryById(categoryId);
  const author = category?.author;

  return (
    <Container className={S.container}>
      <div className={S.wrapper}>
        <div className={S.size}>
          {t('Size')}: {width}x{height}{t('mm')}
        </div>
        {category?.info && (
          <div className={S.info}>{category.info}</div>
        )}
        {author && (
          <>
            <div className={S.rule}/>
            <div className={S.author}>
              <div className={S.info}>
                <div className={S.authorContent}>

                  {author.image && (
                    <img className={S.image} src={author.image} alt={author.name} />
                  )}
                  <div className={S.about}>
                    <h3 className={S.name}>{author.name}</h3>
                    {author.contacts && (
                      <div className={S.contacts}>
                        {author.contacts.map(contact => (
                          <a 
                            href={contact.url} 
                            target='_blank' 
                            className={S.contact}
                            key={contact.id}
                          >
                            <Icon icon={contact.icon}/>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}