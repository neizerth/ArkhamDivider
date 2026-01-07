import classNames from 'classnames';
import { Icon } from '@/components/ui/icons/Icon/Icon';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectLayout } from '@/shared/store/features/layout/layout';
import { CardType, IXPCost } from '@/shared/types/game';
import { PropsWithClassName } from '@/shared/types/util';
import S from './ClassicDividerIconXPCost.module.scss';

export type ClassicDividerSkillXPCostProps = PropsWithClassName & {
  xpCost: IXPCost;
};

export const ClassicDividerSkillXPCost = ({
  className,
  xpCost,
}: ClassicDividerSkillXPCostProps) => {
  const { level, max = level } = xpCost;

  return (
    <div className={classNames(S.skill, className)}>
      {max > 0 && (
        <>
          <Icon
            icon='s_frame_background'
            className={classNames(S.skillBackground)}
            scaleType={false}
          />
          {level > 0 && (<Icon
            icon={`s_level_${level}`}
              className={classNames(S.lightLevel)}
              scaleType={false}
            />
          )}
          {max > level && (
            <Icon
              icon={`s_level_${max}`}
              className={classNames(S.level, S.maxLevel)}
              scaleType={false}
            />
          )}
        </>
      )}
    </div>
  );
};

export const ClassicDividerAssetXPCost = ({ xpCost }: { xpCost: IXPCost }) => {
  const { level, max = level } = xpCost;

  return (
    <div className={S.XPCost}>
      {max > 0 && (
        <>
          <Icon icon='inverted_level_0' className={classNames(S.background)} scaleType={false} />
          <Icon
            icon={`ae_level_${level}`}
            className={classNames(S.level, S.lightLevel)}
            scaleType={false}
          />
        </>
      )}
      {max > level && (
        <Icon
          icon={`ae_level_${max}`}
          className={classNames(S.level, S.maxLevel)}
          scaleType={false}
        />
      )}
    </div>
  );
};

export const ClassicDividerEventXPCost = ({ xpCost }: { xpCost: IXPCost }) => {
  const { level, max = level } = xpCost;

  return (
    <div className={classNames(S.XPCost, S.event)}>
      {level > 0 && (
        <Icon icon={`ae_level_${level}`} className={classNames(S.level)} scaleType={false} />
      )}
      {max > level && (
        <Icon
          icon={`ae_level_${max}`}
          className={classNames(S.level, S.maxLevel)}
          scaleType={false}
        />
      )}
    </div>
  );
};

export type ClassicDividerIconXPCostProps = PropsWithClassName & {
  xpCost: IXPCost;
  type: CardType;
};

export const ClassicDividerIconXPCost = ({
  className,
  type,
  xpCost,
}: ClassicDividerIconXPCostProps) => {
  const { color } = useAppSelector(selectLayout);

  const classList = classNames(className, S.container, color && S.color);

  return (
    <div className={classList}>
      {type === CardType.SKILL && <ClassicDividerSkillXPCost xpCost={xpCost} />}
      {[CardType.ASSET, CardType.ALL].includes(type) && (
        <ClassicDividerAssetXPCost xpCost={xpCost} />
      )}
      {type === CardType.EVENT && <ClassicDividerEventXPCost xpCost={xpCost} />}
    </div>
  );
};
