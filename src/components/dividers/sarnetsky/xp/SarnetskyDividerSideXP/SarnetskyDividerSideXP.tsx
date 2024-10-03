import { IXPCost } from '@/types/game';
import S from './SarnetskyDividerSideXP.module.scss';
import { range } from 'ramda';
import classNames from 'classnames';
import Dot from './images/dot.svg?react'

export type SarnetskyDividerSideXPProps = {
  xpCost: IXPCost
}

export const SarnetskyDividerSideXP = ({
  xpCost
}: SarnetskyDividerSideXPProps) => {

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
            S[`level_${l}`],
            l <= level && S.current,
            l > level && l <= max && S.max,
            l > max && S.inactive
          )}
        />
      ))}
    </div>
  );
}