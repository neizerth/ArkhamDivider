import { useAppSelector } from '@/hooks/useAppSelector';
import { IconProps } from '../Icon/Icon';
import S from './ImageAreaIcon.module.scss';
import { selectIcons } from '@/store/features/icons/icons';
import { propEq } from 'ramda';
import { useEffect, useState } from 'react';
import { selectLayout } from '@/store/features/layout/layout';
import { getEntryArea } from './features/imageArea';
import { PropsWithClassName } from '@/types/util';
import { parseSVG } from './features/svg';
import { getIconContents, getIconPosition } from './features/icon';
import { IBox } from '@/types/size';
import { getIconScale } from '@/features/icons/scale/getIconScale';


export type ImageAreaContainer = IBox & {
  x: number
  y: number
  alignX?: 'left' | 'center' | 'right'
  alignY?: 'top' | 'center' | 'bottom'
}

export type ImageAreaIconProps = Omit<IconProps, 'type'> & PropsWithClassName & {
  size: number
  container?: ImageAreaContainer
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
  container,
  ...props
}: ImageAreaIconProps) => {

  const icons = useAppSelector(selectIcons);
  const { bleed } = useAppSelector(selectLayout);
  const [paths, setPaths] = useState<string[]>();
  const [contents, setContents] = useState<string>();

	const entry = icons.find(propEq(icon, 'icon'));

  let area;
  let left = 0;
  let top = 0;
  let size = props.size;

  const scale = 1;

  if (entry) {
    const scale = entry.height / size;

    const scaleType = props.scale || 'square';

    size = props.size * getIconScale({
      scale: scaleType, 
      scaleFactor: props.scaleFactor, 
      ratio: entry?.ratio,
      circled: entry?.circled,
    });

    area = getEntryArea({
      bleed,
      offsetX,
      offsetY,
      scale
    });

    const position = getIconPosition({
      container,
      scale,
      icon: entry,
      top: props.top || 0,
      left: props.left || 0,
    });

    left = position.left;
    top = position.top;
    // const scale = entry ? entry.height / size : 1;
    
   
  }

  useEffect(() => {
    if (!contents) {
      return;
    }

    const paths = parseSVG({
      contents,
      scale,
      left,
      top
    });
    
    setPaths(paths);

  }, [contents, left, top])

  useEffect(() => {
    if (!entry) {
      return;
    }
    getIconContents(icon)
      .then(setContents);
  }, [icon])


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