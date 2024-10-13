import { Popup, PopupProps } from '@/components/ui/Popup/Popup';
import S from './IconSelectPopup.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIcons } from '@/store/features/icons/icons';
import { selectStories } from '@/store/features/stories/stories';
import { selectEncounterSets } from '@/store/features/encounterSets/encounterSets';
import { getIconGroups } from '@/features/icons/getIconGroups';

export type IconSelectPopupProps = PopupProps & {

}

export const IconSelectPopup = ({
  show,
  className,
  contentClassName
}: IconSelectPopupProps) => {
  const icons = useAppSelector(selectIcons);
  const stories = useAppSelector(selectStories);
  const encounterSets = useAppSelector(selectEncounterSets);

  const iconGroups = getIconGroups({
    icons,
    stories,
    encounterSets
  });

  return (
    <Popup
      show={show}
      className={className}
      contentClassName={contentClassName}
    >
      
    </Popup>
  );
}