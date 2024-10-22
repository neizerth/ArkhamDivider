import { IXPCost } from '@/types/game';
import S from './ArkhamDecoSideXP.module.scss';
import { range } from 'ramda';
import { MAX_XP } from '@/constants/xp';
import FullBar from './images/xp-full.svg?react';
import SmallBar from './images/xp-small.svg?react';
import classNames from 'classnames';

export type ArkhamDecoSideXPProps = {
  xpCost: IXPCost
}

export const ArkhamDecoSideXP = ({
  xpCost
}: ArkhamDecoSideXPProps) => {
  const {
    level,
    max = level
  } = xpCost;

  return (
    <div className={S.container}>
      {range(1, MAX_XP + 1).map(l => (
        <div 
          className={classNames(
            S.level,
            l <= max && S.level_full
          )} 
          key={l}
        >
          {l > max && (
            <SmallBar className={classNames(
              S.bar, 
              S.small,
              S.inactive
            )}/>
          )}
          {l <= max && (
            <FullBar className={classNames(
              S.bar, 
              S.full,
              l <= level && S.current
            )}/>
          )}
        </div>
      ))}
    </div>
  );
}