import { PropsWithClassName } from '@/types/util';
import S from './ArkhamesqueClassicDividerPreviewIcon.module.scss';
import { ImageAreaIcon } from '@/components';

export type ArkhamesqueClassicDividerPreviewIconProps = PropsWithClassName & {
  icon: string
}

export const ArkhamesqueClassicDividerPreviewIcon = ({
  className,
  icon
}: ArkhamesqueClassicDividerPreviewIconProps) => {
  return (
    <ImageAreaIcon
      className={className}
      size={80}
      top={77}
      left={127}
      icon={icon}
    />
  );
}