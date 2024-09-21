import { Checkbox, Col, Container, FactionSelect, IconButton, PlayerCardTypeSelect, Row } from '@/components';
import S from './AddPlayerDividers.module.scss';
import { CostSelect } from '@/components';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ICardType, ICost, IFaction } from '@/types/game';
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
  const [costs, setCosts] = useState<ICost[]>([]);
  const [factions, setFactions] = useState<IFaction[]>([]);
  const [types, setTypes] = useState<ICardType[]>([]);
  const [useUpgrading, setUpgrading] = useState(false);

  const onAdd = () => {
    dispatch(addPlayerDividers({
      costs,
      factions,
      types,
      useUpgrading
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
          <div>
            <FactionSelect onChange={setFactions}/>
          </div>
          <Row className={classNames(S.row)}>
            <PlayerCardTypeSelect onChange={setTypes}/>
            <Checkbox 
              checked={useUpgrading} 
              onChange={onToggle(setUpgrading)}
            >
              {t('Upgrading')}
            </Checkbox>
          </Row>
          <Row className={classNames(S.cost)}>
            <div className={S.label}>{t('Cost')}</div>
            <CostSelect onChange={setCosts}/>
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