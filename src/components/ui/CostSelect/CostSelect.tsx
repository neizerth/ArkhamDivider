import { ToggleSelect } from '../ToggleSelect/ToggleSelect';
import S from './CostSelect.module.scss';

export type CostSelectProps = {
  onSelect: () => void
}

export const CostSelect = ({ onSelect }: CostSelectProps) => {
  const costs = [0, 1, 2, 3, 4, 5];
  return (
    <ToggleSelect className={S.container} onSelect={onSelect}>
      {costs.map(cost => (
        <div key={cost}>{cost}</div>
      ))}
    </ToggleSelect>
  );
}