import { ICost } from "@/types/game";
import { ToggleSelect } from '../ToggleSelect/ToggleSelect';
import S from './CostSelect.module.scss';
import { fixedCosts } from "@/data/fixedCosts";

export type CostSelectProps = {
  onChange: (data: ICost[]) => void
}

export const CostSelect = ({ onChange }: CostSelectProps) => {
  const costs = fixedCosts;

  return (
    <ToggleSelect 
      value={costs}
      className={S.container} 
      onChange={onChange}
    />
  );
}