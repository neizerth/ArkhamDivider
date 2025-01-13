import { Row } from '@/components/ui/grid/Row/Row';
import S from './AddInvestigatorDividers.module.scss';
import { Col, Container, IconButton, StoryCustomContent, StorySelect } from '@/components';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ButtonType } from '@/types/ui';
import { removeAllDividers, selectStory } from '@/store/features/dividers/dividers';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { addInvestigatorDividers } from '@/store/features/addDividers/addDividers';
import { useInvestigatorStories } from '@/hooks/investigators/useInvestigatorStories';
import { useSupportedInvestigators } from '@/hooks/investigators/useSupportedInvestigators';

export type AddInvestigatorDividersProps = {

}

export const AddInvestigatorDividers = ({}: AddInvestigatorDividersProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const stories = useInvestigatorStories();

  const story = useAppSelector(selectStory);
  const getSupportedInvestigators = useSupportedInvestigators();

  const storiesWithInvestigators = stories.filter(
    ({ investigators }) => investigators.length > 0
  );

  const onAdd = () => {
    if (!story) {
      return;
    }
    const investigators = getSupportedInvestigators(story);

    dispatch(addInvestigatorDividers({
      investigators
    }));
  };

  const onGenerate = () => {
    onClear();
    onAdd();
  }

  const onClear = () => dispatch(removeAllDividers());

  return (
    <div className={S.container}>
      <Container>
        <Col>
          <Row wrap className={S.row}>
            <StorySelect
              className={S.select}
              stories={storiesWithInvestigators}
            />
            {story && (
              <>
                <IconButton
                  onClick={onGenerate} 
                  className={S.generate}
                  icon="check-thin"
                >
                  {t('Generate')}
                </IconButton>
                <IconButton 
                  onClick={onAdd} 
                  className={S.add}
                  icon="plus-thin"
                >
                  {t('Add')}
                </IconButton>
                <IconButton 
                  onClick={onClear} 
                  className={S.add}
                  buttonType={ButtonType.DANGER}
                  icon="trash"
                >
                  {t('Clear')}
                </IconButton>
              </>
            )}
          </Row>
          {story?.custom_content && (
            <div>
              <StoryCustomContent
                content={story.custom_content}
              />
            </div>
          )}
        </Col>
      </Container>
    </div>
  );
}