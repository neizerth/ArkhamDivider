import { DividerType } from '@/types/dividers';
import S from './VintageDivider.module.scss';
import { ClassicDividerSideXP, DividerContent, DividerText, Guides, Icon, NotExportable } from '@/components';
import bodyBackground from './images/body.png';
import tabBackground from './images/tab.png';
import iconBackground from './images/icon-background.png';

import classNames from 'classnames';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectBleed } from '@/store/features/print/print';
import { CircleIcon } from '@/components/ui/icons/CircleIcon/CircleIcon';
import { useIconSelect } from '@/hooks/useIconSelect';
import { getNextTabPosition, getPrevTabPosition, getTabPosition } from './features/tabPosition';
import { selectDividers } from '@/store/features/dividers/dividers';
import { getTabColor } from './features/getTabColor';
import { getDefaultIcon } from './features/getDefaultIcon';
import { DividerProps } from '../../common/Divider/Divider';
import { useStoryTranslation } from '@/hooks/useStoryTranslation';
import { getTopTitle } from './features/getTopTitle';
import { selectLanguage } from '@/store/features/language/language';
import { getBottomTitle } from './features/getBottomTitle';
import { ClassicDividerEventXPCost } from '../../classic/xp/ClassicDividerIconXPCost/ClassicDividerIconXPCost';
import { getInvestigatorLetter } from './features/getInvestigatorLetter';
import { moveTab, selectTabPositions } from '@/store/features/vintage/vintage';
import { useAppDispatch } from '@/hooks/useAppDispatch';

export type VintageDividerProps = DividerProps;

export const VintageDivider = (props: VintageDividerProps) => {

  const { 
    id,
    xpCost,
    displayNumericXP = false,
    type,
  } = props;

  const dispatch = useAppDispatch();
  const tabPositions = useAppSelector(selectTabPositions);
  const currentPosition = tabPositions[id];

  const { t } = useStoryTranslation(props.story);
  const language = useAppSelector(selectLanguage);
  const bleed = useAppSelector(selectBleed);
  const dividers = useAppSelector(selectDividers);

  const defaultIcon = getDefaultIcon({
    divider: props,
    language
  });

  const [icon, selectIcon] = useIconSelect({
    defaultIcon
  });

  const color = getTabColor(props);

  const tabPosition = getTabPosition({
    currentPosition,
    current: props,
    dividers
  });

  const topTitle = getTopTitle({
    divider: props,
    translate: t
  });

  const bottomTitle = getBottomTitle({
    divider: props,
    translate: t
  });

  const isInvestigator = type === DividerType.INVESTIGATOR;

  const moveRight = () => dispatch(
    moveTab(id, getNextTabPosition(tabPosition))
  )

  const moveLeft = () => dispatch(
    moveTab(id, getPrevTabPosition(tabPosition))
  )

  return (
    <div 
      className={classNames(
        S.container,
        S[language],
        S[tabPosition],
        bleed && S.bleed
      )}
      data-language={language}
    >
      <DividerContent>
        {xpCost && (
          <div className={S.sideXPCost}>
            <ClassicDividerSideXP
              xpCost={xpCost}
              numeric={displayNumericXP}
            />
          </div>
        )}
        <div className={S.topTitle}>
          <DividerText 
            defaultValue={topTitle}
            className={S.topTitleText}
            inputClassName={S.topTitleInput}
            fixedFontSize={false}
          />
        </div>
        <div className={S.bottomTitle}>
          <DividerText 
            defaultValue={bottomTitle}
            className={S.bottomTitleText}
            inputClassName={S.bottomTitleInput}
            wrapperClassName={S.bottomTitleWrapper}
            fixedFontSize={false}
            fullHeight={false}
          />
        </div>

        <div 
          className={classNames(
            S.tab,
            S[`tab_${tabPosition}`]
          )}
        >
          <NotExportable>
            {tabPosition !== 'left' && (
              <div 
                className={classNames(
                  S.moveTab,
                  S.moveTab_left
                )}
                onClick={moveLeft}
              >
                <Icon icon='action' className={S.moveIcon}/>
              </div>
            )}
            {tabPosition !== 'right' && (
              <div 
                className={classNames(
                  S.moveTab,
                  S.moveTab_right
                )}
                onClick={moveRight}
              >
                <Icon icon='action'/>
              </div>
            )}
          </NotExportable>
          {xpCost && (
            <div className={S.xpCost}>
              <ClassicDividerEventXPCost
                xpCost={xpCost}
              />
            </div>
          )}
          <div className={S.tabOverlay} style={{ background: color }}/>
          <img src={tabBackground} alt="" className={S.tabImage} />
          <img src={iconBackground} alt="" className={S.iconBackground}/>
          <div 
            className={classNames(
              S.icon,
              xpCost && xpCost?.level > 0 && S.icon_xp
            )} 
          >
            {icon && (
              <div className={S.iconWrapper} onClick={selectIcon}>
                <CircleIcon 
                  type="vintage"
                  icon={icon}
                  scaleFactor={{
                    regular: 0.85,
                    circled: icon.startsWith('return_') ? 1 : 0.87
                  }}
                />
              </div>
            )}
            {isInvestigator && !icon && (
              <div className={S.letterIcon}>
                <DividerText
                  defaultValue={getInvestigatorLetter(topTitle)}
                  clearPosition='outside'
                  fixedFontSize={false}
                />
              </div>
            )}
          </div>
        </div>
        {bleed && (
          <div className={S.bodyBleed}/>
        )}
        <NotExportable>
          {tabPosition !== 'left' && (
            <Guides
              className={classNames(
                S.tabGuides,
                S.tabGuides_left
              )}
              topLeft={false}
              topRight="inset-corner-tr"
              bottomLeft="inset-corner-bl"
              bottomRight="inset-corner-br"
            />
          )}
          {tabPosition !== 'right' && (
            <Guides
              className={classNames(
                S.tabGuides,
                S.tabGuides_right
              )}
              topLeft="inset-corner-tl"
              topRight={false}
              bottomLeft="inset-corner-bl"
              bottomRight="inset-corner-br"
            />
          )}
        </NotExportable>
        <img src={bodyBackground} alt="" className={S.body} />
      </DividerContent>
    </div>
  );
}