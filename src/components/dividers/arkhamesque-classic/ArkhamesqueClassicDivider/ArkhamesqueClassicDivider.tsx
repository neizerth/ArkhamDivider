import { IDivider } from '@/types/dividers';
import S from './ArkhamesqueClassicDivider.module.scss';
import classNames from 'classnames';
import { DividerContent } from '../../common/DividerContent/DividerContent';
import { useStoryTranslation } from '@/hooks/useStoryTranslation';
import { useIconSelect } from '@/hooks/useIconSelect';
import { useMemo, useState } from 'react';
import { getDividerData } from './data/getDividerData';
import { useSelector } from 'react-redux';
import { selectArkhamesqueData } from '@/store/features/arkhamesque/arkhamesque';
import { DividerText } from '../../common/DividerText/DividerText';
import { NotExportable } from '@/components/ui/behavior/NotExportable/NotExportable';
import { DividerMenu } from '../../common/DividerMenu/DividerMenu';
import { selectLanguage } from '@/store/features/language/language';
import { TextFit } from '@/components/ui/behavior/TextFit/TextFit';
import { XPCost } from '@/types/game';
import { ArkhamesqueClassicDividerPlayerXPCostTitle as XPCostTitle } from '../ArkhamesqueClassicDividerPlayerXPCostTitle/ArkhamesqueClassicDividerPlayerXPCostTitle';
import { ArkhamesqueClassicDividerIcon as ArkhamesqueIcon} from '../ArkhamesqueClassicDividerIcon/ArkhamesqueClassicDividerIcon';
import { detect } from 'detect-browser';

export type ArkhamesqueClassicDividerProps = IDivider;

export const ArkhamesqueClassicDivider = (props: ArkhamesqueClassicDividerProps) => {
  const { 
    id,
    story, 
    name = '',
    type,
    xpCost,
    index,
    rowIndex
  } = props;

  const browser = useMemo(detect, []);
  const isChrome = browser?.name ==='chrome';

  const language = useSelector(selectLanguage);
  const data = useSelector(selectArkhamesqueData);
	const { t } = useStoryTranslation(story);
  const translatedName = t(name);
  const realLanguage = translatedName === name ? 'en' : language;

	const [_, setTitle] = useState(translatedName);
  const isEven = index % 2 === 0;

  const mapDefaultIcon = (icon?: string) => icon === 'multiclass' ? 'multiclass_arkhamesque' : icon;

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
  const showXP = item?.xp !== false;

  return (
    <div 
      className={classNames(
        S.container,
        isChrome && S.chrome,
        isEven ? S.even : S.odd,
        rowIndex > 1 ? S.row : S.firstRow,
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
                <ArkhamesqueIcon icon={icon}/>
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
                <ArkhamesqueIcon 
                  icon={specialIcon}
                  type="special"
                />
              </div>
            )}
            {item.scenario && scenarioNumber && (
              <div className={S.specialText}>
                <TextFit text={scenarioNumber} className={S.specialTextContainer}/>
              </div>
            )}
            {xpCost && xpCost?.level !== XPCost.NO_COST && showXP && (
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
              <DividerMenu id={id} className={S.menu}/>
            </NotExportable>
          </>
        )}
      </DividerContent>
    </div>
  );
}