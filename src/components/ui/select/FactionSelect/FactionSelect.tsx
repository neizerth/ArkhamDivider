import { Icon, ToggleSelect } from '@/components';
import S from './FactionSelect.module.scss';
import factions from '@/data/factions.json';
import classNames from 'classnames';
import { ToggleSelectItem, ToggleSelectItemProps } from '../ToggleSelect/ToggleSelect';
import { IFaction } from "@/types/game";



export const FactionSelectItem = (
  props: ToggleSelectItemProps<IFaction>
) => {
  const {
    value,
    className,
    isSelected,
  } = props;

  const classList = classNames(
    S.item, 
    className,
    isSelected && S.selected,
  );

  return (
    <ToggleSelectItem {...props} className={classList}>
      <Icon 
        icon={value.icon} 
        className={classNames(S.icon, S[value.id])}
      />
    </ToggleSelectItem>
  );
}

export type FactionSelectProps = {
  onChange: (value: IFaction[]) => void
}

export const FactionSelect = ({
  onChange
}: FactionSelectProps) => {
  const components = {
    Item: FactionSelectItem
  }

  return (
    <ToggleSelect 
      value={factions}
      onChange={onChange} 
      components={components}
      className={S.select}
    />
  );
}