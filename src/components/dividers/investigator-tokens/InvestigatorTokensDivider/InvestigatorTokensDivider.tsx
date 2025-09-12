import classNames from 'classnames';
import { NotExportable } from '@/components/ui/behavior/NotExportable/NotExportable';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectCornerRadius } from '@/shared/store/features/print/print';
import { DividerProps } from '../../common/Divider/Divider';
import { DividerContent } from '../../common/DividerContent/DividerContent';
import { getDividerBackground } from './background';
import S from './InvestigatorTokensDivider.module.scss';

export const InvestigatorTokensDivider = (props: DividerProps) => {
  const { investigator, backId } = props;

  const cornerRadius = useAppSelector(selectCornerRadius);

  if (!investigator) {
    return null;
  }

  const { code } = investigator;
  const back = Boolean(backId);

  const background = getDividerBackground(code);

  return (
    <div className={classNames(S.container, props.className)}>
      <DividerContent className={S.content}>
        <img
          crossOrigin='anonymous'
          src={background}
          alt={investigator.name}
          className={classNames(S.background, back && S.backgroundBack)}
        />
        <NotExportable>{cornerRadius && <div className={S.cornerRadius} />}</NotExportable>
      </DividerContent>
    </div>
  );
};
