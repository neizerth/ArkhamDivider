import { Icon } from '@/components/ui/Icon/Icon';
import S from './ClassicDividerIconXPCost.module.scss';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';
import { CardType, IXPCost } from '@/types/game';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';

export type ClassicDividerSkillXPCostProps = PropsWithClassName & {
  xpCost: IXPCost
}

export const ClassicDividerSkillXPCost = ({
  className,
  xpCost
}: ClassicDividerSkillXPCostProps) => {
  const {
    level,
    max = level
  } = xpCost;

  return (
    <div className={classNames(S.skill, className)}>
      {max === 0 && (
        <>
          <Icon icon="s_level_null" className={classNames(S.nullSkillBackground)}/>
        </>
      )}
      {max > 0 && (
        <>
          <Icon icon="s_frame_background" className={classNames(S.skillBackground)}/>
          <Icon icon={`s_level_${level}`} className={classNames(S.level, S.lightLevel)}/>
          {max > level && (
            <Icon 
              icon={`s_level_${max}`} 
              className={classNames(S.level, S.maxLevel)}
            />
          )}
        </>
      )}
    </div>
  )
}

export const ClassicDividerAssetXPCost = ({
  xpCost
}: {
  xpCost: IXPCost
}) => {
  const {
    level,
    max = level
  } = xpCost;

  return (
    <div className={S.XPCost}>
      {max > 0 && <Icon icon="inverted_level_0" className={classNames(S.background)}/>}
      {max > 0 && (
        <Icon 
          icon={`ae_level_${level}`} 
          className={classNames(S.level, S.lightLevel)}
        />
      )}
      {max > level && (
        <Icon 
          icon={`ae_level_${max}`} 
          className={classNames(S.level, S.maxLevel)}
        />
      )}
    </div>
  )
}

export const ClassicDividerEventXPCost = ({
  xpCost
}: {
  xpCost: IXPCost
}) => {
  const {
    level,
    max = level
  } = xpCost;

  return (
    <div className={classNames(S.XPCost, S.event)}>
      {max > 0 && <Icon icon={`ae_level_${level}`} className={classNames(S.level)}/>}
      {max > level && (
        <Icon 
          icon={`ae_level_${max}`} 
          className={classNames(S.level, S.maxLevel)}
        />
      )}
    </div>
  )
}

export type ClassicDividerIconXPCostProps = PropsWithClassName & {
  xpCost: IXPCost
  type: CardType
}

export const ClassicDividerIconXPCost = ({
  className,
  type,
  xpCost
}: ClassicDividerIconXPCostProps) => {
  const { color } = useAppSelector(selectLayout);
  
  const classList = classNames(
    className,
    S.container,
    color && S.color
  )

  return (
    <div className={classList}>
      {type === CardType.SKILL && (
        <ClassicDividerSkillXPCost xpCost={xpCost}/>
      )}
      {[CardType.ASSET, CardType.EVENT].includes(type) && (
        <ClassicDividerAssetXPCost xpCost={xpCost}/>
      )}
    </div>
  );
}