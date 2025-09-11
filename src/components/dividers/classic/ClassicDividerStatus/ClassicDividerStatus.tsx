import classNames from 'classnames';
import { Icon } from '@/components/ui/icons/Icon/Icon';
import { useIconSelect } from '@/shared/lib/hooks/useIconSelect';
import { PropsWithClassName } from '@/shared/types/util';
import S from './ClassicDividerStatus.module.scss';

export type ClassicDividerStatusProps = PropsWithClassName & {
  campaignIcon?: string;
  size?: number;
};

export const ClassicDividerStatus = ({
  className,
  campaignIcon,
  size,
}: ClassicDividerStatusProps) => {
  const [icon, selectIcon] = useIconSelect({
    defaultIcon: campaignIcon,
  });
  return (
    <div className={classNames(S.container, className)}>
      {icon && (
        <div className={S.campaignIcon} onClick={selectIcon}>
          <Icon icon={icon} />
        </div>
      )}
      {Boolean(size) && (
        <div className={S.size}>
          {!campaignIcon && '∑'} {size}
        </div>
      )}
    </div>
  );
};
