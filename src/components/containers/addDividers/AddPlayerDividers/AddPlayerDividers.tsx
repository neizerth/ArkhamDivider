import { Checkbox, Col, Container, FactionSelect, IconButton, PlayerCardTypeSelect, Row } from '@/components';
import S from './AddPlayerDividers.module.scss';
import { XPCostSelect } from '@/components';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ICardType, IXPCost, IFaction } from '@/types/game';
import { ButtonType } from '@/types/ui';
import { onToggle } from '@/util/forms';
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

  const [useUpgrading, setUpgrading] = useState(false);
  const [includeBasicWeakness, setIncludeBasicWeakness] = useState(false);
  const [includeAllies, setIncludeAllies] = useState(false);

  const onAdd = () => {
    dispatch(addPlayerDividers({
      xpCosts,
      factions,
      types,
      useUpgrading,
      includeBasicWeakness,
      includeAllies
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
        <Col className={S.content}>
          <Row className={classNames(S.row)}>
            <FactionSelect onChange={setFactions}/>
            <Checkbox 
              checked={includeBasicWeakness} 
              onChange={onToggle(setIncludeBasicWeakness)}
            >
              {t('Basic Weakness')}
            </Checkbox>
          </Row>
          <Row className={classNames(S.row)}>
            <PlayerCardTypeSelect onChange={setTypes}/>
            <Checkbox 
              checked={useUpgrading} 
              onChange={onToggle(setUpgrading)}
            >
              {t('Upgrading')}
            </Checkbox>
            <Checkbox 
              checked={includeAllies} 
              onChange={onToggle(setIncludeAllies)}
            >
              {t('Ally')}
            </Checkbox>
          </Row>
          <Row className={classNames(S.xpCost)}>
            <div className={S.label}>{t('Cost')}</div>
            <XPCostSelect onChange={setXPCosts}/>
          </Row>
          <Row className={S.actions}>
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
        </Col>
      </Container>
    </div>
  );
}