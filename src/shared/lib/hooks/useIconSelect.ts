import { useEffect, useState } from 'react';
import { selectActivePopupId, setActivePopupId } from '@/shared/store/features/app/app';
import { selectPopupIcon, setPopupIcon } from '@/shared/store/features/icons/icons';
import { PopupType } from '@/shared/types/ui';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export const useIconSelect = ({ defaultIcon }: { defaultIcon?: string } = {}) => {
  const dispatch = useAppDispatch();
  const popupId = useAppSelector(selectActivePopupId);
  const popupIcon = useAppSelector(selectPopupIcon);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [icon, setIcon] = useState(defaultIcon);

  useEffect(() => {
    setIcon(defaultIcon);
  }, [defaultIcon]);

  useEffect(() => {
    if (!isPopupOpen || popupId) {
      return;
    }
    setPopupOpen(false);
    setIcon(popupIcon?.current);
  }, [popupId, isPopupOpen, popupIcon]);

  const openPopup = () => {
    dispatch(setActivePopupId(PopupType.ICON_SELECT));
    dispatch(
      setPopupIcon({
        default: defaultIcon,
        current: icon,
      })
    );
    setPopupOpen(true);
  };

  return [icon, openPopup] as [string | undefined, () => void];
};
