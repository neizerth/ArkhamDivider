import { useTranslation } from 'react-i18next';
// import S from './PlayerCardTypeSelect.module.scss';
import { playerCardTypes } from '@/shared/data/playerCardTypes';
import { ICardType } from '@/shared/types/game';
import {
  ToggleSelect,
  ToggleSelectItem,
  ToggleSelectItemProps,
} from '../ToggleSelect/ToggleSelect';

export const PlayerCardTypeSelectItem = (props: ToggleSelectItemProps<ICardType>) => {
  const { t } = useTranslation();
  const { value } = props;
  return <ToggleSelectItem {...props}>{t(value.name)}</ToggleSelectItem>;
};

export type PlayerCardTypeSelectProps = {
  onChange: (data: ICardType[]) => void;
};

export const PlayerCardTypeSelect = ({ onChange }: PlayerCardTypeSelectProps) => {
  const components = {
    Item: PlayerCardTypeSelectItem,
  };
  return <ToggleSelect onChange={onChange} value={playerCardTypes} components={components} />;
};
