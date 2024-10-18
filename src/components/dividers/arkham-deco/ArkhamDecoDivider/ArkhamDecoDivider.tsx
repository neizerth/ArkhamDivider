import { DividerType, IDivider } from '@/types/dividers';
import { DividerContent } from '../../DividerContent/DividerContent';
import S from './ArkhamDecoDivider.module.scss';
import paper from './images/paper.png'

import bottomCorner from './images/bottom-corner.svg';
import bottomTentacle from './images/bottom-tentacle.svg';
import bottomLine from './images/bottom-line.svg';
import pattern from './images/pattern.png';
import scratches from './images/scratches.png';
import centerBorder from './images/center-border.svg';
import topLeftCorner from './images/top-left-corner.png'
import spellBook from './images/spell-book.png'
import topRightCorner from './images/top-right-corner.png'
import scenarioTopRightCorner from './images/scenario-top-right-corner.png'
import topLine from './images/top-line.png'
import scenarioTentacles from './images/scenario-tentacles.png'

import classNames from 'classnames';
import { DividerText, Icon } from '@/components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLanguage } from '@/store/features/language/language';
import { selectLayout } from '@/store/features/layout/layout';
import { useIconSelect } from '@/hooks/useIconSelect';

export type ArkhamDecoDividerProps = IDivider & {

}

export const ArkhamDecoDivider = ({
  ...props
}: ArkhamDecoDividerProps) => {
  const {
    name,
    type,
    scenario
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
  const { color } = useAppSelector(selectLayout); 

  const translatedName = t(name);

	const [title, setTitle] = useState(translatedName);

	const language = useAppSelector(selectLanguage);
	const realLanguage = translatedName === name ? 'en' : language;

  // const isScenario = type === DividerType.SCENARIO && scenario?.number_text;
  const isScenario = type === DividerType.SCENARIO;
  const isCampaign = type === DividerType.CAMPAIGN;

	useEffect(() => {
		setTitle(translatedName);
	}, [translatedName]);
  
  return (
    <div className={S.container}>
      <DividerContent>

        <div className={S.card}/>

        {color && (
          <img src={paper} alt="" className={S.paper}/>
        )}

        
        <div 
          className={S.campaignIcon} 
          onClick={selectSpecialIcon}
        >
          {specialIcon && <Icon icon={specialIcon}/>}
        </div>

        <div 
          className={classNames(
            S.title,
            S[`title_${type}`]
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
        

        <div className={S.content}>
          <img src={scratches} alt="" className={S.scratches}/>

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
            src={topLeftCorner} 
            className={classNames(
              S.topLeftCorner
            )} 
            alt="" 
          />
          <img 
            src={isScenario ? scenarioTopRightCorner : topRightCorner} 
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
      </DividerContent>
    </div>
  );
}