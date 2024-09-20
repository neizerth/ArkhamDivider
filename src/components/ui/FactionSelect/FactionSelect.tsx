import { Icon, ToggleSelect } from '@/components';
import S from './FactionSelect.module.scss';
import data from '@/data/factions.json';
import classNames from 'classnames';
import { keys } from 'ramda';
export type FactionSelectItemProps = {
  id: string,
  icon: string
  isSelected: boolean
  onToggle: () => void
}

export const FactionSelectItem = ({ 
  id,
  icon, 
  isSelected,
  onToggle 
}: FactionSelectItemProps) => {

  const classList = classNames(
    S.item, 
    isSelected && S.selected,
  );
  return (
    <div 
      className={classList} 
      onClick={onToggle}
    >
      <Icon icon={icon} className={classNames(S.icon, S[id])}/>
    </div>
  );
}

export type FactionSelectProps = {
  onSelect: (value: string[]) => void
}

export const FactionSelect = ({
  onSelect
}: FactionSelectProps) => {
  const selectFactions = (indexes: number[]) => {
    const factions = indexes.map(index => data[index].id);
    onSelect(factions);
  }

  const defaultValue = data.map((_, i) => i);

  return (
    <ToggleSelect onSelect={selectFactions} defaultValue={defaultValue}>
      {data.map(faction => (
        <div className={S.item}>
          <Icon 
            icon={faction.icon} 
            className={classNames(S.icon, S[faction.id])}
          />
        </div>
      ))}
    </ToggleSelect>
  );
}