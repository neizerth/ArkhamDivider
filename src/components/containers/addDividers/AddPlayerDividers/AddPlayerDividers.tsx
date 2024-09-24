import { Checkbox, Container, FactionSelect, IconButton, PlayerCardTypeSelect, Row } from '@/components';
import S from './AddPlayerDividers.module.scss';
import { XPCostSelect } from '@/components';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ICardType, IXPCost, IFaction } from '@/types/game';
import { ButtonType } from '@/types/ui';
import { createToggleHanlder } from '@/util/forms';
import { addPlayerDividers } from '@/store/features/addDividers/addDividers';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { removeAllDividers } from '@/store/features/dividers/dividers';

export type AddPlayerDividersProps = {

}

export const AddPlayerDividers = ({}: AddPlayerDividersProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [xpCosts, setXPCosts] = useState<IXPCost[]>([]);
  const [factions, setFactions] = useState<IFaction[]>([]);
  const [types, setTypes] = useState<ICardType[]>([]);

  const [form, setForm] = useState({
    useUpgrading: false,
    includeBasicWeakness: false,
    includeAllies: false,
    includeFactionId: false,
    includeBonded: false,
    displaySideXP: false,
    displayNumericXP: false
  });

  const check = createToggleHanlder(
    form, 
    setForm
  );

  const onAdd = () => {
    dispatch(addPlayerDividers({
      xpCosts,
      factions,
      types,
      ...form
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
        <div className={S.content}>
          <Row className={S.row} wrap>
            <FactionSelect onChange={setFactions}/>
          
          </Row>
          <div className={S.rule}/>
          <div>
            <Checkbox 
              {...check('includeFactionId')}
            >
              {t('Card Factions')}
            </Checkbox>
          </div>
          <div className={S.rule}/>
          <Row className={S.row} wrap>
            <PlayerCardTypeSelect onChange={setTypes}/>
            <Checkbox 
              {...check('includeAllies')}
            >
              {t('Ally')}
            </Checkbox>
          </Row>
          <div className={S.rule}/>
          <Row wrap>
            <Checkbox 
              {...check('includeBasicWeakness')}
            >
              {t('Basic Weakness')}
            </Checkbox>
            <Checkbox 
              {...check('includeBonded')}
            >
              {t('Bonded')}
            </Checkbox>
            <Checkbox 
              {...check('useUpgrading')}
            >
              {t('Upgrading')}
            </Checkbox>
          </Row>
          <div className={S.rule}/>
          <Row className={classNames(S.xpCost)} wrap>
            <div className={S.label}>{t('Cost')}</div>
            <XPCostSelect onChange={setXPCosts}/>
          </Row>
          <Row wrap className={S.row}>

            <Checkbox 
              {...check('displaySideXP')}
            >
              {t('Side XP')}
            </Checkbox>
            
            {form.displaySideXP && (
              <Checkbox 
                {...check('displayNumericXP')}
              >
                {t('Numeric XP')}
              </Checkbox>
            )}
          </Row>
          <Row className={S.actions} wrap>
            <IconButton 
              icon="check-thin"
              onClick={onGenerate}
            >
              {t('Generate')}
            </IconButton>
            <IconButton
              icon="plus-thin"
              onClick={onAdd}
            >
              {t('Add')}
            </IconButton>
            <IconButton 
              icon="trash" 
              buttonType={ButtonType.DANGER}
              onClick={onClear}
            >
              {t('Clear')}
            </IconButton>
          </Row>
        </div>
      </Container>
    </div>
  );
}