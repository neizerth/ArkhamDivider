import { useEffect, useState } from "react"
import { useAppSelector } from "./useAppSelector";
import { clearActivePopupId, selectActivePopupId, setActivePopupId } from "@/store/features/app/app";
import { PopupType } from "@/types/ui";
import { useAppDispatch } from "./useAppDispatch";
import { selectPopupIcon, setPopupIcon } from "@/store/features/icons/icons";

export const useSelectIcon = (defaultIcon: string | null = null) => {
  const dispatch = useAppDispatch();
  const popupId = useAppSelector(selectActivePopupId);
  const popupIcon = useAppSelector(selectPopupIcon);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [icon, setIcon] = useState(defaultIcon);

  useEffect(() => {
    if (!isPopupOpen || popupId) {
      return;
    }
    setPopupOpen(false);
    setIcon(popupIcon);

    dispatch(clearActivePopupId());

  }, [popupId, isPopupOpen]);

  const openPopup = () => {
    dispatch(setActivePopupId(PopupType.ICON_SELECT));
    dispatch(setPopupIcon(defaultIcon));
    setPopupOpen(true);
  }

  return [icon, openPopup] as [
    string | null,
    () => void 
  ];
}