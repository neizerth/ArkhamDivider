import { useAppSelector } from "@/hooks/useAppSelector";
import { selectActivePopupId } from "@/store/features/app/app";
import { IconSelectPopup } from "../iconSelect/IconSelectPopup/IconSelectPopup";
import { PopupType } from "@/types/ui";

export const ActivePopup = () => {
  const id = useAppSelector(selectActivePopupId);
  return (
    <>
      {id === PopupType.ICON_SELECT && (
        <IconSelectPopup show={true}/>
      )}
    </>
  );
}