import { PropsWithClassName } from '@/types/util';
import S from './ArkhamesqueClassicDividerCanvas.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';
import { Stage, Layer, Image } from 'react-konva';
import { getBleedCanvasSize } from './features/size';
import classNames from 'classnames';
import { useIconImage } from '@/hooks/useIconImage';
import { ArkhamesqueClassicDividerCanvasIcon as Icon } from './ArkhamesqueClassicDividerCanvasIcon';
import { memo, useEffect, useRef, useState } from 'react';
import useImage from 'use-image';
import Konva from 'konva';
import { IS_DEVELOPMENT } from '@/constants/app';

export type ArkhamesqueClassicDividerCanvasProps = PropsWithClassName & {
  previewIcon?: string | false
  specialIcon?: string | false
  image: string,
  onRender: () => void
}

export const ArkhamesqueClassicDividerCanvas = ({
  className,
  specialIcon,
  previewIcon,
  ...props
}: ArkhamesqueClassicDividerCanvasProps) => {

  const { bleed } = useAppSelector(selectLayout);

  const [url, setUrl] = useState<string | null>(null);
  
  const [preview, previewStatus] = useIconImage({
    icon: previewIcon
  });

  const [special, specialStatus] = useIconImage({
    icon: specialIcon
  });

  const [image, status] = useImage(props.image, 'anonymous');

  const ref = useRef<Konva.Stage>(null);

  const canvasSize = getBleedCanvasSize(bleed);

  const isLoaded = status === 'loaded' &&
    previewStatus === 'complete' && 
    specialStatus === 'complete';

  const renderImage = async (stage: Konva.Stage) => {
    const blob = await stage.toBlob() as Blob | null;

    if (!blob) {
      console.error('blob not rendered');
      return;
    }

    if (url) {
      URL.revokeObjectURL(url);
    }

    const blobURL = URL.createObjectURL(blob);
    setUrl(blobURL);
    props.onRender();
  }

  useEffect(() => {
    setUrl(null);
  }, [preview, special])

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!ref.current) {
      return;
    }
  
    renderImage(ref.current)

    return () => {
      if (!url) {
        return;
      }

      URL.revokeObjectURL(url);
      image?.remove();
      preview?.image.remove();
      special?.image.remove();
    }
  }, [ref, preview, special, image, isLoaded])

  const devMode = IS_DEVELOPMENT;

  const showCanvas = (isLoaded && !url) || devMode;

  return (
    <>
      {!showCanvas && url && (
        <img src={url} className={className}/>
      )}
      {showCanvas && (
        <Stage 
          className={classNames(
            S.container,
            className
          )}
          width={canvasSize.width} 
          height={canvasSize.height}
          preventDefault={false}
          ref={ref}
        >
          <Layer>
            <Image
              image={image}
              width={canvasSize.width}
            />
            {special && (
              <Icon 
                {...special} 
                type="special" 
                height={60}
                container={{
                  x: 531,
                  y: 854,
                  width: 62,
                  height: 62
                }}
              />
            )}
            {preview && (
              <Icon 
                {...preview} 
                height={92}
                container={{
                  x: 115,
                  y: 64,
                  width: 104,
                  height: 104
                }}
              />
            )}
          </Layer>
        </Stage>
      )}
    </>
  );
}

export const ArkhamesqueClassicDividerCanvasMemo = memo(ArkhamesqueClassicDividerCanvas);