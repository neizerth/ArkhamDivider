import classNames from 'classnames';
import { DividerProps } from '../../common/Divider/Divider';
import { DividerContent } from '../../common/DividerContent/DividerContent';
import { DividerText } from '../../common/DividerText/DividerText';
import S from './RynoDivider.module.scss';
import { useState } from 'react';
import { useStoryTranslation } from '@/shared/lib/hooks/useStoryTranslation';
import { images } from './images';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectBleed } from '@/shared/store/features/print/print';
import { Icon } from '@/components/ui/icons/Icon/Icon';
import { CircleIcon } from '@/components/ui/icons/CircleIcon/CircleIcon';
import { useIconSelect } from '@/shared/lib/hooks/useIconSelect';
import { selectLayout } from '@/shared/store/features/layout/layout';
import { getHeaderFilter } from './getHeaderFilter';
import { DividerType } from '@/shared/types/dividers';

type RynoDividerType = 'horizontal' | 'vertical' | 'verticalXL';

export const RynoDivider = (props: DividerProps) => {
  const bleed = useAppSelector(selectBleed);
  const { name = '', story } = props;
  const { t } = useStoryTranslation(story);
  const layout = useAppSelector(selectLayout);

  const [icon, selectIcon] = useIconSelect({
    defaultIcon: props.icon,
  });

  const [largeIcon, selectLargeIcon] = useIconSelect({
    defaultIcon: props.campaignIcon,
  });

  const [campaignIcon, selectCampaignIcon] = useIconSelect({
    defaultIcon: props.campaignIcon,
  });

  const hasFaction = Boolean(props.faction);
  const hasXP = Boolean(props.xpCost);

  const headerStyle = {
    filter: getHeaderFilter(props),
  };

  const [title, setTitle] = useState(name);
  const translatedName = t(name);
  const titleInputClassName = classNames(S.titleInput);

  const dividerType = (layout.customParams?.type ?? 'horizontal') as RynoDividerType;

  const assets = images[dividerType];

  const storyTitle = story ? t(story.name) : '';

  const containerClassName = classNames(S.container, bleed && S.bleed, S[dividerType]);

  const isGenericFaction = props.faction && !['multiclass'].includes(props.faction);
  const factionImage = `/images/faction/${props.faction}.png`;

  const showCorner = !hasFaction || (hasFaction && !isGenericFaction);

  const isInvestigator = props.type === DividerType.INVESTIGATOR;

  return (
    <div className={containerClassName}>
      <div className={S.assetsContainer}>
        <div className={S.assets}>
          {showCorner && <img className={S.corner} src={assets.corner} alt={title} />}
          {hasFaction && isGenericFaction && (
            <img className={S.factionIcon} src={factionImage} alt={props.faction} />
          )}
          <img className={S.header} src={assets.header} alt={title} style={headerStyle} />
          <img className={S.body} src={assets.body} alt={title} />
        </div>
      </div>
      <DividerContent>
        {story && (
          <div className={S.storyTitle}>
            <DividerText
              defaultValue={storyTitle}
              className={S.storyTitleContent}
              inputClassName={S.storyTitleInput}
              clearClassName={S.titleClear}
              fixedFontSize={false}
            />
          </div>
        )}
        {
          <div className={classNames(S.title, story && S.title_withStory)}>
            <DividerText
              stroke
              strokeClassName={classNames(titleInputClassName, S.textStroke)}
              defaultValue={translatedName}
              className={S.titleContent}
              inputClassName={titleInputClassName}
              onChange={setTitle}
              clearClassName={S.titleClear}
              fixedFontSize={false}
            />
          </div>
        }
        {showCorner && (
          <div className={S.icon} onClick={selectIcon}>
            {icon && (
              <CircleIcon
                icon={icon}
                className={S.iconItem}
                containerClassName={S.iconContainer}
                scaleFactor={{
                  circled: 0.97,
                  all: 0.99,
                }}
              />
            )}
          </div>
        )}
        {largeIcon && (
          <div className={S.largeIcon} onClick={selectLargeIcon}>
            <Icon icon={largeIcon} />
          </div>
        )}
        {campaignIcon && !hasXP && !isInvestigator && (
          <div className={S.campaignIcon} onClick={selectCampaignIcon}>
            <Icon icon={campaignIcon} />
          </div>
        )}
        {props.xpCost && (
          <div className={S.xp}>
            <img className={S.xpInner} src={images.xp} alt={props.xpCost.value} />
            <div className={S.xpValue}>{props.xpCost.value}</div>

            <div className={S.xpLevels}>
              {props.xpCost.level > 0 && (
                <Icon
                  icon={`ae_level_${props.xpCost.level}`}
                  className={classNames(S.lightLevel)}
                  scaleType={false}
                />
              )}
              {
                <Icon
                  icon={`ae_level_${props.xpCost.max ?? (props.xpCost.level || 5)}`}
                  className={classNames(S.maxLevel)}
                  scaleType={false}
                />
              }
            </div>
          </div>
        )}
      </DividerContent>
    </div>
  );
};
