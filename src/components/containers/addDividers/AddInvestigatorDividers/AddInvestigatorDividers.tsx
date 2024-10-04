import { Row } from '@/components/ui/grid/Row/Row';
import S from './AddInvestigatorDividers.module.scss';
import { Container, IconButton, StorySelect } from '@/components';
import { selectStories } from '@/store/features/stories/stories';
import { selectLanguage } from '@/store/features/language/language';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IStory } from '@/types/api';
import { useState } from 'react';
import { ButtonType } from '@/types/ui';
import { removeAllDividers, selectStory } from '@/store/features/dividers/dividers';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { addInvestigatorDividers } from '@/store/features/addDividers/addDividers';

export type AddInvestigatorDividersProps = {

}

export const AddInvestigatorDividers = ({}: AddInvestigatorDividersProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const stories = useAppSelector(selectStories);
  const language = useAppSelector(selectLanguage);

  const story = useAppSelector(selectStory);

  const storiesWithInvestigators = stories.filter(({ investigators }) => investigators.length > 0);

  const getIsTranslated = ({ investigators }: IStory) => {
    if (language === 'en') {
      return true;
    }
    return investigators.every(
      ({ name }) => t(name) !== name
    );
  }

  const onAdd = () => {
    if (!story) {
      return;
    }
    const { investigators } = story
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
        <Row wrap className={S.row}>
          <StorySelect
            className={S.select}
            stories={storiesWithInvestigators}
            value={story}
            getIsTranslated={getIsTranslated}
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
      </Container>
    </div>
  );
}