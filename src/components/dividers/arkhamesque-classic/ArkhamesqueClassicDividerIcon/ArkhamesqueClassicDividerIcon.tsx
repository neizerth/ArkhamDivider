import { Icon } from '@/components';
import S from './ArkhamesqueClassicDividerIcon.module.scss';
import icons from './icons';
import { propEq } from 'ramda';

export type ArkhamesqueClassicDividerIconProps = {
  icon: string
  type?: string
}

export type IIconData = {
  icon: string
  left?: number
  top?: number
  scale?: number
  type?: string
}

export const ArkhamesqueClassicDividerIcon = ({
  icon,
  type
}: ArkhamesqueClassicDividerIconProps) => {

  const iconDataList = icons.filter(propEq(icon, 'icon')) as IIconData[];

  const iconData = iconDataList.find(icon => icon.type === type) || iconDataList[0];

  const styles = iconData && {
    transform: `translate(${iconData?.left || 0}%, ${iconData?.top || 0}%) scale(${iconData?.scale || 1})`
  }

  return (
    <div className={S.container} style={styles}>
      <Icon 
        icon={icon} 
        scale='circle'
        scaleBy={0.93}
      />
    </div>
  );
}