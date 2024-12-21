import { ImageFormat } from '@/types/image';
import { ILayoutBleed } from '@/types/layouts';
import { RenderResponse } from '@/types/render';
import { toPrintSize } from '@/util/units';
import domToImage from 'dom-to-image';
import { Jimp } from 'jimp';

export type GetDividerImageOptions = {
  node: Element
  scale: number
  name: string
  bleed: ILayoutBleed
  imageFormat: ImageFormat
}

export const getDividerImage = async ({
  node,
  scale,
  name,
  bleed,
  imageFormat
}: GetDividerImageOptions): Promise<RenderResponse> => {
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

  const image = await Jimp.read(source);

  image.crop({
    x: cropLeft,
    y: cropTop,
    w: cropWidth,
    h: cropHeight
  });

  const ext = '.' + imageFormat;

  const contents = await image.getBuffer(`image/${imageFormat}`);

  const filename = name + ext;

  return {
    filename,
    contents
  }
}
