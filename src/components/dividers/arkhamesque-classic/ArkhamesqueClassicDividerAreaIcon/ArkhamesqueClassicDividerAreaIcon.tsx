import { ImageAreaIcon, ImageAreaIconProps } from '@/components/ui/icons/ImageAreaIcon/ImageAreaIcon';
import S from './ArkhamesqueClassicDividerAreaIcon.module.scss';
import { propEq } from 'ramda';
import icons from './icons'

export type IIconData = {
  icon: string
  left?: number
  top?: number
  scale?: number
  type?: string
}

export type ArkhamesqueClassicDividerAreaIconProps = ImageAreaIconProps & {
  type?: string
};

export const ArkhamesqueClassicDividerAreaIcon = ({
  type,
  ...props
}: ArkhamesqueClassicDividerAreaIconProps) => {
  const { icon } = props;

  const iconDataList = icons.filter(propEq(icon, 'icon')) as IIconData[];

  const item = iconDataList.find(icon => icon.type === type) || iconDataList[0];

  const size = props.size * (item.scale || 1);
  const left = item.left || 0;
  const top = item.top || 0;

  return (
    <ImageAreaIcon
      {...props}
      size={size}
      top={top}
      left={left}
    />
  );
}