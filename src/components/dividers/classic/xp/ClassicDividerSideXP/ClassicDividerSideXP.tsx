import { IXPCost } from '@/types/game';
import S from './ClassicDividerSideXP.module.scss';
import { range } from 'ramda';
import classNames from 'classnames';

export type ClassicDividerSideXPProps = {
  numeric: boolean
  xpCost: IXPCost
}

export const ClassicDividerSideXP = ({
  xpCost,
  numeric
}: ClassicDividerSideXPProps) => {
  const {
    value,
    level,
    max = level
  } = xpCost;

  return (
    <div className={S.container}>
      {numeric && (
        <div className={S.text}>{value}</div>
      )}
      {!numeric && level > 0 && (
        <div className={S.dots}>
          {range(1, 6).map(l => (
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
              <svg className={S.dot} viewBox="0 0 40 40" version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20"/>
              </svg>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}