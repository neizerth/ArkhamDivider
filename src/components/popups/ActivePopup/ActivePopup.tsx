import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectActivePopupId } from "@/shared/lib/store/features/app/app";
import { PopupType } from "@/shared/model/types/ui";
import { IconSelectPopup } from "../iconSelect/IconSelectPopup/IconSelectPopup";

export const ActivePopup = () => {
	const id = useAppSelector(selectActivePopupId);
	return <>{id === PopupType.ICON_SELECT && <IconSelectPopup show={true} />}</>;
};
