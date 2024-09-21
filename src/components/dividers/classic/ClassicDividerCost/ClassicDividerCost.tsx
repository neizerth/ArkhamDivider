import { Icon } from '@/components/ui/Icon/Icon';
import S from './ClassicDividerCost.module.scss';
import { PropsWithClassName } from '@/types/util';
import classNames from 'classnames';
import { CardType } from '@/types/game';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectColor } from '@/store/features/layout/layout';

export type ClassicDividerCostProps = PropsWithClassName & {
  level: number
  type: CardType
}

export type ClassicDividerSkillCostProps = PropsWithClassName & {
  level: number
}

export const ClassicDividerSkillCost = ({
  className,
  level
}: ClassicDividerSkillCostProps) => {
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

export const ClassicDividerDefaultCost = ({
  level
}: {
  level: number
}) => {
  return (
    <div className={S.cost}>
      <Icon icon="inverted_level_0" className={classNames(S.background)}/>
      {level > 0 && <Icon icon={`ae_level_${level}`} className={classNames(S.level, S.lightLevel)}/>}
    </div>
  )
}

export const ClassicDividerEventCost = ({
  level
}: {
  level: number
}) => {
  return (
    <div className={classNames(S.cost, S.event)}>
      {level > 0 && <Icon icon={`ae_level_${level}`} className={classNames(S.level)}/>}
    </div>
  )
}

export const ClassicDividerCost = ({
  className,
  type,
  level
}: ClassicDividerCostProps) => {
  const color = useAppSelector(selectColor);

  const classList = classNames(
    className,
    S.container,
    color && S.color
  )

  return (
    <div className={classList}>
      {type === CardType.SKILL && (
        <ClassicDividerSkillCost level={level}/>
      )}
      {type === CardType.EVENT && (
        <ClassicDividerEventCost level={level}/>
      )}
       {type === CardType.ASSET && (
        <ClassicDividerDefaultCost level={level}/>
      )}
    </div>
  );
}