import { IDivider } from '@/types/dividers';
import S from './ArkhamesqueClassicDivider.module.scss';
import classNames from 'classnames';
import { DividerContent } from '../../common/DividerContent/DividerContent';
import { useStoryTranslation } from '@/hooks/useStoryTranslation';
import { useIconSelect } from '@/hooks/useIconSelect';
import { useState } from 'react';
import { getDividerData } from './data/getDividerData';
import { useSelector } from 'react-redux';
import { selectArkhamesqueData } from '@/store/features/arkhamesque/arkhamesque';
import { DividerText } from '../../common/DividerText/DividerText';
import { NotExportable } from '@/components/ui/behavior/NotExportable/NotExportable';
import { DividerMenu } from '../../common/DividerMenu/DividerMenu';
import { selectLanguage } from '@/store/features/language/language';
import { Icon } from '@/components/ui/icons/Icon/Icon';
import { TextFit } from '@/components/ui/behavior/TextFit/TextFit';
import { XPCost } from '@/types/game';
import { ArkhamesqueClassicDividerPlayerXPCostTitle as XPCostTitle } from '../ArkhamesqueClassicDividerPlayerXPCostTitle/ArkhamesqueClassicDividerPlayerXPCostTitle';

export type ArkhamesqueClassicDividerProps = IDivider;

export const mapDefaultIcon = (icon?: string) => icon === 'multiclass' ? 'multiclass_arkhamesque' : icon;

export const ArkhamesqueClassicDivider = (props: ArkhamesqueClassicDividerProps) => {
  const { 
    id,
    story, 
    name = '',
    type,
    xpCost
  } = props;

  const language = useSelector(selectLanguage);
  const data = useSelector(selectArkhamesqueData);
	const { t } = useStoryTranslation(story);
  const translatedName = t(name);
  const realLanguage = translatedName === name ? 'en' : language;

	const [title, setTitle] = useState(translatedName);

  const [icon, selectIcon] = useIconSelect({
		defaultIcon: mapDefaultIcon(props.icon)
	});

  const [specialIcon, selectSpecialIcon] = useIconSelect({
		defaultIcon: mapDefaultIcon(props.campaignIcon || props.specialIcon || props.icon)
	});

  const item = data && getDividerData({
    data,
    divider: props
  });

  const titleInputClassName = classNames(
    S.titleInput
  )

  const scenarioNumber = item?.scenario?.number_text || props.scenario?.number_text;
  const showPreviewIcon = item?.icon !== false && item?.previewIcon !== false;
  const showSpecialIcon = item?.icon !== false;

  return (
    <div 
      className={classNames(
        S.container,
        S[type],
        S[realLanguage]
      )}
      data-scenario-id={props.scenario?.id}
    >
      <DividerContent className={S.dividerContent}>
        {item && (
          <>
            {icon && showPreviewIcon && (
              <div className={S.icon} onClick={selectIcon}>
                <Icon 
                  icon={icon} 
                  scale='circle'
                  scaleBy={0.93}
                />
              </div>
            )}
            {specialIcon && showSpecialIcon && (
              <div 
                className={classNames(
                  S.specialIcon,
                  S[`specialIcon_${specialIcon}`]
                )} 
                onClick={selectSpecialIcon}
              >
                <Icon icon={specialIcon} scale='circle'/>
              </div>
            )}
            {item.scenario && scenarioNumber && (
              <div className={S.specialText}>
                <TextFit text={scenarioNumber} className={S.specialTextContainer}/>
              </div>
            )}
            {xpCost && xpCost?.level !== XPCost.NO_COST && (
              <div className={S.specialText}>
                <XPCostTitle
                  xpCost={xpCost}
                />
              </div>
            )}
            <div 
              className={classNames(
                S.title,
                S[type]
              )}
            >
              <DividerText
                defaultValue={translatedName}
                className={S.titleControl}
                inputClassName={titleInputClassName}
                onChange={setTitle}
                fixedFontSize={false}
              />
            </div>
            <img 
              crossOrigin='anonymous'
              src={item.image}
              className={S.image}
            />
            <NotExportable>
              {/* <DividerMenu id={id} className={S.menu}/> */}
            </NotExportable>
          </>
        )}
      </DividerContent>
    </div>
  );
}