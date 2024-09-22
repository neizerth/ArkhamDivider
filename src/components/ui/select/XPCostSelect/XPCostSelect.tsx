import { IXPCost } from "@/types/game";
import { ToggleSelect } from '../ToggleSelect/ToggleSelect';
import S from './XPCostSelect.module.scss';
import { fixedXPCosts } from "@/data/fixedXPCosts";

export type XPCostSelectProps = {
  onChange: (data: IXPCost[]) => void
}

export const XPCostSelect = ({ onChange }: XPCostSelectProps) => {
  const xpCosts = fixedXPCosts;

  return (
    <ToggleSelect 
      value={xpCosts}
      className={S.container} 
      onChange={onChange}
    />
  );
}