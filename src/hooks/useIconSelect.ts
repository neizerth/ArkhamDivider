import { useEffect, useState } from "react"
import { useAppSelector } from "./useAppSelector";
import { selectActivePopupId, setActivePopupId } from "@/store/features/app/app";
import { PopupType } from "@/types/ui";
import { useAppDispatch } from "./useAppDispatch";
import { selectPopupIcon, setPopupIcon } from "@/store/features/icons/icons";

export const useIconSelect = ({
  defaultIcon
}: {
  defaultIcon?: string
}) => {
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
    dispatch(setPopupIcon({
      default: defaultIcon,
      current: icon
    }));
    setPopupOpen(true);
  }

  return [icon, openPopup] as [
    string | null,
    () => void 
  ];
}