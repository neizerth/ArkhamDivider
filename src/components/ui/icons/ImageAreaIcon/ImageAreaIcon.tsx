import { useAppSelector } from '@/hooks/useAppSelector';
import { IconProps } from '../Icon/Icon';
import S from './ImageAreaIcon.module.scss';
import { selectIcons } from '@/store/features/icons/icons';
import { API_URL } from '@/constants/app';
import { propEq } from 'ramda';
import { useEffect, useState } from 'react';
import { selectLayout } from '@/store/features/layout/layout';
import { getEntryArea } from './features/imageArea';
import { PropsWithClassName } from '@/types/util';
import { parseSVG } from './features/svg';
import { getIconPosition } from './features/icon';

const iconURL = API_URL + '/fonts/icons'

export type ImageAreaSize = {
  size: number
} | {
  width: number
  height: number
}

export type ImageAreaIconProps = IconProps & PropsWithClassName & ImageAreaSize & {
  alignX: 'left' | 'center' | 'right'
  alignY: 'top' | 'center' | 'bottom'
  top?: number
  left?: number
  offsetX?: number
  offsetY?: number
}

export const ImageAreaIcon = ({
  icon,
  className,
  offsetX = 1,
  offsetY = 1,
  alignX,
  alignY,
  ...props
}: ImageAreaIconProps) => {

  const icons = useAppSelector(selectIcons);
  const { bleed } = useAppSelector(selectLayout);
  const [paths, setPaths] = useState<string[]>();
  const [contents, setContents] = useState<string>();

	const entry = icons.find(propEq(icon, 'icon'));

  const { width, height } = getIconSize({
    ...props,
    entry
  });

  const { 
    left, 
    top, 
    scale
  } = getIconPosition({
    alignX,
    alignY,
    width, 
    height 
  });
  // const scale = entry ? entry.height / size : 1;
  
  const area = entry && getEntryArea({
    bleed,
    offsetX,
    offsetY,
    scale
  });

  const fetchImage = async () => {
    if (!entry) {
      return;
    }
    const url = `${iconURL}/${icon}.svg`;
    const response = await fetch(url);
    const contents = await response.text();

    setContents(contents);
  }

  useEffect(() => {
    if (!contents) {
      return;
    }

    const paths = parseSVG({
      contents,
      top,
      left,
      scale
    });
    
    setPaths(paths);

  }, [contents, top, left, scale])

  useEffect(() => {
    fetchImage();
  }, [])


  return (
    <>
      {area && paths && (
        <svg 
          className={className}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox={`0 0 ${area.width} ${area.height}`} 
          width={area.width} 
          height={area.height} 
        >
          {paths.map((d, key) => (
            <path key={key} d={d}/>
          ))}
        </svg>
      )}
    </>
  );
}