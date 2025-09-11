import classNames from 'classnames';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NotExportable } from '@/components/ui/behavior/NotExportable/NotExportable';
import { TextFit } from '@/components/ui/behavior/TextFit/TextFit';
import { Icon } from '@/components/ui/icons/Icon/Icon';
import { delay } from '@/shared/lib/features/util/common';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { useIconSelect } from '@/shared/lib/hooks/useIconSelect';
import { useStoryTranslation } from '@/shared/lib/hooks/useStoryTranslation';
import { selectArkhamesqueData } from '@/shared/store/features/dividers/arkhamesque/arkhamesque';
import {
  addLoadIndex,
  removeDivider,
  selectLoadIndex,
  setNextLoadIndex,
} from '@/shared/store/features/dividers/dividers';
import { selectLanguage } from '@/shared/store/features/language/language';
import { selectCornerRadius } from '@/shared/store/features/print/print';
import { XPCost } from '@/shared/types/game';
import type { DividerProps } from '../../common/Divider/Divider';
import { DividerContent } from '../../common/DividerContent/DividerContent';
import { DividerCornerRadius } from '../../common/DividerCornerRadius/DividerCornerRadius';
import { DividerMenu } from '../../common/DividerMenu/DividerMenu';
import { DividerText } from '../../common/DividerText/DividerText';
import { ArkhamesqueClassicDividerCanvasMemo as Canvas } from '../ArkhamesqueClassicDividerCanvas/ArkhamesqueClassicDividerCanvas';
import { ArkhamesqueClassicDividerPlayerXPCostTitle as XPCostTitle } from '../ArkhamesqueClassicDividerPlayerXPCostTitle/ArkhamesqueClassicDividerPlayerXPCostTitle';
import S from './ArkhamesqueClassicDivider.module.scss';
import { getDividerData } from './data/getDividerData';

export type ArkhamesqueClassicDividerProps = DividerProps;

export const ArkhamesqueClassicDivider = (props: ArkhamesqueClassicDividerProps) => {
  const { id, story, name = '', type, xpCost } = props;

  const dispatch = useAppDispatch();
  const language = useSelector(selectLanguage);
  const data = useSelector(selectArkhamesqueData);
  const loadIndex = useSelector(selectLoadIndex);
  const cornerRadius = useAppSelector(selectCornerRadius);

  const { t } = useStoryTranslation(story);

  const translatedName = t(name);
  const realLanguage = translatedName === name ? 'en' : language;

  const [_, setTitle] = useState(translatedName);

  const mapDefaultIcon = (icon?: string) =>
    icon === 'multiclass' ? 'multiclass_arkhamesque' : icon;

  const [icon, selectIcon] = useIconSelect({
    defaultIcon: mapDefaultIcon(props.icon),
  });

  const [specialIcon, selectSpecialIcon] = useIconSelect({
    defaultIcon: mapDefaultIcon(props.campaignIcon || props.specialIcon || props.icon),
  });

  const [isRendered, setIsRendered] = useState(false);

  const isLoading = id === loadIndex;

  useLayoutEffect(() => {
    setIsRendered(false);
  }, []);

  useEffect(() => {
    if (isRendered) {
      return;
    }
    dispatch(addLoadIndex(id));
  }, [isRendered, id, dispatch]);

  const onRender = async () => {
    setIsRendered(true);
    // console.log('render!', index, loadIndex, isRendered)
    if (isLoading) {
      await delay(100);
      dispatch(setNextLoadIndex());
    }
  };

  const item =
    data &&
    getDividerData({
      data,
      divider: props,
    });

  useEffect(() => {
    if (!item?.image) {
      dispatch(removeDivider(id));
    }
  }, [item, id, dispatch]);

  const titleInputClassName = classNames(S.titleInput);

  const scenarioNumber = item?.scenario?.number_text || props.scenario?.number_text;
  const showPreviewIcon = item?.icon !== false && item?.previewIcon !== false;
  const showSpecialIcon = item?.icon !== false;
  const showXP = item?.xp !== false;

  const showCanvas = isLoading || isRendered;

  return (
    <div
      className={classNames(S.container, S[type], S[realLanguage])}
      data-scenario-id={props.scenario?.id}
      data-icon={icon}
      data-special-icon={specialIcon}
    >
      <DividerContent className={S.dividerContent}>
        {item && (
          <>
            {!isRendered && (
              <div className={classNames(S.loader, isRendered && S.loaded)}>
                <Icon icon={isLoading ? 'action' : 'hour-glass'} />
              </div>
            )}
            {isRendered && (
              <div className={S.renderContent}>
                {item.scenario && scenarioNumber && (
                  <div className={S.specialText}>
                    <TextFit text={scenarioNumber} className={S.specialTextContainer} />
                  </div>
                )}
                {xpCost && xpCost?.level !== XPCost.NO_COST && showXP && (
                  <div className={S.specialText}>
                    <XPCostTitle xpCost={xpCost} />
                  </div>
                )}
                <div className={classNames(S.title, S[type])}>
                  <DividerText
                    defaultValue={translatedName}
                    className={S.titleControl}
                    inputClassName={titleInputClassName}
                    onChange={setTitle}
                    fixedFontSize={false}
                  />
                </div>
                {showPreviewIcon && <div className={S.previewHandler} onClick={selectIcon} />}
                {showSpecialIcon && (
                  <div className={S.specialHandler} onClick={selectSpecialIcon} />
                )}

                <NotExportable>
                  <DividerMenu id={id} className={S.menu} />
                </NotExportable>
              </div>
            )}

            {showCanvas && (
              <Canvas
                className={S.canvas}
                image={item.image}
                previewIcon={showPreviewIcon && icon}
                specialIcon={showSpecialIcon && specialIcon}
                onRender={onRender}
              />
            )}
          </>
        )}
        {cornerRadius && (
          <NotExportable>
            <DividerCornerRadius className={S.cornerRadius} />
          </NotExportable>
        )}
      </DividerContent>
    </div>
  );
};
