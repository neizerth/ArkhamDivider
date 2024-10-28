import classNames from 'classnames';
import S from './ArkhamStarter3mmDividerStrip.module.scss';
import stripBorder from './images/stripBorder.png';
import stripInner from './images/stripInner.png';
import { PropsWithChildren } from 'react';

export type ArkhamStarter3mmDividerStripProps = PropsWithChildren & {
  color: string
  secondaryColor?: string
  horizontal?: boolean
  reverse?: boolean
}

export const ArkhamStarter3mmDividerStrip = ({
  color,
  secondaryColor,
  horizontal,
  reverse,
  children
}: ArkhamStarter3mmDividerStripProps) => {
  return (
    <div className={classNames(
      S.container,
      horizontal ? S.horizontal : S.vertical,
      reverse && S.reverse
    )}>
      <div className={S.contentWrapper}>
        <div className={S.content}>
          {children}
        </div>
      </div>

      <div className={classNames(
        S.wrapper
      )}>
        <div className={S.inner}>
          <div 
            className={S.color} 
            style={{ backgroundColor: color }}
          />
          <div 
            className={S.secondaryColor} 
            style={{ backgroundColor: secondaryColor }}
          />
          <img
            className={classNames(
              S.stripInner,
            )} 
            src={stripInner} 
          />
        </div>
        
        <img
          className={classNames(
            S.stripBorder,
          )} 
          src={stripBorder} 
        />
      </div>
    </div>
  );
}