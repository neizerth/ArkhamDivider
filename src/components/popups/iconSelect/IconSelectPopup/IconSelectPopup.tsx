import { Popup, PopupProps } from '@/components/ui/Popup/Popup';
import S from './IconSelectPopup.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIcons, selectPopupIcon, setPopupIcon } from '@/store/features/icons/icons';
import { selectStories } from '@/store/features/stories/stories';
import { selectEncounterSets } from '@/store/features/encounterSets/encounterSets';
import { getIconGroups } from '@/features/icons/getIconGroups';
import { useTranslation } from 'react-i18next';
import { Button, Col, Icon, Row } from '@/components';
import { createRef, useMemo, useRef, useState } from 'react';
import { ButtonType } from '@/types/ui';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { clearActivePopupId } from '@/store/features/app/app';
import { IconSelectView } from '../IconSelectView/IconSelectView';
import { IconSelectNav } from '../IconSelectNav/IconSelectNav';
import { IconSelectPreview } from '../IconSelectPreview/IconSelectPreview';
import classNames from 'classnames';
import { useScrollSpy } from '@/hooks/useScollSpy';

export type IconSelectPopupProps = PopupProps & {

}

export const IconSelectPopup = ({
  show,
  className,
  contentClassName
}: IconSelectPopupProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const icons = useAppSelector(selectIcons);
  const stories = useAppSelector(selectStories);
  const encounterSets = useAppSelector(selectEncounterSets);

  const popupIcon = useAppSelector(selectPopupIcon);
  const [selectedIcon, selectIcon] = useState(popupIcon?.current);

  const iconGroups = getIconGroups({
    icons,
    stories,
    encounterSets
  });

  const viewRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  if (sectionRefs.current.length === 0) {
    sectionRefs.current = iconGroups.map(() => createRef<HTMLDivElement>())
  }

  const activeSection = useScrollSpy({
    sectionElementRefs: sectionRefs.current,
    scrollingElement: viewRef,
    offsetPx: -400
  });

  const close = () => dispatch(clearActivePopupId());
  const select = () => {
    
    dispatch(setPopupIcon({
      current: selectedIcon
    }));

    close();
  }
  const clear = () => {
    dispatch(setPopupIcon({
      current: popupIcon?.default
    }));

    close();
  }

  return (
    <Popup
      show={show}
      className={className}
      contentClassName={classNames(
        contentClassName,
        S.content
      )}
      scrollable={false}
    >
      <Col>
        <div className={S.row}>
          <div className={S.view}>
            {useMemo(() => (
              <IconSelectView
                iconGroups={iconGroups}
                ref={viewRef}
                sectionRefs={sectionRefs.current}
                defaultIcon={selectedIcon}
                onChange={selectIcon}
              />
            ), [sectionRefs, selectedIcon])}
          </div>

          <Col className={S.sidebar}>
            <IconSelectPreview
              defaultIcon={selectedIcon}
              onChange={selectIcon}
            />
            <div className={S.nav}>
              <IconSelectNav
                activeSection={activeSection}
                icon={selectedIcon}
                iconGroups={iconGroups}
                sectionRefs={sectionRefs.current}
              />
            </div>
          </Col>
        </div>
        <Row className={S.actions}>
          <Row>
            <Button onClick={select}>
              <Icon icon='check-thin'/>{t('Okay')}
            </Button>
          </Row>
          <Row>
            <Button onClick={clear} buttonType={ButtonType.DANGER}>
              <Icon icon={'repeat'}/>
              {t('Default')}
            </Button>
            <Button buttonType={ButtonType.SECONDARY} onClick={close}>
              <Icon icon='dismiss'/>{t('Close')}
            </Button>
          </Row>
        </Row>
      </Col>
    </Popup>
  );
}