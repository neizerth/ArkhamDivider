import { PropsWithClassName } from '@/types/util';
import S from './ArkhamesqueClassicDividerSpecialIcon.module.scss';
import { ImageAreaContainer } from '@/components/ui/icons/ImageAreaIcon/ImageAreaIcon';
import { ArkhamesqueClassicDividerAreaIcon as Icon } from '../ArkhamesqueClassicDividerAreaIcon/ArkhamesqueClassicDividerAreaIcon';

export type ArkhamesqueClassicDividerSpecialIconProps = PropsWithClassName & {
  icon: string
}

export const ArkhamesqueClassicDividerSpecialIcon = ({
  className,
  icon
}: ArkhamesqueClassicDividerPreviewIconProps) => {
  const container: ImageAreaContainer = {
    x: 532,
    y: 853,
    width: 62,
    height: 62,
    alignX: 'center',
    alignY: 'center'
  }

  return (
    <Icon
      className={className}
      size={60}
      container={container}
      icon={icon}
      type="special"
    />
  );
}