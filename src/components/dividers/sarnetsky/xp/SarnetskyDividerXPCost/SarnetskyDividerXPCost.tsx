import { IXPCost } from '@/types/game';
import S from './SarnetskyDividerXPCost.module.scss';
import { range } from 'ramda';
import classNames from 'classnames';
import Dot from './images/dot.svg?react'

export type SarnetskyDividerXPCostProps = {
  xpCost: IXPCost
}

export const SarnetskyDividerXPCost = ({
  xpCost
}: SarnetskyDividerXPCostProps) => {

  const {
    level,
    max = level
  } = xpCost;

  return (
    <div className={S.container}>
      {range(1, 6).map(l => (
        <Dot 
          key={l}
          className={classNames(
            S.level,
            l <= level && S.current,
            l > level && l <= max && S.max,
            l > max && S.inactive
          )}
        />
      ))}
    </div>
  );
}