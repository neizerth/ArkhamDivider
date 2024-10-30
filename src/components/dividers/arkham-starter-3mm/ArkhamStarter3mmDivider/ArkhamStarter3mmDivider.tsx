import S from './ArkhamStarter3mmDivider.module.scss';

import background from './images/background.png';
import iconCornerImage from './images/iconCorner.png';
import { DividerContent, DividerMenu, DividerText, Icon, TextFit } from '@/components';
import classNames from 'classnames';
import { ArkhamStarter3mmDividerStrip as Strip } from '../ArkhamStarter3mmDividerStrip/ArkhamStarter3mmDividerStrip';
import { getSecondaryStripColor, getStripColor } from './colors/stripColor';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { selectLanguage } from '@/store/features/language/language';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useIconSelect } from '@/hooks/useIconSelect';
import { ArkhamStarter3mmPlayerCorner as PlayerCorner } from '../ArkhamStarter3mmPlayerCorner/ArkhamStarter3mmPlayerCorner';
import { getPlayerCornerColor } from './colors/playerCornerColor';
import { DividerProps } from '../../common/Divider/Divider';

export const ArkhamStarter3mmDivider = (props: DividerProps) => {
  const { t } = useTranslation();
  const {
    story,
    name = '',
    xpCost,
    id,
    className
  } = props;

  const [previewIcon, setPreviewIcon] = useIconSelect({
    defaultIcon: props.previewIcon || props.icon
  });

  const [playerIcon, setPlayerIcon] = useIconSelect();

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

  const specialIcon = playerIcon || (story && previewIcon);
  const setSpecialIcon = story ? setPreviewIcon : setPlayerIcon;

  const showStrip = Boolean(story);
  // const [showStrip, setShowStrip] = useState(Boolean(story));

  // const toggleStrip = () => setShowStrip(!showStrip);

  const stripColor = getStripColor(props);
  const secondaryStripColor = getSecondaryStripColor(props);

  const playerCornerColor = getPlayerCornerColor(props);

  return (
    <div className={classNames(
      S.container,
      S[realLanguage],
      className
    )}>
      <DividerContent className={S.content}>
        <div className={S.menu}>
          <DividerMenu id={id} className={S.menuInner}/>
        </div>
        <img className={S.background} src={background}/>
        {xpCost && xpTitle && (
          <>
            <div className={classNames(
              S.xpCost,
              S.xpCost_horizontal
            )}>
              <DividerText
                defaultValue={xpTitle}
                onChange={setXPTitle}
                onClear={() => setXPTitle(xpDefaultTitle)}
                fixedFontSize={false}
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
        {!story && !playerIcon && playerCornerColor && (
          <div 
            className={S.playerCorner}
            onClick={setPlayerIcon}
          >
            <PlayerCorner color={playerCornerColor}/>
          </div>
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
              >
                {storyName && <TextFit text={storyName} key={storyName}/>}
              </Strip>
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
              >
                {storyName && (
                  <DividerText
                    defaultValue={storyName}
                    fixedFontSize={false}
                    fullHeight={false}
                    onChange={setStoryName}
                    onClear={() => setStoryName(defaultStoryName)}
                  />
                )}
              </Strip>
            </div>
          </>
        )}
      </DividerContent>
    </div>
  );
}