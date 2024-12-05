import { PropsWithClassName } from '@/types/util';
import S from './ArkhamesqueClassicDividerCanvas.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLayout } from '@/store/features/layout/layout';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import { getBleedCanvasSize, getCanvasSize } from './features/size';
import classNames from 'classnames';
import { useIconImage } from '@/hooks/useIconImage';
import { ArkhamesqueClassicDividerCanvasIcon as Icon } from './ArkhamesqueClassicDividerCanvasIcon';
import { isNotEmpty } from 'ramda';
import { isDefined } from '@/util/common';

const PREVIEW_ICON_SIZE = 92;
const SPECIAL_ICON_SIZE = 60;

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
  const [image] = useImage(props.image, 'anonymous');
  
  const preview = useIconImage({
    icon: previewIcon
  });

  const special = useIconImage({
    icon: specialIcon
  });

  const canvasSize = getBleedCanvasSize({
    bleed
  });

  // console.log(canvasSize);

  // return <></>;

  return (
    <Stage 
      className={classNames(
        S.container,
        className
      )}
      width={canvasSize.width} 
      height={canvasSize.height}
    >
      <Layer>
        <Image
          image={image}
          width={canvasSize.width}
        />
      </Layer>
      {special && (
        <Layer>
          <Icon 
            {...special} 
            type="special" 
            height={SPECIAL_ICON_SIZE}
            container={{
              x: 532,
              y: 853,
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
              x: 118,
              y: 67,
              width: 104,
              height: 104
            }}
          />
        </Layer>
      )}
    </Stage>
  );
}