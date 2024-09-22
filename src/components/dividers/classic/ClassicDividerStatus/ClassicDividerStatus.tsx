import { PropsWithClassName } from '@/types/util';
import S from './ClassicDividerStatus.module.scss';
import { Icon } from '@/components/ui/Icon/Icon';
import classNames from 'classnames';

export type ClassicDividerStatusProps = PropsWithClassName & {
  campaignIcon?: string
  size?: number
}

export const ClassicDividerStatus = ({
  className,
  campaignIcon,
  size
}: ClassicDividerStatusProps) => {
  return (
    <div className={classNames(S.container, className)}>
      {campaignIcon && (
        <div className={S.campaignIcon}>
          <Icon icon={campaignIcon}/>
        </div>
      )}
      {Boolean(size) && (
        <div className={S.size}>
          {!campaignIcon && '∑'} {size}
        </div>
      )}
    </div>
  );
}