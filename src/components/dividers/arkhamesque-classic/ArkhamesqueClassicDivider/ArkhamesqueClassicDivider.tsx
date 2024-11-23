import { IDivider } from '@/types/dividers';
import S from './ArkhamesqueClassicDivider.module.scss';
import classNames from 'classnames';
import { DividerContent } from '../../common/DividerContent/DividerContent';
import { useStoryTranslation } from '@/hooks/useStoryTranslation';
import { useIconSelect } from '@/hooks/useIconSelect';
import { useState } from 'react';
import { getDividerData } from './getDividerData';
import { useSelector } from 'react-redux';
import { selectArkhamesqueData } from '@/store/features/arkhamesque/arkhamesque';
import { DividerText } from '../../common/DividerText/DividerText';
import { NotExportable } from '@/components/ui/behavior/NotExportable/NotExportable';
import { DividerMenu } from '../../common/DividerMenu/DividerMenu';
import { language } from '@/store/features';
import { selectLanguage } from '@/store/features/language/language';
import { Icon } from '@/components/ui/icons/Icon/Icon';
import { TextFit } from '@/components/ui/behavior/TextFit/TextFit';

export type ArkhamesqueClassicDividerProps = IDivider;

export const ArkhamesqueClassicDivider = (props: ArkhamesqueClassicDividerProps) => {
  const { 
    id,
    story, 
    name = '',
    type
  } = props;

  const language = useSelector(selectLanguage);
  const data = useSelector(selectArkhamesqueData);
	const { t } = useStoryTranslation(story);
  const translatedName = t(name);
  const realLanguage = translatedName === name ? 'en' : language;

	const [title, setTitle] = useState(translatedName);

  const [icon, selectIcon] = useIconSelect({
		defaultIcon: props.icon
	});

  const [campaignIcon, selectCampaignIcon] = useIconSelect({
		defaultIcon: props.campaignIcon
	});

  const item = data && getDividerData({
    data,
    divider: props
  });

  const titleInputClassName = classNames(
    S.titleInput
  )

  const scenarioNumber = item?.scenario?.number_text || props.scenario?.number_text;

  return (
    <div 
      className={classNames(
        S.container,
        S[realLanguage]
      )}
      data-scenario-id={props.scenario?.id}
    >
      <DividerContent className={S.dividerContent}>
        {item && (
          <>
            {icon && (
              <div className={S.icon} onClick={selectIcon}>
                <Icon 
                  icon={icon} 
                  scale='circle'
                  scaleBy={0.93}
                />
              </div>
            )}
            {campaignIcon && (
              <div 
                className={classNames(
                  S.campaignIcon,
                  S[`campaignIcon_${campaignIcon}`]
                )} 
                onClick={selectCampaignIcon}
              >
                <Icon icon={campaignIcon} scale='circle'/>
              </div>
            )}
            {item.scenario && scenarioNumber && (
              <div className={S.scenarioNumber}>
                <TextFit text={scenarioNumber} className={S.scenarioNumberContainer}/>
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