import { IDivider } from '@/types/dividers';
import S from './ArkhamStarter3mmDivider.module.scss';

import background from './images/background.png';
import strip from './images/cycleStrip.png';
import { DividerContent } from '@/components';
import classNames from 'classnames';

export const ArkhamStarter3mmDivider = (props: IDivider) => {
  return (
    <div className={S.container}>
      <img className={S.background} src={background}/>
      <DividerContent className={S.content}>
        <img 
          className={classNames(
            S.strip,
            S.strip_vertical
          )} 
          src={strip}
        />
      </DividerContent>
    </div>
  );
}