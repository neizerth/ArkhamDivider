import { DividerType, IDivider } from '@/types/dividers';
import { DividerContent } from '../../common/DividerContent/DividerContent';
import S from './ArkhamDecoDivider.module.scss';
import paper from './images/paper.png'

import bottomCorner from './images/bottom-corner.svg';
import bottomTentacle from './images/bottom-tentacle.svg';
import bottomLine from './images/bottom-line.svg';
import pattern from './images/pattern.png';
import scratches from './images/scratches.png';
import centerBorder from './images/center-border.svg';
import topLeftCorner from './images/top-left-corner.png'
import topRightCorner from './images/top-right-corner.png'
import scenarioTopRightCorner from './images/scenario-top-right-corner.png'
import topLine from './images/top-line.png'
import scenarioTentacles from './images/scenario-tentacles.png'
import tabTopCorner from './images/tab-top-corner.png'
import tabTopLine from './images/tab-top-line.png'
import tabTentacles from './images/tab-tentacles.png';

import classNames from 'classnames';
import { DividerMenu, DividerText, Icon } from '@/components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLanguage } from '@/store/features/language/language';
import { selectLayout } from '@/store/features/layout/layout';
import { useIconSelect } from '@/hooks/useIconSelect';
import { ArkhamDecoSideXP } from '../ArkhamDecoSideXP/ArkhamDecoSideXP';
import { getXPDisplayValue } from '@/util/xp';
import { ArkhamDecoDividerType } from '@/data/layouts/arkham-deco';

export const ArkhamDecoDivider = ({
  ...props
}: IDivider) => {
  const {
    name = '',
    type,
    scenario,
    xpCost,
    id,
    displaySideXP,
    size,
  } = props;

  const [icon, selectIcon] = useIconSelect({
    defaultIcon: props.icon
  });

  const [previewIcon, selectPreviewIcon] = useIconSelect({
    defaultIcon: props.previewIcon || props.icon
  });

  const [specialIcon, selectSpecialIcon] = useIconSelect({
    defaultIcon: props.campaignIcon || props.specialIcon
  });


  const { t } = useTranslation();
  const { 
    color,
    customParams,
    orientation,
  } = useAppSelector(selectLayout);

  const layoutSize = customParams?.size || 'standard';
  const layoutType = customParams?.type || 'standard';

  const translatedName = t(name);

	const [_, setTitle] = useState(translatedName);

	const language = useAppSelector(selectLanguage);
	const realLanguage = translatedName === name ? 'en' : language;
  const isTab = layoutType === ArkhamDecoDividerType.TAB;
  const isScenario = type === DividerType.SCENARIO;

  const topRightCornerImage = (() => {
    if (isTab) {
      return tabTopCorner;
    }
    
    return isScenario ? scenarioTopRightCorner : topRightCorner;
  })()

	useEffect(() => {
		setTitle(translatedName);
	}, [translatedName]);
  
  return (
    <div className={classNames(
        S.container,
        S[`type_${layoutType}`],
        S[`size_${layoutSize}`],
        xpCost ? S.xp : S.noXP,
        S[`language_${realLanguage}`],
        S[`orientation_${orientation}`]
      )}
      data-type={layoutType}
    >
      <DividerContent className={S.dividerContent}>
        <div className={S.wrapper}>
          <div className={S.card}/>

          <div className={S.menu}>
            <DividerMenu id={id} className={S.menuContainer}/>
          </div>

          {color && (
            <img src={paper} alt="" className={S.paper}/>
          )}

          <div 
            className={classNames(
              S.specialCorner,
              xpCost && [
                specialIcon ? S.specialCorner_withXPIcon : S.specialCorner_noXPIcon
              ],
              S[`specialCorner_${type}`]
            )} 
            onClick={selectSpecialIcon}
          >
            <div className={S.specialIcon}>
              {specialIcon && <Icon icon={specialIcon}/>}
              {!specialIcon && xpCost && (
                <div className={S.xpCost}>
                  {xpCost.max ? getXPDisplayValue(xpCost.level, xpCost.max, '-') : xpCost.level}
                </div>
              )}
            </div>
          </div>

          <div 
            className={classNames(
              S.title,
              S[`title_${type}`],
              displaySideXP && S.title_withSideXP
            )}
          >
            <DividerText
              defaultValue={translatedName}
              className={S.titleContent}
              inputClassName={S.titleInput}
              onChange={setTitle}
              fixedFontSize={false}
            />
          </div>

          <div className={S.previewIcon} onClick={selectPreviewIcon}>
            {previewIcon && <Icon icon={previewIcon}/>}
          </div>

          <div className={classNames(
              S.pattern,
              S.patternHandler
            )}
            onClick={selectIcon}
          />
          
          {size && (
            <div className={S.size}>
              {specialIcon && (
                <div className={S.sizeIcon}>
                  <Icon icon={specialIcon}/>
                </div>
              )}
              <div className={S.sizeNumber}>
                {size}
              </div>
            </div>
          )}
          <div className={S.content}>
            <img src={scratches} alt="" className={classNames(S.scratches, S.scratches_1)}/>

            <img src={scratches} alt="" className={classNames(S.scratches, S.scratches_2)}/>

            {isTab && (
              <>
                <div className={S.tabHeaderBox}/>
                <div className={S.tabHeader}>
                  <div className={S.tabHeaderOverlay}/>
                </div>
                <img 
                  className={classNames(
                    S.tabTentacles,
                    S.tabTentacles_left
                  )}
                  src={tabTentacles}
                />
                <img 
                  className={classNames(
                    S.tabTentacles,
                    S.tabTentacles_right
                  )}
                  src={tabTentacles}
                />
                <img 
                  className={classNames(
                    S.tabTopLine,
                    S.tabTopLine_left
                  )}
                  src={tabTopLine}
                />
                 <img 
                  className={classNames(
                    S.tabTopLine,
                    S.tabTopLine_right
                  )}
                  src={tabTopLine}
                />
              </>
            )}

            {displaySideXP && xpCost && (
              <div className={S.sideXP}>
                <ArkhamDecoSideXP xpCost={xpCost}/>
              </div>
            )}

            {scenario && (
              <>
                <div className={S.scenarioCorner}>
                  <div className={S.scenarioName}>
                    {scenario?.number_text || (
                      <div className={S.scenarioIcon}>
                        <Icon icon='typejournal'/>
                      </div>
                    )}
                  </div>
                  <img
                    className={S.scenarioTentacles}
                    src={scenarioTentacles} 
                  />
                </div>
              </>
            )}

            <img 
              src={topLine} 
              className={classNames(
                S.topLine,
                isScenario && S.topLine_scenario
              )} 
            alt="" />
            <div 
              className={S.preview}
            >
            </div>

            <img 
              src={isTab ? tabTopCorner : topLeftCorner} 
              className={classNames(
                S.topLeftCorner
              )} 
              alt="" 
            />
            <img 
              src={topRightCornerImage}
              className={classNames(
                S.topRightCorner,
                isScenario && S.topRightCorner_scenario
              )} 
              alt="" 
            />

            <img 
              src={centerBorder} 
              className={classNames(
                S.centerBorder,
                S.centerBorder_left
              )} 
              alt="" 
            />
            <img 
              src={centerBorder} 
              className={classNames(
                S.centerBorder,
                S.centerBorder_right
              )} 
              alt="" 
            />
            <img src={pattern} className={S.pattern} alt="" />
            <img src={bottomLine} className={S.bottomLine} alt="" />
            {icon && (
              <div className={S.icon}>
                <Icon icon={icon}/>
              </div>
            )}
            <div
                className={classNames(
                  S.bottomCorner,
                  S.bottomCorner_left
                )}
              >
                <img src={bottomTentacle} className={S.bottomTentacle} alt="" />
                <img src={bottomCorner} className={S.bottomCornerImage} alt="" />
              </div>
              <div
                className={classNames(
                  S.bottomCorner,
                  S.bottomCorner_right
                )}
              >
                <img src={bottomTentacle} className={S.bottomTentacle} alt="" />
                <img src={bottomCorner} className={S.bottomCornerImage} alt="" />
              </div>
          </div>
        </div>
      </DividerContent>
    </div>
  );
}