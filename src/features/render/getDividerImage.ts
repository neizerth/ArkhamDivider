import { ILayoutBleed } from '@/types/layouts';
import { toPrintSize } from '@/util/units';
import domToImage from 'dom-to-image';
import { Jimp } from 'jimp';

export type GetDividerImageOptions = {
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
}: GetDividerImageOptions) => {
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

  const cropLeft = toPrintSize(bleed.left);
  const cropTop = toPrintSize(bleed.top);
  const cropWidth = toPrintSize(bleed.width);
  const cropHeight = toPrintSize(bleed.height);

  console.log({
    scale,
    width,
    height,
    x: cropLeft,
    y: cropTop,
    w: cropWidth,
    h: cropHeight
  })

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
