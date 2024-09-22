import { Icon } from '@/components/ui/Icon/Icon';
import S from './ClassicDividerXPCost.module.scss';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';
import { CardType } from '@/types/game';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectColor } from '@/store/features/layout/layout';

export type ClassicDividerXPCostProps = PropsWithClassName & {
  level: number
  type: CardType
}

export type ClassicDividerSkillXPCostProps = PropsWithClassName & {
  level: number
}

export const ClassicDividerSkillXPCost = ({
  className,
  level
}: ClassicDividerSkillXPCostProps) => {
  return (
    <div className={classNames(S.skill, className)}>
      {level === 0 && (
        <>
          <Icon icon="s_level_null" className={classNames(S.nullSkillBackground)}/>
        </>
      )}
      {level > 0 && (
        <>
          <Icon icon="s_frame_background" className={classNames(S.skillBackground)}/>
          <Icon icon={`ae_level_${level}`} className={classNames(S.level, S.lightLevel)}/>
        </>
      )}
    </div>
  )
}

export const ClassicDividerDefaultXPCost = ({
  level
}: {
  level: number
}) => {
  return (
    <div className={S.XPCost}>
      <Icon icon="inverted_level_0" className={classNames(S.background)}/>
      {level > 0 && <Icon icon={`ae_level_${level}`} className={classNames(S.level, S.lightLevel)}/>}
    </div>
  )
}

export const ClassicDividerEventXPCost = ({
  level
}: {
  level: number
}) => {
  return (
    <div className={classNames(S.XPCost, S.event)}>
      {level > 0 && <Icon icon={`ae_level_${level}`} className={classNames(S.level)}/>}
    </div>
  )
}

export const ClassicDividerXPCost = ({
  className,
  type,
  level
}: ClassicDividerXPCostProps) => {
  const color = useAppSelector(selectColor);

  const classList = classNames(
    className,
    S.container,
    color && S.color
  )

  return (
    <div className={classList}>
      {type === CardType.SKILL && (
        <ClassicDividerSkillXPCost level={level}/>
      )}
      {type === CardType.EVENT && (
        <ClassicDividerEventXPCost level={level}/>
      )}
       {type === CardType.ASSET && (
        <ClassicDividerDefaultXPCost level={level}/>
      )}
    </div>
  );
}