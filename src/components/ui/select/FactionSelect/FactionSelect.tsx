import classNames from 'classnames';
import { Icon, ToggleSelect } from '@/components';
import factions from '@/shared/data/factions.json';
import { IFaction } from '@/shared/types/game';
import { ToggleSelectItem, ToggleSelectItemProps } from '../ToggleSelect/ToggleSelect';
import S from './FactionSelect.module.scss';

export const FactionSelectItem = (props: ToggleSelectItemProps<IFaction>) => {
  const { value, className, isSelected } = props;

  const classList = classNames(S.item, className, isSelected && S.selected);

  return (
    <ToggleSelectItem {...props} className={classList}>
      <Icon icon={value.icon} className={classNames(S.icon, S[value.id])} />
    </ToggleSelectItem>
  );
};

export type FactionSelectProps = {
  onChange: (value: IFaction[]) => void;
};

export const FactionSelect = ({ onChange }: FactionSelectProps) => {
  const components = {
    Item: FactionSelectItem,
  };

  return (
    <ToggleSelect
      value={factions}
      onChange={onChange}
      components={components}
      className={S.select}
    />
  );
};
