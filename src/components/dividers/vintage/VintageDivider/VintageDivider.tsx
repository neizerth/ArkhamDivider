import { IDivider } from '@/types/dividers';
import S from './VintageDivider.module.scss';
import { DividerContent, DividerText, Guides, NotExportable } from '@/components';
import bodyBackground from './images/body.png';
import tabBackground from './images/tab.png';
import iconBackground from './images/icon-background.png';

import classNames from 'classnames';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectBleed } from '@/store/features/print/print';
import { CircleIcon } from '@/components/ui/icons/CircleIcon/CircleIcon';
import { useIconSelect } from '@/hooks/useIconSelect';
import { getTabPosition } from './features/getTabPosition';
import { selectDividers } from '@/store/features/dividers/dividers';
import { getTabColor } from './features/getTabColor';
import { getDefaultIcon } from './features/icons';
import { DividerProps } from '../../common/Divider/Divider';
import { useStoryTranslation } from '@/hooks/useStoryTranslation';
import { getBottomTitle, getTopTitle } from './features/text';
import { selectLanguage } from '@/store/features/language/language';
import { useState } from 'react';

export type VintageDividerProps = DividerProps;

export const VintageDivider = (props: VintageDividerProps) => {

  const { t } = useStoryTranslation(props.story);
  const language = useAppSelector(selectLanguage);
  const bleed = useAppSelector(selectBleed);
  const dividers = useAppSelector(selectDividers);

  const defaultIcon = getDefaultIcon(props);
  const [icon, selectIcon] = useIconSelect({
    defaultIcon
  });

  const color = getTabColor(props);

  const tabPosition = getTabPosition({
    current: props,
    dividers
  });

  const topTitle = getTopTitle(props) || '';
  const bottomTitle = getBottomTitle({
    divider: props,
    translate: t
  }) || '';
  const translatedTopTitle = t(topTitle);
  const translatedBottomTitle = t(bottomTitle);

  const realLanguage = translatedTopTitle !== topTitle ? language : 'en';

  return (
    <div 
      className={classNames(
        S.container,
        S[realLanguage],
        bleed && S.bleed
      )}
      data-language={realLanguage}
    >
      <DividerContent>
        {/* title */}
        {/* guides */}

        <div className={S.topTitle}>
          <DividerText 
            defaultValue={translatedTopTitle}
            className={S.topTitleText}
            inputClassName={S.topTitleInput}
            fixedFontSize={false}
          />
        </div>
        <div className={S.bottomTitle}>
          <DividerText 
            defaultValue={translatedBottomTitle}
            className={S.bottomTitleText}
            inputClassName={S.bottomTitleInput}
            fixedFontSize={false}
          />
        </div>
        <div 
          className={classNames(
            S.tab,
            S[`tab_${tabPosition}`]
          )}
        >
          {bleed && (
            <NotExportable>
              <Guides
                className={S.tabGuides}
                bottomLeft="outset-corner-bl"
                bottomRight="outset-corner-br"
              />
            </NotExportable>
          )}
          <div className={S.tabOverlay} style={{ background: color }}/>
          <img src={tabBackground} alt="" className={S.tabImage} />
          <img src={iconBackground} alt="" className={S.iconBackground}/>
          <div className={S.icon} onClick={selectIcon}>
            {icon && (
              <CircleIcon 
                type="vintage"
                icon={icon}
                scaleFactor={{
                  regular: 0.9,
                  circled: icon.startsWith('return_') ? 1 : 0.87
                }}
              />
            )}
          </div>
        </div>
        {bleed && (
          <>
            <div className={S.bodyBleed}/>
            <NotExportable>
              <Guides
                className={S.bodyGuides}
                topLeft="outset-corner-tl"
                topRight="outset-corner-tr"
                bottomLeft={false}
                bottomRight={false}
              />
            </NotExportable>
          </>
        )}
        <img src={bodyBackground} alt="" className={S.body} />
      </DividerContent>
    </div>
  );
}