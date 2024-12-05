import { PropsWithClassName } from '@/types/util';
import S from './ArkhamesqueClassicDividerCanvas.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import { getBleedCanvasSize } from './features/size';
import classNames from 'classnames';
import { useIconImage } from '@/hooks/useIconImage';
import { ArkhamesqueClassicDividerCanvasIcon as Icon } from './ArkhamesqueClassicDividerCanvasIcon';
import { memo } from 'react';

export type ArkhamesqueClassicDividerCanvasProps = PropsWithClassName & {
  image: string
  previewIcon?: string | false
  specialIcon?: string | false
}

export const ArkhamesqueClassicDividerCanvas = ({
  className,
  specialIcon,
  previewIcon,
  ...props
}: ArkhamesqueClassicDividerCanvasProps) => {

  const { bleed } = useAppSelector(selectLayout);
  const [image, imageStatus] = useImage(props.image, 'anonymous');
  
  const [preview, previewStatus] = useIconImage({
    icon: previewIcon
  });

  const [special, specialStatus] = useIconImage({
    icon: specialIcon
  });

  const canvasSize = getBleedCanvasSize({
    bleed
  });

  const isLoaded = imageStatus === 'loaded' && 
    previewStatus === 'complete' && 
    specialStatus === 'complete';

  // console.log(canvasSize);

  // return <></>;

  return (
    <>
      {isLoaded && (
        <Stage 
          className={classNames(
            S.container,
            className
          )}
          width={canvasSize.width} 
          height={canvasSize.height}
          preventDefault={false}
        >
          <Layer>
            <Image
              image={image}
              width={canvasSize.width}
              preventDefault={false}
            />
          </Layer>
          {special && (
            <Layer>
              <Icon 
                {...special} 
                type="special" 
                height={60}
                container={{
                  x: 532,
                  y: 855,
                  width: 62,
                  height: 62
                }}
              />
            </Layer>
          )}
          {preview && (
            <Layer>
              <Icon 
                {...preview} 
                height={92}
                container={{
                  x: 116,
                  y: 65,
                  width: 104,
                  height: 104
                }}
              />
            </Layer>
          )}
        </Stage>
      )}
    </>
  );
}

export const ArkhamesqueClassicDividerCanvasMemo = memo(ArkhamesqueClassicDividerCanvas);