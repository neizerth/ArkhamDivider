import { ICardType } from '@/types/game';
import { ToggleSelect, ToggleSelectItem, ToggleSelectItemProps } from '../ToggleSelect/ToggleSelect';
import S from './PlayerCardTypeSelect.module.scss';
import cardTypes from '@/data/playerCardTypes.json';
import { useTranslation } from 'react-i18next';

export const PlayerCardTypeSelectItem = (props: ToggleSelectItemProps<ICardType>) => {
  const { t } = useTranslation();
  const { value } = props;
  return (
    <ToggleSelectItem {...props}>
      {t(value.name)}
    </ToggleSelectItem>
  )
}

export type PlayerCardTypeSelectProps = {
  onChange: (data: ICardType[]) => void
}

export const PlayerCardTypeSelect = ({ onChange }: PlayerCardTypeSelectProps) => {
  const components = {
    Item: PlayerCardTypeSelectItem
  }
  return (
    <ToggleSelect 
      onChange={onChange} 
      value={cardTypes}
      components={components}
    />
  );
}