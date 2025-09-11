import classNames from 'classnames';
import { isNil } from 'ramda';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Checkbox,
  Container,
  FactionSelect,
  IconButton,
  PlayerCardTypeSelect,
  Row,
  StorySelect,
  XPCostSelect,
} from '@/components';
import { createToggleHanlder } from '@/shared/lib/features/util/forms';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { addPlayerDividers } from '@/shared/store/features/addDividers/addDividers';
import { removeAllDividers, selectStory } from '@/shared/store/features/dividers/dividers';
import { selectLayout } from '@/shared/store/features/layout/layout';
import { selectStories } from '@/shared/store/features/stories/stories';
import { ICardType, IFaction, IXPCost } from '@/shared/types/game';
import { ButtonType } from '@/shared/types/ui';
import S from './AddPlayerDividers.module.scss';

export type AddPlayerDividersProps = {};

export const AddPlayerDividers = ({}: AddPlayerDividersProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { playerOptions } = useAppSelector(selectLayout);
  const [xpCosts, setXPCosts] = useState<IXPCost[]>([]);
  const [factions, setFactions] = useState<IFaction[]>([]);
  const [types, setTypes] = useState<ICardType[]>([]);

  const [form, setForm] = useState({
    includeUpgrading: false,
    includeBasicWeakness: false,
    includeAllies: false,
    includeFactionId: false,
    includeBonded: false,
    includeCustomizations: false,
    displaySideXP: false,
    displayNumericXP: false,
    includeInvestigators: false,
  });

  const stories = useAppSelector(selectStories);
  const story = useAppSelector(selectStory);

  const check = createToggleHanlder(form, setForm);

  const onAdd = () => {
    dispatch(
      addPlayerDividers({
        xpCosts,
        factions,
        types,
        story,
        ...form,
      })
    );
  };

  const onGenerate = () => {
    onClear();
    onAdd();
  };

  const onClear = () => dispatch(removeAllDividers());

  return (
    <div className={S.container}>
      <Container>
        <div className={S.content}>
          <Row className={S.row} wrap>
            <FactionSelect onChange={setFactions} />
          </Row>
          <div className={S.rule} />
          <Row className={S.row} wrap>
            <Checkbox {...check('includeFactionId')}>{t('Card Factions')}</Checkbox>
            <Checkbox {...check('includeInvestigators')}>{t('Investigators')}</Checkbox>
          </Row>
          <div className={S.rule} />
          <Row className={S.row} wrap>
            <PlayerCardTypeSelect onChange={setTypes} />
          </Row>
          <div className={S.rule} />
          <Row wrap className={S.row}>
            <Checkbox {...check('includeAllies')}>{t('Ally')}</Checkbox>
            <Checkbox {...check('includeBonded')}>{t('Bonded')}</Checkbox>
            <Checkbox {...check('includeBasicWeakness')}>{t('Weakness')}</Checkbox>
          </Row>
          <div className={S.rule} />
          <Row wrap className={S.row}>
            <Checkbox {...check('includeUpgrading')}>{t('Upgrading')}</Checkbox>
            <Checkbox {...check('includeCustomizations')}>{t('Customizations')}</Checkbox>
          </Row>
          {playerOptions?.storySupported && (
            <>
              <div className={S.rule} />
              <Row wrap className={S.row}>
                <StorySelect stories={stories} className={S.storiesSelect} clear={true} />
              </Row>
            </>
          )}
          <div className={S.rule} />
          <Row className={classNames(S.xpCost)} wrap>
            <div className={S.label}>{t('Experience')}</div>
            <XPCostSelect onChange={setXPCosts} />
          </Row>
          {playerOptions?.displaySideXP && (
            <Row wrap className={S.row}>
              {isNil(playerOptions?.displaySideXP) && (
                <Checkbox {...check('displaySideXP')}>{t('Side XP')}</Checkbox>
              )}

              {isNil(playerOptions?.displayNumericXP) && (
                <Checkbox {...check('displayNumericXP')}>{t('Numeric XP')}</Checkbox>
              )}
            </Row>
          )}
          <Row className={S.actions} wrap>
            <IconButton icon='check-thin' onClick={onGenerate}>
              {t('Generate')}
            </IconButton>
            <IconButton icon='plus-thin' onClick={onAdd}>
              {t('Add')}
            </IconButton>
            <IconButton icon='trash' buttonType={ButtonType.DANGER} onClick={onClear}>
              {t('Clear')}
            </IconButton>
          </Row>
        </div>
      </Container>
    </div>
  );
};
