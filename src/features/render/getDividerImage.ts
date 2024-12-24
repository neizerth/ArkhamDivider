import { ColorScheme, ImageFormat } from '@/types/image';
import { ILayoutBleed } from '@/types/layouts';
import { RenderResponse } from '@/types/render';
import { toPrintSize } from '@/util/units';
import domToImage from 'dom-to-image';
import { getVips } from '../image/vips';

export type GetDividerImageOptions = {
  node: Element
  scale: number
  name: string
  bleed: ILayoutBleed
  imageFormat: ImageFormat
  colorScheme?: ColorScheme
}

export const getDividerImage = async ({
  node,
  scale,
  name,
  bleed,
  imageFormat,
  colorScheme
}: GetDividerImageOptions): Promise<RenderResponse> => {
  const rect = node.getBoundingClientRect();
  
  const width = rect.width * scale;
  const height = rect.height * scale;

  const blob = await domToImage.toBlob(node, {
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

  const source = await blob.arrayBuffer();
  const vips = await getVips();
  let image = vips.Image.newFromBuffer(source)
    .crop(
      cropLeft,
      cropTop,
      cropWidth,
      cropHeight
    );
  
  if (colorScheme) {
    image = image.iccTransform(colorScheme);
  }

  const ext = '.' + imageFormat;

  const contents = image.writeToBuffer(ext);

  const filename = name + ext;

  image.delete();

  return {
    filename,
    contents
  }
}
