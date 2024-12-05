import { API_URL } from '@/constants/app';
import { IconProps } from '../Icon/Icon';
import S from './ImageIcon.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { propEq } from 'ramda';
import { selectIcons } from '@/store/features/icons/icons';
import { getIconScale } from '@/features/icons/scale/getIconScale';

export type ImageIconProps = IconProps;

const iconURL = API_URL + '/fonts/icons'

export const ImageIcon = ({
  icon,
  scale = 'square',
  scaleFactor
}: ImageIconProps) => {
  const icons = useAppSelector(selectIcons);

  const url = `${iconURL}/${icon}.svg`;
	const entry = icons.find(propEq(icon, 'icon'));

  const size = getIconScale({
		scale, 
		scaleFactor,
		ratio: entry?.ratio,
		circled: entry?.circled,
	});

  const style = {
		fontSize: `${size}%`
	}

  return (
    <img 
      className={S.icon} 
      src={url}
      crossOrigin='anonymous'
      style={style}
    />
  );
}