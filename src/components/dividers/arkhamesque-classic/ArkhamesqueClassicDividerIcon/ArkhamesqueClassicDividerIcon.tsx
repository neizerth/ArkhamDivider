import { Icon } from '@/components';
import S from './ArkhamesqueClassicDividerIcon.module.scss';
import icons from './icons';
import { propEq } from 'ramda';

export type ArkhamesqueClassicDividerIconProps = {
  icon: string
}

export const ArkhamesqueClassicDividerIcon = ({
  icon
}: ArkhamesqueClassicDividerIconProps) => {

  const iconData = icons.find(propEq(icon, 'icon'));
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