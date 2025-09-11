import classNames from 'classnames';
import { range } from 'ramda';
import { IXPCost, XPCost } from '@/shared/types/game';
import S from './ClassicDividerSideXP.module.scss';
import Dot from './images/dot.svg?react';

export type ClassicDividerSideXPProps = {
  numeric: boolean;
  xpCost: IXPCost;
};

export const ClassicDividerSideXP = ({ xpCost, numeric }: ClassicDividerSideXPProps) => {
  const { value, level = 0, max = level } = xpCost;

  return (
    <div className={S.container}>
      {numeric && level !== XPCost.NO_COST && <div className={S.text}>{value}</div>}
      {!numeric && max > 0 && (
        <div className={S.dots}>
          {range(1, 6).map((l) => (
            <div
              key={l}
              className={classNames(
                S.level,
                S[`level_${l}`],
                l > level && S[`level_style-${l - level}`],
                l > level && l <= max && S.level_max,
                l <= level && S.level_current,
                l > max && S.level_inactive
              )}
            >
              <Dot className={S.dot} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
