import classNames from 'classnames';
import { Guide } from '@/components';
import { GuideType } from '@/shared/types/print';
import { PropsWithClassName } from '@/shared/types/util';
import S from './Guides.module.scss';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectCropMarks } from '@/shared/store/features/print/print';

const DEFAULT_GUIDE_TYPE = 'cross';

type GuideConfig = GuideType | false;

export type GuidesProps = PropsWithClassName & {
  topLeft?: GuideConfig;
  topRight?: GuideConfig;
  bottomLeft?: GuideConfig;
  bottomRight?: GuideConfig;
  contentClassName?: string;
  guideClassName?: string;
};

export const Guides = ({
  className,
  guideClassName,
  topLeft = DEFAULT_GUIDE_TYPE,
  topRight = DEFAULT_GUIDE_TYPE,
  bottomLeft = DEFAULT_GUIDE_TYPE,
  bottomRight = DEFAULT_GUIDE_TYPE,
}: GuidesProps) => {
  const show = useAppSelector(selectCropMarks);
  return (
    <div className={classNames(S.container, className)}>
      {topLeft && (
        <Guide
          className={classNames(guideClassName, S.guide, S.guide_topLeft)}
          type={topLeft}
          show={show}
        />
      )}
      {topRight && (
        <Guide
          className={classNames(guideClassName, S.guide, S.guide_topRight)}
          type={topRight}
          show={show}
        />
      )}
      {bottomLeft && (
        <Guide
          className={classNames(guideClassName, S.guide, S.guide_bottomLeft)}
          type={bottomLeft}
          show={show}
        />
      )}
      {bottomRight && (
        <Guide
          className={classNames(guideClassName, S.guide, S.guide_bottomRight)}
          type={bottomRight}
          show={show}
        />
      )}
    </div>
  );
};
