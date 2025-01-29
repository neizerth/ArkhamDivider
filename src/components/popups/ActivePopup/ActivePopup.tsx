import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { selectActivePopupId } from "@/shared/lib/store/features/app/app";
import { IconSelectPopup } from "../iconSelect/IconSelectPopup/IconSelectPopup";
import { PopupType } from "@/shared/model/types/ui";

export const ActivePopup = () => {
	const id = useAppSelector(selectActivePopupId);
	return <>{id === PopupType.ICON_SELECT && <IconSelectPopup show={true} />}</>;
};
