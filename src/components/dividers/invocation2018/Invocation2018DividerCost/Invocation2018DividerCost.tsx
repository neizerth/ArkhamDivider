import { range } from 'ramda';
import S from './Invocation2018DividerCost.module.scss';
import classNames from 'classnames';
import { PropsWithClassName } from '@/types/util';

export type Invocation2018DividerCostProps = PropsWithClassName &{
  level: number
}

export const Invocation2018DividerCost = ({
  className,
  level
}: Invocation2018DividerCostProps) => {
  const levels = range(1, 6);
  console.log({
    levels
  })

  return (
    <div className={classNames(S.container, className)}>
      <div className={S.levels}>
        {levels.map(l => (
          <div className={classNames(
              S.level, 
              S[`level_${l}`],
              l > level && S[`level_style-${l - level}`],
              l <= level && S.level_current
            )}
          />
        ))}
      </div>
    </div>
  );
}