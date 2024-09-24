import { range } from 'ramda';
import S from './Invocation2018DividerXPCost.module.scss';
import classNames from 'classnames';
import { PropsWithClassName } from '@/types/util';
import { IXPCost } from '@/types/game';

export type Invocation2018DividerXPCostProps = PropsWithClassName &{
  xpCost: IXPCost
}

export const Invocation2018DividerXPCost = ({
  className,
  xpCost
}: Invocation2018DividerXPCostProps) => {
  const { 
    level = 0,
    max = level
  } = xpCost;
  const levels = range(1, max + 1);

  return (
    <div className={classNames(S.container, className)}>
      <div className={S.levels}>
        {levels.map(l => (
          <div 
            key={l}
            className={classNames(
              S.level, 
              S[`level_${l}`],
              l > level && S[`level_style-${l - level}`],
              l <= level && S.level_current
            )}
          >
            <svg className={S.dot} viewBox="0 0 40 40" version="1.1"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="20"/>
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}