import classNames from 'classnames';
import { DividerProps } from '../../common/Divider/Divider';
import { DividerContent } from '../../common/DividerContent/DividerContent';
import S from './InvestigatorTokensDivider.module.scss';

export const InvestigatorTokensDivider = (props: DividerProps) => {
  return (
    <div className={classNames(S.container, props.className)}>
      <DividerContent className={S.content}></DividerContent>
    </div>
  );
};
