import S from './ArkhamStarter3mmDivider.module.scss';

import background from './images/background.png';
import iconCornerImage from './images/iconCorner.png';
import { DividerContent, DividerMenu, DividerText, Icon, NotExportable, TextFit } from '@/components';
import classNames from 'classnames';
import { ArkhamStarter3mmDividerStrip as Strip } from '../ArkhamStarter3mmDividerStrip/ArkhamStarter3mmDividerStrip';
import { getSecondaryStripColor, getStripColor } from './colors/stripColor';
import { useEffect, useState } from 'react';
import { selectLanguage } from '@/store/features/language/language';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useIconSelect } from '@/hooks/useIconSelect';
import { ArkhamStarter3mmPlayerCorner as PlayerCorner } from '../ArkhamStarter3mmPlayerCorner/ArkhamStarter3mmPlayerCorner';
import { getPlayerCornerColor } from './colors/playerCornerColor';
import { DividerProps } from '../../common/Divider/Divider';
import { useStoryTranslation } from '@/hooks/useStoryTranslation';
import { DividerType } from '@/types/dividers';
import { XPCost } from '@/types/game';

export const ArkhamStarter3mmDivider = (props: DividerProps) => {
  const { t } = useStoryTranslation(props.story);
  const {
    story,
    name = '',
    xpCost,
    id,
    type,
    className
  } = props;

  const [previewIcon, setPreviewIcon] = useIconSelect({
    defaultIcon: props.previewIcon || props.icon
  });

  const isPlayer = type === DividerType.PLAYER;

  const [playerIcon, setPlayerIcon] = useIconSelect();
  const [campaignIcon, setCampaignIcon] = useIconSelect({
    defaultIcon: props.campaignIcon
  });

  const defaultStoryName = story && t(story.name);
  const [storyName, setStoryName] = useState(defaultStoryName);

  const translatedName = t(name);
  const [title, setTitle] = useState(translatedName);

	const language = useAppSelector(selectLanguage);
	const realLanguage = translatedName === name ? 'en' : language;
  
  useEffect(() => {
    setStoryName(defaultStoryName);
  }, [defaultStoryName]);

  const xpDefaultTitle = xpCost?.level && xpCost.max ? 
    t('Lv. {{level}} ~ {{max}}', xpCost) : 
    t('Lv. {{level}}', xpCost);

  const [xpTitle, setXPTitle] = useState(xpDefaultTitle);

  useEffect(() => {
    setXPTitle(xpDefaultTitle);
  }, [xpDefaultTitle]);

  const specialIcon = (() => {
    if (isPlayer) {
      return playerIcon;
    }
    return previewIcon;
  })();

  const setSpecialIcon = isPlayer ? setPlayerIcon : setPreviewIcon;

  const showStrip = Boolean(story);
  // const [showStrip, setShowStrip] = useState(Boolean(story));

  // const toggleStrip = () => setShowStrip(!showStrip);

  const stripColor = getStripColor(props);
  const secondaryStripColor = getSecondaryStripColor(props);

  const playerCornerColor = getPlayerCornerColor(props);

  const showXPCost = xpCost && xpCost.level !== XPCost.NO_COST;

  return (
    <div className={classNames(
      S.container,
      S[realLanguage],
      className
    )}>
      <DividerContent className={S.content}>
        <NotExportable>
          <div className={S.menu}>
            <DividerMenu id={id} className={S.menuInner}/>
          </div>
        </NotExportable>
        <img className={S.background} src={background}/>
        {showXPCost && xpTitle && (
          <>
            <div className={classNames(
              S.xpCost,
              S.xpCost_horizontal
            )}>
              <DividerText
                defaultValue={xpTitle}
                onChange={setXPTitle}
                onClear={() => setXPTitle(xpDefaultTitle)}
                fixedFontSize={true}
              />
            </div>
            <div className={classNames(
              S.xpCost,
              S.xpCost_vertical
            )}>
              <div className={classNames(
                S.verticalContainer,
                S.verticalXPContainer
              )}>
                <TextFit text={xpTitle} key={xpTitle}/>
              </div>
            </div>
          </>
        )}
        {!playerIcon && isPlayer && playerCornerColor && (
          <div 
            className={S.playerCorner}
            onClick={setPlayerIcon}
          >
            <PlayerCorner color={playerCornerColor}/>
          </div>
        )}
        {isPlayer && campaignIcon && (
          <>
            <div 
              className={classNames(
                S.campaignIcon,
                S.campaignIcon_horizontal
              )} 
              onClick={setCampaignIcon}
            >
              <Icon icon={campaignIcon}/>
            </div>
            <div 
              className={classNames(
                S.campaignIcon,
                S.campaignIcon_vertical
              )} 
              onClick={setCampaignIcon}
            >
              <Icon icon={campaignIcon}/>
            </div>
          </>
        )}
        {specialIcon && (
          <>
            <div
              className={classNames(
                S.iconCorner,
                S.iconCorner_horizontal
              )}
              onClick={setSpecialIcon}
            >
              <img 
                src={iconCornerImage} 
                className={S.iconCornerImage} 
              />
              <div className={S.icon}>
                <Icon icon={specialIcon}/>
              </div>
            </div>
            <div
              className={classNames(
                S.iconCorner,
                S.iconCorner_vertical
              )}
              onClick={setSpecialIcon}
            >
              <div className={classNames(
                S.verticalContainer,
                S.verticalIconContainer
              )}>
                <img 
                  src={iconCornerImage} 
                  className={S.iconCornerImage} 
                />
                <div className={S.icon}>
                  <Icon icon={specialIcon}/>
                </div>
              </div>
            </div>
          </>
        )}
        <div 
          className={classNames(
            S.title,
            S.title_horizontal,
            xpTitle && S.title_withXP
          )}
          >
            <DividerText
              defaultValue={translatedName}
              onChange={setTitle}
              onClear={() => setTitle(translatedName)}
              fixedFontSize={false}
            />
        </div>
        <div 
          className={classNames(
            S.title,
            S.title_vertical,
            campaignIcon && isPlayer && S.title_vertical_withPlayerStrip
            // playerCornerColor && showStrip && S.title_vertical_withPlayerStrip
          )}
          >
            <div 
              className={classNames(
                S.verticalContainer,
                S.verticalTitleContainer
              )}
            >
              <TextFit text={title} key={title}/>
            </div>
        </div>
        
        {showStrip && (
          <>
            <div
              className={classNames(
                S.strip,
                S.strip_vertical,
                !showStrip && S.strip_hidden,
                xpCost && S.strip_vertical_withXPCost
              )}
              // onClick={toggleStrip}
            >
              <Strip 
                color={stripColor}
                secondaryColor={secondaryStripColor}
                reverse={Boolean(xpCost)}
                text={storyName}
              />
            </div>
            <div
              className={classNames(
                S.strip,
                S.strip_horizontal,
                !showStrip && S.strip_hidden
              )} 
              // onClick={toggleStrip}
            >
              <Strip 
                color={stripColor}
                secondaryColor={secondaryStripColor}
                horizontal
                editable
                onChange={setStoryName}
                onClear={() => setStoryName(defaultStoryName)}
                text={storyName}
              />
            </div>
          </>
        )}
      </DividerContent>
    </div>
  );
}