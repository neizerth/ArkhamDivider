import { ILayoutBleed } from '@/types/layouts';
import { toPrintSize } from '@/util/units';
import domToImage from 'dom-to-image';
import { getSimilarBleed } from './getSimilarBleed';
import { Jimp } from 'jimp';

export type IGetDividerImageOptions = {
  node: Element
  scale: number
  name: string
  bleed: ILayoutBleed
}

export const getDividerImage = async ({
  node,
  scale,
  name,
  bleed
}: IGetDividerImageOptions) => {
  const rect = node.getBoundingClientRect();
  
  const width = rect.width * scale;
  const height = rect.height * scale;

  const source = await domToImage.toPng(node, {
    width,
    height,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: 'top left'
    }
  });

  const crop = getSimilarBleed(bleed);

  const cropLeft = toPrintSize(crop.left);
  const cropTop = toPrintSize(crop.top);
  const cropWidth = toPrintSize(crop.width);
  const cropHeight = toPrintSize(crop.height);

  const image = await Jimp.read(source);

  image.crop({
    x: cropLeft,
    y: cropTop,
    w: cropWidth,
    h: cropHeight
  });

  const fileFormat = 'png';
  const ext = '.' + fileFormat;

  const contents = await image.getBuffer('image/png');

  const filename = name + ext;

  return {
    filename,
    contents
  }
}
