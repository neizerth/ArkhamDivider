import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { selectActivePopupId } from '@/shared/store/features/app/app';
import { PopupType } from '@/shared/types/ui';
import { IconSelectPopup } from '../iconSelect/IconSelectPopup/IconSelectPopup';

export const ActivePopup = () => {
  const id = useAppSelector(selectActivePopupId);
  return <>{id === PopupType.ICON_SELECT && <IconSelectPopup show={true} />}</>;
};
