import { PropsWithClassName } from '@/types/util';
import S from './ArkhamesqueClassicDividerCanvas.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';
import { Stage, Layer } from 'react-konva';
import { getBleedCanvasSize } from './features/size';
import classNames from 'classnames';
import { useIconImage } from '@/hooks/useIconImage';
import { ArkhamesqueClassicDividerCanvasIcon as Icon } from './ArkhamesqueClassicDividerCanvasIcon';
import { memo, useEffect, useRef, useState } from 'react';
import Konva from 'konva';
import { reject } from 'ramda';

export type ArkhamesqueClassicDividerCanvasProps = PropsWithClassName & {
  previewIcon?: string | false
  specialIcon?: string | false
  onLoad: (url: string) => void
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

  const ref = useRef<Konva.Stage>(null);

  const canvasSize = getBleedCanvasSize({
    bleed
  });

  const isLoaded = previewStatus === 'complete' && 
    specialStatus === 'complete';

  const renderImage = async (stage: Konva.Stage) => {
    const blob = await stage.toBlob() as Blob | null;

    if (!blob) {
      return;
    }

    if (url) {
      URL.revokeObjectURL(url);
    }

    const blobURL = URL.createObjectURL(blob);
    setUrl(blobURL);
  }

  useEffect(() => {
    setUrl(null);
  }, [preview, special])

  useEffect(() => {
    if (!ref.current) {
      return;
    }
  
    renderImage(ref.current)

    return () => {
      if (!url) {
        return;
      }

      URL.revokeObjectURL(url);
    }
  }, [ref.current])

  return (
    <>
      {url && (
        <img src={url} className={className}/>
      )}
      {isLoaded && !url && (
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
            {special && (
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
            )}
            {preview && (
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
            )}
          </Layer>
        </Stage>
      )}
    </>
  );
}

export const ArkhamesqueClassicDividerCanvasMemo = memo(ArkhamesqueClassicDividerCanvas);