import S from './Guides.module.scss';
import { PropsWithClassName } from '@/shared/types/util';
import classNames from 'classnames';
import { Guide } from '@/components';
import { GuideType } from '@/shared/types/print';

const DEFAULT_GUIDE_TYPE = 'cross';

type GuideConfig = GuideType | false;

export type GuidesProps = PropsWithClassName & {
  topLeft?: GuideConfig;
  topRight?: GuideConfig;
  bottomLeft?: GuideConfig;
  bottomRight?: GuideConfig;
  contentClassName?: string;
  guideClassName?: string;
}

export const Guides = ({ 
  className,
  guideClassName,
  topLeft = DEFAULT_GUIDE_TYPE,
  topRight = DEFAULT_GUIDE_TYPE,
  bottomLeft = DEFAULT_GUIDE_TYPE,
  bottomRight = DEFAULT_GUIDE_TYPE
}: GuidesProps) => {
  return (
    <div className={classNames(S.container, className)}>
      {topLeft && (
        <Guide 
          className={classNames(
            guideClassName, 
            S.guide, 
            S.guide_topLeft
          )}
          type={topLeft}
        />
      )}
      {topRight && (
        <Guide 
          className={classNames(
            guideClassName, 
            S.guide, 
            S.guide_topRight
          )}
          type={topRight}
        />
      )}
      {bottomLeft && (
        <Guide 
          className={classNames(
            guideClassName, 
            S.guide, 
            S.guide_bottomLeft
          )}
          type={bottomLeft}
        />
      )}
      {bottomRight && (
        <Guide 
          className={classNames(
            guideClassName, 
            S.guide, 
            S.guide_bottomRight
          )}
          type={bottomRight}
        />
      )}
    </div>
  );
}